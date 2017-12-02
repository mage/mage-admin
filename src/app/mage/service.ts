import { Router } from '@angular/router';

/**
 * Get MAGE to shut up about... *sigh* globals
 */
(<any> window).mageConfig = {};
import * as mage from 'mage-sdk-js';

/**
 * Import modules
 */
import * as Mage from 'mage-sdk-js/lib/Mage';

import * as archivistModule from 'mage-sdk-js.archivist';
import * as timeModule from 'mage-sdk-js.time';
import * as sessionModule from 'mage-sdk-js.session';

import { Injectable } from '@angular/core';
import { NbTokenService } from '@nebular/auth';
import { UserService } from '../@core/data/users.service';

const MageLocalStorageKeys = {
  Url: 'MAGE_URL',
  Session: 'MAGE_SESSION'
};

@Injectable()
export class MageService {
  // Todo: make client injectable
  url: URL;
  client = mage;

  constructor(protected tokenService: NbTokenService, protected userService: UserService) {}

  async load(): Promise<boolean> {
    // Resend pending user commands on error
    this.on('io.error.network', () => setTimeout(() => mage.commandCenter.resend(), 1000));

    // Store the session in local storage
    this.on('session.set', (_eventName: string, session: any) => this.storeSession(session));

    // Stop the message server, and delete the stored session key
    this.on('session.unset', (...args: any[]) => {
      if (this.client.msgServer.stream) {
        this.client.msgServer.stream.destroy();
      }

      this.clearSession();
    });

    await this.loadSession();

    return true;
  }

  public async login(email: string, password: string) {
    return this.call('admin', 'login', email, password)
      .then((user) => this.setCurrentUser(user));
  }

  public async call(mod: string, userCommand: string, ...args: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.commandCenter.sendCommand(`${mod}.${userCommand}`, args, (error: Error | undefined, data: any) => {
        if (error) {
          return reject(error);
        }

        resolve(data);
      });
    });
  }

  public on(eventName: string, callback: (...args: any[]) => void) {
    this.client.eventManager.on(eventName, callback);
  }

  public async setup() {
    const appName = this.url.pathname.split('/')[1];
    const realConfig = await this.call('admin', 'getConfig', appName, this.url.origin);

    this.client.configure(realConfig);

    const key = this.client.session.getKey();

    if (key) {
      this.client.msgServer.setSessionKey(key);
      this.client.msgServer.stream.on('error', () => this.client.eventManager.emit('io.error.network'));
      this.client.msgServer.start();
    }

    this.client.addModule('archivist', archivistModule);
    this.client.addModule('time', timeModule);

    return this.runClientSetup();
  }

  public async initialize(url: string) {
    localStorage.setItem(MageLocalStorageKeys.Url, url);

    this.url = new URL(url);
    this.client.configure({
      server: {
        commandCenter: {
          url,
          timeout: 15000,
          commands: {
            admin: [{
              name: 'getConfig',
              params: ['app', 'url']
            }, {
              name: 'register',
              params: ['email', 'password']
            }, {
              name: 'login',
              params: ['email', 'password']
            }]
          }
        }
      }
    });

    this.client.addModule('session', sessionModule);

    return this.runClientSetup();
  }

  public getSessionKey() {
    return localStorage.getItem(MageLocalStorageKeys.Session);
  }

  private storeSession(session: any) {
    localStorage.setItem(MageLocalStorageKeys.Session, JSON.stringify(session));
  }

  private clearSession() {
    this.clearCurrentUser();
    this.tokenService.clear();
    localStorage.removeItem(MageLocalStorageKeys.Session);
  }

  private async loadSession() {
    const url = localStorage.getItem(MageLocalStorageKeys.Url);

    if (url) {
      try {
        await this.initialize(url);

        const sessionData = this.getSessionKey();

        if (sessionData) {
          const session = JSON.parse(sessionData);
          this.client.session.setActorId(session.actorId);
          this.client.session.setKey(session.key);

          await this.setup();
        }
      } catch (error) {
        localStorage.removeItem(MageLocalStorageKeys.Session);
      }
    }
  }

  private setCurrentUser(user: any) {
    this.userService.setCurrentUser(user);
  }

  private clearCurrentUser() {
    this.userService.clearCurrentUser();
  }

  private async runClientSetup() {
    return new Promise((resolve, reject) => this.client.setup((error) => {
      if (error) {
        return reject(error);
      }

      resolve();
    }));
  }
}
