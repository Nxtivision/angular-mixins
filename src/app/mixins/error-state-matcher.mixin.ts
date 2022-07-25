import { BaseInjectorConstructor } from './base-class-injector';
import { Injectable, Input } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';

export const ERROR_STATE_MATCHER_METADATA = {
  inputs: ['errorStateMatcher'],
};

/**
 * This mixin will enable the control to customize the ErrorStateMatcher
 * @param Base
 * @see BaseClassInjector
 * @constructor
 */
export function ErrorStateMatcherMixin<TBase extends BaseInjectorConstructor>(
  Base: TBase
) {
  @Injectable()
  class CustomErrorStateMatcher extends Base {
    /**
     * Modify the default behavior for this control to show errors
     */
    @Input()
    errorStateMatcher: ErrorStateMatcher | undefined;

    /**
     * If no errorStateMatcher defined, we will use the one provided in our module, so we keep a kind of inheritance
     */
    get defaultErrorStateMatcher() {
      return this.injector.get(ErrorStateMatcher);
    }
  }
  return CustomErrorStateMatcher;
}
