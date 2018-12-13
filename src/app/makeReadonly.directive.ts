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

    const inputElments = parentElement.getElementsByTagName('input');
    const txtAreaElments = parentElement.getElementsByTagName('textarea');
    const autocompleteElments = parentElement.getElementsByTagName('mat-autocomplete');
    const datepickerElments = parentElement.getElementsByTagName('mat-datepicker');
    const buttonElments = parentElement.getElementsByTagName('button');
    const checkboxElments = parentElement.getElementsByTagName('mat-checkbox');
    const radioElments = parentElement.getElementsByTagName('mat-radio-button');
    const sliderElments = parentElement.getElementsByTagName('mat-slider');
    const slideToggleElments = parentElement.getElementsByTagName('mat-slide-toggle');
    const btnToggleElments = parentElement.getElementsByTagName('mat-button-toggle');
    const chipElments = parentElement.getElementsByTagName('mat-chip');
    const formFieldElments = parentElement.getElementsByTagName('mat-form-field');

    disableControls = disableControls.concat(
      inputElments, txtAreaElments, autocompleteElments,
      datepickerElments, buttonElments, checkboxElments,
      radioElments, sliderElments, slideToggleElments,
      btnToggleElments, chipElments, formFieldElments);

    this.setDisableAttribute(disableControls);
  }

  setDisableAttribute(allControls) {
    allControls.forEach(controls => {
      for (let i = 0; i < controls.length; i++) {
        controls[i]['disabled'] = true;
        if (!controls[i].classList.contains("pointer-none"))
          controls[i].classList.add("pointer-none");
      }
    });
  }

}