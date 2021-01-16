import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})

// ControlValueAccessor: Permite acessar os acessores dos inputs de controle.
// Funciona como uma ponte entre os elementos nativos do Angular com o DOM
export class TextInputComponent implements OnInit, ControlValueAccessor {

  @ViewChild('input', {static: true}) input: ElementRef;
  @Input() type = 'text';
  @Input() label: string;

  // Lição 197 explica o funcinamento desse construtor
  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;

    // Validator síncrono
    const validators = control.validator ? [control.validator] : [];

    const asyncValidators = control.asyncValidator ? [control.asyncValidator] : [];

    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);
    control.updateValueAndValidity();
  }

  // tslint:disable-next-line: typedef
  onChange(event) {  }

  // tslint:disable-next-line: typedef
  onTouched() {  }

  writeValue(obj: any): void
  {
    this.input.nativeElement.value = obj || '';
  }

  registerOnChange(fn: any): void
  {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void
  {
    this.onTouched = fn;
  }

}
