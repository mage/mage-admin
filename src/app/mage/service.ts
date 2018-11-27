import { Router } from '@angular/router';
import * as mage from 'mage-sdk-js';
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
  public url: URL;

  public initialized: boolean = false;

  private client = mage;

  constructor(protected tokenService: NbTokenService, protected userService: UserService) { }

  async load(): Promise<boolean> {
    // Implement wildcard emission
    const emitEvent = this.client.eventManager.emitEvent.bind(this.client.eventManager);
    this.client.eventManager.emitEvent = function (eventName: string, data: any) {
      emitEvent(eventName, data);

      this.emit('*', eventName, data);
    };

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
    if (!this.client.admin) {
      throw new Error('admin module not found on remote server. Is mage-module-admin installed?');
    }

    const user = await this.client.admin.login(email, password);
    return this.setCurrentUser(user);
  }

  public on(eventName: string, callback: (...args: any[]) => void) {
    this.client.eventManager.on(eventName, callback);
  }

  public async setup() {
    const key = this.client.session.getKey();

    if (key) {
      // Reset the message stream
      if (this.client.msgServer.isRunning) {
        this.client.msgServer.destroy();
      }

      this.client.msgServer.setSessionKey(key);

      let errorCount = 0;

      this.client.msgServer.stream.on('error', (error) => {
        errorCount += 1;

        setTimeout(() => errorCount -= 1, 15000);

        if (errorCount > 2) {
          this.client.eventManager.emit('io.error.network');
        }
      });

      this.client.msgServer.start();
    }
  }

  public async initialize(url: string) {
    this.url = new URL(url);
    mage.setEndpoint(this.url.origin);
    localStorage.setItem(MageLocalStorageKeys.Url, url);

    await this.runClientSetup();
    await this.client.setupModule('session', sessionModule);
    await this.client.setupModule('time', timeModule);
    await this.client.setupModule('archivist', archivistModule);

    this.initialized = true;
  }

  public getClient() {
    return this.client;
  }

  public async cloneClient() {
    const clone = new Mage(this.client.config);
    clone.setEndpoint(this.url.origin);
    await this.runClientSetup(clone);

    return clone;
  }

  public getActorId() {
    return this.client.session.getActorId();
  }

  public getModulesUserCommands() {
    return this.client.config.server.commandCenter.commands;
  }

  public getTopics() {
    return this.client.archivist.getTopics();
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
    const sessionData = this.getSessionKey();
    if (url && sessionData) {
      try {
        await this.initialize(url);

        const session = JSON.parse(sessionData);
        this.client.session.setActorId(session.actorId);
        this.client.session.setKey(session.key);

        await this.setup();
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

  private async runClientSetup(client = this.client) {
    await new Promise((resolve, reject) => client.configure((error) => {
      if (error) {
        return reject(error);
      }

      resolve();
    }));
  }
}
