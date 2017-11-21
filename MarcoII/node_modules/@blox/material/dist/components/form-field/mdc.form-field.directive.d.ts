import { AfterContentInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { AbstractMdcRipple } from '../ripple/abstract.mdc.ripple';
import { AbstractMdcInput } from '../abstract/abstract.mdc.input';
import { AbstractMdcLabel } from '../abstract/abstract.mdc.label';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';
export declare class MdcFormFieldInputDirective extends AbstractMdcInput {
    _elm: ElementRef;
    _cntr: NgControl;
    private _id;
    private _disabled;
    constructor(_elm: ElementRef, _cntr: NgControl);
    id: string;
    disabled: any;
}
export declare class MdcFormFieldLabelDirective extends AbstractMdcLabel {
    _elm: ElementRef;
    for: string;
    constructor(_elm: ElementRef);
}
export declare class MdcFormFieldDirective implements AfterContentInit, OnDestroy {
    private renderer;
    private root;
    private registry;
    _cls: boolean;
    private _alignEnd;
    rippleChild: AbstractMdcRipple;
    mdcInput: AbstractMdcInput;
    mdcLabel: AbstractMdcLabel;
    private mdcAdapter;
    private foundation;
    constructor(renderer: Renderer2, root: ElementRef, registry: MdcEventRegistry);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    alignEnd: any;
}
