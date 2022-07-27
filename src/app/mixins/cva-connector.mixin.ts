import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
} from '@angular/forms';
import { HostBinding, Injectable, Input, ViewChild } from '@angular/core';
import { BaseInjectorConstructor } from './base-class-injector';

/**
 * Necessary to make CvaConnectorMixin works by applying these Metadata options inside
 * Component decorator
 */
export const CVA_CONNECTOR_METADATA = {
  host: {
    '[class.one-forms-input]': 'hostClass',
  },
  inputs: [
    'label',
    'formControl',
    'formControlName',
    'description',
  ],
};

/**
 * This mixin will add all default inputs and hostBindings, so every custom input
 * will have default. This is the most common mixin we will use for extending our custom inputs
 * @param Base
 * @see BaseClassInjector
 * @constructor
 */
export const CvaConnectorMixin = <TBase extends BaseInjectorConstructor>(
  Base: TBase
) => {
  @Injectable()
  @Injectable()
  class ControlValueAccessorConnector
    extends Base
    implements ControlValueAccessor
  {
    /** Default class applied on Host element */
    @HostBinding('class.one-forms-input')
    hostClass = true;

    /**
     * @internal
     *
     * used internally to manage the form control
     */
    @ViewChild(FormControlDirective, { static: true })
    formControlDirective: FormControlDirective | undefined;

    /**
     * First way to set the formControl by using the formControl itself
     */
    @Input()
    formControl: FormControl | undefined;

    /**
     * Another way to set the formControl by using the formControlName
     */
    @Input()
    formControlName = '';

    /**
     * Label to name the input
     */
    @Input()
    label = '';

    /**
     * The message to describe the input by setting the mat-hint
     */
    @Input()
    description = '';

    /**
     * This is a shortcut to get the formControl directly
     */
    get control(): AbstractControl | null | undefined {
      return (
        this.formControl ||
        this.controlContainer.control?.get(this.formControlName)
      );
    }

    /**
     * Consult the injector to get the ControlContainer
     *
     * @see ControlContainer
     */
    get controlContainer() {
      // ERROR: injector is undefined
      return this.injector.get(ControlContainer);
    }

    registerOnTouched(fn: unknown): void {
      this.formControlDirective?.valueAccessor?.registerOnTouched(fn);
    }

    registerOnChange(fn: unknown): void {
      this.formControlDirective?.valueAccessor?.registerOnChange(fn);
    }

    writeValue(obj: unknown): void {
      this.formControlDirective?.valueAccessor?.writeValue(obj);
    }

    setDisabledState(isDisabled: boolean): void {
      this.formControlDirective?.valueAccessor?.setDisabledState &&
        this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
    }
  }
  return ControlValueAccessorConnector;
};
