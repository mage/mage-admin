import { NbAbstractAuthProvider, NbAuthResult, NbAuthService, NbAuthSimpleToken } from '@nebular/auth';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { MageService } from './service';

class MageAuthSimpleToken extends NbAuthSimpleToken {
  constructor(public token: string) {
    super();
  }
}

@Injectable()
export class MageAuthProvider extends NbAbstractAuthProvider {
  protected config: any;

  constructor(private mageService: MageService) {
    super();
  }

  setConfig(config: any): void {
    this.config = config;
  }

  getConfigValue<T>(key: string): T {
    return this.config[key];
  }

  authenticate(data?: any): Observable<NbAuthResult> {
    const promise = this.mageService.initialize(data.url)
      .then(() => this.mageService.call('admin', 'login', data.email, data.password))
      .then(() => this.mageService.setup())
      .then((result) => new NbAuthResult(
        true,
        result,
        '/',
        [],
        ['You have been successfully logged in'],
        new MageAuthSimpleToken('123')
      ))
      .catch((error) => new NbAuthResult(
        false,
        null,
        false,
        [error],
      ));

    return Observable.fromPromise(promise);
  }

  register(data?: any): Observable<NbAuthResult> {
    const promise = this.mageService.initialize(data.url)
      .then(() => this.mageService.call('admin', 'register', data.email, data.password))
      .then((result) => new NbAuthResult(
        true,
        result,
        '/',
        [],
        ['Registration succeeded']
      ))
      .catch((error) => new NbAuthResult(
        false,
        null,
        false,
        [error],
      ));

    return Observable.fromPromise(promise);
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    return new Observable<NbAuthResult>();
  }
  resetPassword(data?: any): Observable<NbAuthResult> {
    return new Observable<NbAuthResult>();
  }

  logout(): Observable<NbAuthResult> {
    const promise = this.mageService.call('admin', 'logout')
      .then((result) => new NbAuthResult(
        true,
        result,
        '/',
        [],
        ['Logout successful']
      ))
      .catch((error) => new NbAuthResult(
        false,
        null,
        false,
        [error],
      ));

    return Observable.fromPromise(promise);
  }
}
