import { BaseInjectorConstructor } from './base-class-injector';
import { Injectable, Input } from '@angular/core';

export const MIN_MAX_VALIDATOR_METADATA = {
  inputs: ['min', 'max'],
};

/**
 * This mixin will add all inputs related to max and min for input.
 *
 * Generally used with input[type=number] and input[type=time]
 * @param Base
 * @see BaseClassInjector
 * @constructor
 */
export function MinMaxValidatorMixin<TBase extends BaseInjectorConstructor>(
  Base: TBase
) {
  @Injectable()
  class MinMaxValidatorTemplate extends Base {
    /** Minimum value for number input. It uses the built-in MinValidator from Angular */
    @Input() min: string | number | null = null;
    /** Maximum value for number input. It uses the built-in MaxValidator from Angular */
    @Input() max: string | number | null = null;
  }
  return MinMaxValidatorTemplate;
}
