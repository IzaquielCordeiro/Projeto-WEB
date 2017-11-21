import { AfterContentInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { AbstractMdcInput } from '../abstract/abstract.mdc.input';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';
import { AbstractMdcRipple } from '../ripple/abstract.mdc.ripple';
/**
 * Directive for the input element of an <code>MdcCheckboxDirective</code>.
 */
export declare class MdcCheckboxInputDirective extends AbstractMdcInput {
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
 * Directive for creating a Material Design checkbox. The checkbox is driven by an
 * underlying native checkbox input, which must use the <code>MdcCheckboxInputDirective</code>
 * directive.
 * The current implementation will add all other required DOM elements (such as the
 * background).
 * Future implementations will also support supplying (customized) background
 * elements.
 * </p><p>
 * This directive can be used together with an <code>mdcFormField</code> to
 * easily position checkboxes and their labels, see
 * <a href="#/directives/form-field">mdcFormField</a>.
 */
export declare class MdcCheckboxDirective extends AbstractMdcRipple implements AfterContentInit, OnDestroy {
    private renderer;
    private root;
    private registry;
    _cls: boolean;
    _input: MdcCheckboxInputDirective;
    private mdcAdapter;
    private foundation;
    constructor(renderer: Renderer2, root: ElementRef, registry: MdcEventRegistry);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private addBackground();
    /** @docs-private */
    protected getRippleInteractionElement(): ElementRef;
    /** @docs-private */
    protected isRippleUnbounded(): boolean;
    /** @docs-private */
    protected computeRippleBoundingRect(): {
        top: any;
        left: any;
        right: any;
        bottom: any;
        width: number;
        height: number;
    };
    readonly _disabled: any;
}
