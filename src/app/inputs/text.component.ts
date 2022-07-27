import {
  Component,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import {
  Base,
  CVA_CONNECTOR_METADATA,
  CvaConnectorMixin,
  ERROR_STATE_MATCHER_METADATA,
  ErrorStateMatcherMixin,
  LENGTH_VALIDATOR_METADATA,
  LengthValidatorMixin,
} from '../mixins';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import deepMerge from '../deep-merge';

/**
 * input[type=text] custom component
 */
@Component({
  selector: 'input-text',
  templateUrl: './text.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextComponent),
      multi: true,
    },
  ],
  ...deepMerge(
    CVA_CONNECTOR_METADATA,
    LENGTH_VALIDATOR_METADATA,
    ERROR_STATE_MATCHER_METADATA
  ),
})
export class TextComponent
  extends CvaConnectorMixin(LengthValidatorMixin(ErrorStateMatcherMixin(Base)))
  implements OnInit
{
  /**
   * Used to implement a CSS class directly on the host
   * @internal
   */
  @HostBinding('class.one-forms-input-text')
  override hostClass = true;

  /**
   * Suffix icon to display
   */
  @Input()
  icon: string = '';

  ngOnInit() {
    console.log(this);
  }
}
