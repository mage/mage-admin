import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as renderjson from 'renderjson';

renderjson.set_icons('+', '-');
renderjson.set_show_to_level(2);

@Directive({
  selector: '[ngxRenderJson]'
})
export class RenderJsonDirective implements OnInit {
  @Input() jsonData: any;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    const domNode = this.el.nativeElement;
    const firstChild = this.el.nativeElement.firstChild;

    if (firstChild) {
      domNode.removeChild(firstChild);
    }

    domNode.appendChild(renderjson(this.jsonData));
  }
}
