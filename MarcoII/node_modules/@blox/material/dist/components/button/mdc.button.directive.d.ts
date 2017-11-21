import { AfterContentInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { AbstractMdcRipple } from '../ripple/abstract.mdc.ripple';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';
/**
 * Material design button. Anchors can also be styled as buttons with this directive.
 * Defaults to a button that is flushed with the surface.
 * Use the input modifiers to alter the styling, or create your own style
 * based on the provided sass-mixins.
 */
export declare class MdcButtonDirective extends AbstractMdcRipple implements AfterContentInit, OnDestroy {
    _elm: ElementRef;
    _cls: boolean;
    private _compact;
    private _dense;
    private _primary;
    private _accent;
    private _raised;
    private _stroked;
    constructor(_elm: ElementRef, renderer: Renderer2, registry: MdcEventRegistry);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /**
     * When this input is defined and does not have value false, the button will be elevated
     * upon the surface.
     */
    raised: any;
    /**
     * When this input is defined and does not have value false, the button will be styled
     * flush with the surface and have a visible border.
     */
    stroked: any;
    /**
     * When this input is defined and does not have value false, the amount of horizontal padding
     * in the button will be reduced.
     */
    compact: any;
    /**
     * When this input is defined and does not have value false, the button text is compressed
     * to make it slightly smaller.
     */
    dense: any;
}
