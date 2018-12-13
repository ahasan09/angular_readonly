import { Directive, Input, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ReadOnlyService } from './read-only.service';

export interface IModel {
  IsReadable: boolean;
  DomId: string;
}

@Directive({
  selector: '[read-only]'
})
export class ReadOnlyDirective implements AfterViewInit {
  @Input('read-only') readOnlyObj: IModel;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private readOnlyService: ReadOnlyService
  ) {

  }

  ngOnInit() {
    this.readOnlyService.readOnlyEvent.subscribe((response: IModel) => {
      this.executeDisableControls(response);
    })
  }

  executeDisableControls(payload: IModel) {
    if (!isPlatformBrowser(this.platformId))
      return;

    let controls = this.getAllControls(payload['DomId']);

    if (payload['IsReadable'])
      this.setDisableAttribute(controls);
    else
      this.removeDisableAttribute(controls);
  }

  ngAfterViewInit() {
    this.executeDisableControls(this.readOnlyObj);
  }

  getAllControls(domId) {
    const parentElement: HTMLElement = document.getElementById(domId) as HTMLElement;
    let controls: any = [];

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
    const spanElments = parentElement.getElementsByTagName('span');

    controls = controls.concat(
      inputElments, txtAreaElments, autocompleteElments,
      datepickerElments, buttonElments, checkboxElments,
      radioElments, sliderElments, slideToggleElments,
      btnToggleElments, chipElments, formFieldElments,
      anchorElments, spanElments);

    return controls;
  }

  setDisableAttribute(allControls) {
    allControls.forEach(controls => {
      for (let i = 0; i < controls.length; i++) {
        controls[i]['disabled'] = true;

        if (controls[i].classList.contains('cursor-pointer'))
          controls[i].classList.remove('cursor-pointer');

        controls[i].style['pointer-events'] = 'none';
      }
    });
  }

  removeDisableAttribute(allControls) {
    allControls.forEach(controls => {
      for (let i = 0; i < controls.length; i++) {
        controls[i]['disabled'] = false;
        controls[i].style['pointer-events'] = null;
      }
    });
  }

}