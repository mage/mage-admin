import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as JSONEditor from 'jsoneditor';

@Directive({
  selector: '[ngxJsonEditor]'
})
export class JsonEditorDirective implements OnInit {
  @Input() jsonData: any;

  private editor: any;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    const domNode = this.el.nativeElement;
    const editor = new JSONEditor(domNode, {});
    editor.set(this.jsonData);

    this.editor = editor;
  }

  getData() {
    return this.editor.get();
  }
}
