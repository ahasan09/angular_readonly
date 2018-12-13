import { Directive, Input, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface IModel {
  IsActive: boolean;
  DomId: string;
}

@Directive({
  selector: '[read-only]'
})
export class ReadOnlyDirective implements AfterViewInit {
  @Input('read-only') readOnlyObj: IModel;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId))
      return;

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
    const anchorElments = parentElement.getElementsByTagName('a');

    disableControls = disableControls.concat(
      inputElments, txtAreaElments, autocompleteElments,
      datepickerElments, buttonElments, checkboxElments,
      radioElments, sliderElments, slideToggleElments,
      btnToggleElments, chipElments, formFieldElments, anchorElments);

    this.setDisableAttribute(disableControls);
  }

  setDisableAttribute(allControls) {
    allControls.forEach(controls => {
      for (let i = 0; i < controls.length; i++) {
        controls[i]['disabled'] = true;
        controls[i].style['pointer-events'] = 'none';
      }
    });
  }

}