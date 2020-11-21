import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface LetAsContext {
  $implicit: any;
  letAs: any;
}
// LetDirective

@Directive({
  selector: "[letAs]"
})
export class LetAsDirective {
  @Input()
  set letAs(value: any) {
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(this.templateRef, {
      $implicit: value,
      letAs: value
    });
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<LetAsContext>
  ) {}
}
