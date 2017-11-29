import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Made by <b><a href="https://wizcorp.jp" target="_blank">Wizcorp</a></b>,
    based on <a href="https://github.com/akveo/ngx-admin">ngx-admin</a>
    created by <b><a href="https://akveo.com" target="_blank">Akveo</a></b> 2017</span>
    <div class="socials">
      <a href="https://github.com/mage/mage-admin" target="_blank" class="ion ion-social-github"></a>
      <a href="https://twitter.com/mageframework" target="_blank" class="ion ion-social-twitter"></a>
    </div>
  `,
})
export class FooterComponent {
}
