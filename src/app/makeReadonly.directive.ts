import { Directive, Input, OnInit, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[makeReadonly]'
})
export class MakeReadonlyDirective implements AfterViewInit {
  @Input('makeReadonly') readOnlyObj: any;

  constructor() { }

  ngAfterViewInit() {
    if (this.readOnlyObj['IsActive']) {
      this.disableControls(this.readOnlyObj['DomId']);
    }
  }

  disableControls(domId) {
    const parentElement: HTMLElement = document.getElementById(domId) as HTMLElement;
    let disableControls: any = [];
    let unbindControls: any = [];
    let removeClassControls: any = [];

    disableControls = disableControls.concat(parentElement.getElementsByTagName('input'));
    disableControls = disableControls.concat(parentElement.getElementsByTagName('textarea'));
    disableControls = disableControls.concat(parentElement.getElementsByTagName('mat-autocomplete'));
    disableControls = disableControls.concat(parentElement.getElementsByTagName('mat-datepicker'));
    disableControls = disableControls.concat(parentElement.getElementsByTagName('button'));

    disableControls = disableControls.concat(parentElement.getElementsByTagName('mat-select'));
    disableControls = disableControls.concat(parentElement.getElementsByTagName('mat-checkbox'));
    disableControls = disableControls.concat(parentElement.getElementsByTagName('mat-radio-button'));
    disableControls = disableControls.concat(parentElement.getElementsByTagName('mat-slider'));

    this.setDisableAttribute(disableControls);

    unbindControls = unbindControls.concat(parentElement.getElementsByTagName('mat-select'));
    unbindControls = unbindControls.concat(parentElement.getElementsByTagName('mat-checkbox'));
    unbindControls = unbindControls.concat(parentElement.getElementsByTagName('mat-radio-button'));

    this.setUnbind(unbindControls);
  }

  setUnbind(allControls) {
    allControls.forEach(controls => {
      for (let i = 0; i < controls.length; i++) {
        controls[i].addClass('cursor-default');
        controls[i].unbind();
      }
    });
  }

  setRemoveClass(allControls) {
    allControls.forEach(controls => {
      for (let i = 0; i < controls.length; i++) {
        controls[i].removeClass('mat-primary');
        controls[i].removeClass('mat-warn');
        controls[i].removeClass('mat-primary');
      }
    });
  }

  setDisableAttribute(allControls) {
    allControls.forEach(controls => {
      for (let i = 0; i < controls.length; i++) {
        controls[i]['disabled'] = true;
        controls[i].addClass('cursor-default');
      }
    });
  }

}