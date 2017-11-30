/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NbAuthService, NbAuthResult } from '@nebular/auth/services/auth.service';

@Component({
  selector: 'ngx-logout',
  template: `
    <ngx-auth-block>
      <h2 style="text-align: center;">Logging out, please wait...</h2>
    </ngx-auth-block>
  `,
})
export class MageLogoutComponent implements OnInit {

  redirectDelay: number = 1500;

  constructor(protected service: NbAuthService,
              protected router: Router) {
  }

  ngOnInit(): void {
    this.logout('email');
  }

  logout(provider: string): void {
    this.service.logout(provider).subscribe((result: NbAuthResult) => {

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }
}
