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
    '[style.user-select]': 'userSelectMode',
    '[style.display]': 'hostDisplay',
    '[class.without-label]': 'hostWithoutLabel',
    '[style.width]': 'width',
  },
  inputs: [
    'label',
    'formControl',
    'formControlName',
    'placeholder',
    'description',
    'required',
    'readonly',
    'customErrors',
    'width',
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

    /** Update user-select CSS property */
    @HostBinding('style.user-select')
    userSelectMode = 'auto';
    /**
     * Used to implement the display CSS property directly on the host
     */
    @HostBinding('style.display') hostDisplay = 'inline-block';

    /**
     * Set style width property for this control.
     *
     * @default '100%'
     */
    @HostBinding('style.width') @Input() width = '100%';
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
     * Placeholder of the input, when there is no user input
     */
    @Input()
    placeholder = '';

    /**
     * Label to name the input
     */
    @Input()
    label = '';

    /**
     * Whether to require the field, so it must be filled
     */
    @Input()
    required = false;

    /**
     * Whether to mark this field as readonly, so the user can only consult the data
     */
    @Input()
    readonly = false;

    /**
     * Add without-label class to the host component if no label specified
     * @protected
     */
    @HostBinding('class.without-label')
    get hostWithoutLabel() {
      return this.label === '';
    }

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
