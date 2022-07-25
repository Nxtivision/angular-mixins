import { Injectable, Input } from '@angular/core';
import { BaseInjectorConstructor } from './base-class-injector';

export const LENGTH_VALIDATOR_METADATA = {
  inputs: ['minLength', 'maxLength'],
};

/**
 * This mixin will add all inputs related to max and min length for input.
 *
 * Generally used with input[type=text] and textarea
 * @param Base
 * @see BaseClassInjector
 * @constructor
 */
export function LengthValidatorMixin<TBase extends BaseInjectorConstructor>(
  Base: TBase
) {
  @Injectable()
  class LengthValidatorTemplate extends Base {
    /**
     * Minimum length for the input
     */
    @Input() minLength: string | number | null = null;

    /**
     * Maximum length for the input
     */
    @Input() maxLength: string | number | null = null;
  }
  return LengthValidatorTemplate;
}
