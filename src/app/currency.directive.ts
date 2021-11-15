import {
  Directive,
  OnInit,
  ElementRef,
  HostListener,
  Renderer2,
  Input,
  AfterViewInit,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[currencyType]',
})
export class CurrencyDirective implements OnInit, AfterViewInit {
  currencyChars = new RegExp('[$,]', 'g'); // we're going to remove commas and dots
  @Input() currencyType: any;
  constructor(
    public el: ElementRef,
    public renderer: Renderer2,
    private ngControl: NgControl
  ) {}

  ngOnInit() {
    if (!this.el.nativeElement.attributes['ng-reflect-model']) {
      this.format(this.el.nativeElement.value); // format any initial values for formControlName
    }
  }

  ngAfterViewInit() {
    if (this.el.nativeElement.attributes['ng-reflect-model']) {
      const getValue: any = this.ngControl;
      this.format(getValue.model.toString(), true); // format any initial values for ngModel
    }
  }

  @HostListener('input', ['$event.target.value']) onInput(e: string) {
    this.format(e);
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    event.preventDefault();
    this.format(event.clipboardData.getData('text/plain'));
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    if (event) {
      return;
    }
  }

  format(val: any, ngModel?: boolean) {
    // 1. test for non-number characters and replace/remove them
    const numberFormat = val;
    let wholeValue = numberFormat;
    let decimalValue = '';
    if (numberFormat.indexOf('.') >= 0) {
      let decimalPos = numberFormat.indexOf('.');
      wholeValue = numberFormat.substring(0, decimalPos);
      decimalValue = numberFormat.substring(decimalPos);
    }

    // 2. format the number (add commas)
    const usd = numberFormat
      ? this.formatNumber(wholeValue) + decimalValue.substring(0, 3)
      : '';

    // 3. replace the input value with formatted numbers
    setTimeout(() => {
      // Add Delay due to expression changes
      this.ngControl.control.setValue(usd ? '$' + usd : usd);
    }, 100);
    this.renderer.setProperty(
      this.el.nativeElement,
      'value',
      usd ? '$' + usd : usd
    );
  }
  formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
