import { Component, ViewChild } from '@angular/core';
import { MageService } from '../../../mage/service';
import { NgForm } from '@angular/forms';

import { ToasterService, ToasterConfig } from 'angular2-toaster';

import { JsonEditorDirective } from '../../../@theme/directives/';
import { NgFor } from '@angular/common/src/directives/ng_for_of';

@Component({
  selector: 'ngx-topics',
  styleUrls: ['./topics.component.scss'],
  templateUrl: './topics.component.html',
})

export class TopicsComponent {
  @ViewChild(JsonEditorDirective) jsonEditor: JsonEditorDirective;

  public toasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right'
  });

  public archivist: any;

  public topics: any[];

  public topicName: string;

  public topic: any = '';

  public index: any;

  public data: any;

  public value: any;

  public errors: any[];

  constructor(private mageService: MageService, private toasterService: ToasterService) {
    this.archivist = this.mageService.getClient().archivist;
    this.archivist.getTopics()
      .then((data) => {
        this.topics = data;
        this.topicName = this.getTopicsName()[0];
        this.setTopic(this.topicName);
      });
  }

  getTopicsName() {
    if (!this.topics) {
      return [];
    }

    return Object.keys(this.topics).sort();
  }

  setTopic(event: string) {
    this.data = null;
    this.value = null;

    if (event !== '') {
      this.topic = this.topics[event];
    }
  }

  find(form: NgForm) {
    this.index = form.value;
    this.data = null;
    this.archivist.rawGet(this.topicName, form.value, {
      optional: true
    }, (error, data) => {
      this.data = null;
      this.value = null;

      if (error) {
        return this.toasterService.popAsync({
          type: 'error',
          title: 'Could not get value',
          body: error
        });
      }

      if (!data || !data.value) {
        return this.toasterService.popAsync({
          type: 'warning',
          title: 'Value not found!'
        });
      }

      this.data = data;

      if (data.value.mediaType === 'application/x-tome' || data.value.mediaType === 'application/json') {
        this.value = JSON.parse(data.value.data);
      } else {
        this.value = data.value.data;
      }
    });
  }

  save() {
    this.value = this.jsonEditor.getData();
    this.archivist.rawSet(
      this.topicName,
      this.index,
      JSON.stringify(this.value),
      this.data.value.mediaType,
      this.data.value.encoding
    );

    this.archivist.distribute((error: any, issues: any) => {
      let message: any = {
        type: 'success',
        title: 'Saved!'
      };

      if (error) {
        message = {
          type: 'error',
          title: 'Unexpected error',
          body: error.stack
        };
      } else if (issues.length > 0) {
        message = {
          type: 'error',
          title: 'Saving failed',
          body: issues[0].error
        };
      }

      this.toasterService.popAsync(message);
    });
  }
}
