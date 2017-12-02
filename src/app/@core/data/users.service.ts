import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class UserService {
  private currentUser: any;
  private userArray: any[];

  getUsers() {
    return Observable.of([]);
  }

  getCurrentUser(): Observable<any> {
    if (!this.currentUser) {
      const data = localStorage.getItem('MAGE_USER');

      if (data) {
        this.currentUser = JSON.parse(data);
      }
    }

    if (this.currentUser) {
      this.currentUser.avatar = this.getGravatarUrl(this.currentUser.email);
    }

    return Observable.of(this.currentUser);
  }

  setCurrentUser(user: any) {
    user.avatar = this.getGravatarUrl(user.email);
    this.currentUser = user;
    localStorage.setItem('MAGE_USER', JSON.stringify(user));
  }

  clearCurrentUser() {
    localStorage.removeItem('MAGE_USER');
  }

  private getGravatarUrl(email: string) {
    return `https://www.gravatar.com/avatar/${Md5.hashStr(email)}`;
  }
}
