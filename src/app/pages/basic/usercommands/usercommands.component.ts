import { Component } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { MageService } from '../../../mage/service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngx-usercommands',
  styleUrls: ['./usercommands.component.scss'],
  templateUrl: './usercommands.component.html',
})
export class UserCommandsComponent {
  settings = {
    hideHeader: true,
    pager: {
      perPage: 3
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      time: {
        title: 'Time',
        width: '20px',
        type: 'string',
      },
      eventName: {
        title: 'Event name',
        width: '20px',
        type: 'string',
      },
      eventData: {
        title: 'Received data',
        type: 'string',
      },
    },
  };

  client: any;
  actorId: string;

  userCommands = [];

  source: LocalDataSource = new LocalDataSource();

  constructor(private smartTableService: SmartTableService, private mageService: MageService) {
    const data = [];

    const client = mageService.getClientCopy();
    const realEmit = client.eventManager.emitEvent.bind(client.eventManager);

    client.eventManager.emitEvent = (eventName: string, eventData: any) => {
      realEmit(eventName, eventData);

      // Hide generic IO events
      if (eventName === 'io.error.network') {
        return client.commandCenter.resend();
      }

      if (eventName.indexOf('io.') === 0) {
        return;
      }

      if (eventName === 'session.set') {
        client.msgServer.setSessionKey(eventData.key);
        client.msgServer.start();
        client.commandCenter.registerCommandHook('mage.session', () => ({ key: eventData.key }));
        this.actorId = eventData.actorId;
      }

      if (eventName === 'session.unset') {
        client.msgServer.stream.destroy();
        client.commandCenter.unregisterCommandHook('mage.session');
        this.actorId = null;
      }

      const time = new Date().toJSON().split('T')[1];

      data.unshift({ time, eventName, eventData: JSON.stringify(eventData, null, 2) });

      if (data.length >= 200) {
        data.pop();
      }

      this.source.load(data);
    };

    this.source.load(data);
    this.client = client;

    this.userCommands = Object.entries(mageService.getUserCommands())
      .map(([name, userCommands]) => ({
        name,
        userCommands
      }));
  }

  public clear() {
    this.client.eventManager.emitEvent('session.unset')
  }

  public async onSend(mod: string, userCommand: string, userCommandData: any, form: NgForm) {
    userCommandData.response = undefined;
    let response;

    try {
      const args = Object
        .values(form.value)
        .map((value) => value ? JSON.parse(value) : undefined);
      response = await new Promise((resolve, reject) => {
        this.client.commandCenter.sendCommand(`${mod}.${userCommand}`, args, (error: Error | undefined, data: any) => {
          if (error) {
            return reject(error);
          }

          resolve(data);
        });
      });
    } catch (error) {
      response = error.message || error;
    } finally {
      userCommandData.response = response;
    }
  }
}
