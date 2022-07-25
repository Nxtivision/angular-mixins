import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Inject,
  Injectable,
  Injector,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Injectable()
export abstract class BaseClassInjector
  implements
    OnChanges,
    OnInit,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  constructor(public injector: Injector) {}

  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {}
  ngAfterContentInit(): void {}
  ngAfterContentChecked(): void {}
  ngAfterViewInit(): void {}
  ngAfterViewChecked(): void {}
  ngOnDestroy(): void {}
}

type GConstructor<T = {}> = new (...args: any[]) => T;

export type BaseInjectorConstructor = GConstructor<BaseClassInjector>;

@Injectable()
export class Base extends BaseClassInjector {}
