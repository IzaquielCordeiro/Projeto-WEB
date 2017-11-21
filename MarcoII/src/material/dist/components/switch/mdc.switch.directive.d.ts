import { AfterContentInit, ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { AbstractMdcInput } from '../abstract/abstract.mdc.input';
/**
 * Directive for the input element of an <code>MdcSwitchDirective</code>.
 */
export declare class MdcSwitchInputDirective extends AbstractMdcInput {
    _elm: ElementRef;
    _cntr: NgControl;
    _cls: boolean;
    private _id;
    private _disabled;
    constructor(_elm: ElementRef, _cntr: NgControl);
    /** @docs-private */
    id: string;
    /** @docs-private */
    disabled: any;
}
/**
 * Directive for creating a Material Design switch component. The switch is driven by an
 * underlying native checkbox input, which must use the <code>MdcSwitchInputDirective</code>
 * directive.
 * The current implementation will add all other required DOM elements (such as the
 * background).
 * Future implementations will also support supplying (customized) background
 * elements.
 * </p><p>
 * This directive can be used together with an <code>mdcFormField</code> to
 * easily position switches and their labels, see
 * <a href="#/directives/form-field">mdcFormField</a>.
 */
export declare class MdcSwitchDirective implements AfterContentInit {
    private rndr;
    private root;
    _cls: boolean;
    _input: MdcSwitchInputDirective;
    constructor(rndr: Renderer2, root: ElementRef);
    ngAfterContentInit(): void;
    private addBackground();
    readonly _disabled: any;
}
