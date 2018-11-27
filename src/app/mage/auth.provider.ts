import { NbAbstractAuthProvider, NbAuthResult, NbAuthService, NbAuthSimpleToken } from '@nebular/auth';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { MageService } from './service';

function trackError(error: Error) {
  console.error(error)
  return new NbAuthResult(
    false,
    null,
    false,
    [error],
  )
}

class MageAuthSimpleToken extends NbAuthSimpleToken {
  constructor(public mage: MageService) {
    super();
    this.setValue(mage.getSessionKey());
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
      .then(() => this.mageService.login(data.email, data.password))
      .then(() => this.mageService.setup())
      .then((result) => new NbAuthResult(
        true,
        result,
        '/',
        [],
        [/* 'You have been successfully logged in' */],
        new MageAuthSimpleToken(this.mageService)
      ))
      .catch(trackError);

    return Observable.fromPromise(promise);
  }

  register(data?: any): Observable<NbAuthResult> {
    const client = this.mageService.getClient();
    const promise = this.mageService.initialize(data.url)
      .then(() => client.admin.register(data.email, data.password))
      .then((result) => new NbAuthResult(
        true,
        result,
        '/',
        [],
        ['Registration succeeded']
      ))
      .catch(trackError);

    return Observable.fromPromise(promise);
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    return new Observable<NbAuthResult>();
  }
  resetPassword(data?: any): Observable<NbAuthResult> {
    return new Observable<NbAuthResult>();
  }

  logout(): Observable<NbAuthResult> {
    const client = this.mageService.getClient();
    const promise = client.admin.logout()
      .then((result) => new NbAuthResult(
        true,
        result,
        '/',
        [],
        ['Logout successful']
      ))
      .catch(trackError);

    return Observable.fromPromise(promise);
  }
}
