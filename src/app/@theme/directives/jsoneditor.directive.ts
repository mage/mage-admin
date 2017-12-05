import { Directive, ElementRef, Input } from '@angular/core';
import * as JSONEditor from 'jsoneditor';

@Directive({
  selector: '[jsoneditor]'
})
export class JsonEditorDirective {
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
