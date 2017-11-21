import { AfterContentInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { AbstractMdcRipple } from '../ripple/abstract.mdc.ripple';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';
/**
 * Directive for making an element a ripple surface.
 */
export declare class MdcRippleDirective extends AbstractMdcRipple implements AfterContentInit, OnDestroy {
    private elm;
    private renderer;
    private registry;
    private _initialized;
    _on: boolean;
    private _disabled;
    private _unbounded;
    private _dim;
    constructor(elm: ElementRef, renderer: Renderer2, registry: MdcEventRegistry);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** @docs-private */
    protected isRippleUnbounded(): boolean;
    /** @docs-private */
    protected isRippleSurfaceDisabled(): boolean;
    /** @docs-private */
    protected computeRippleBoundingRect(): any;
    /**
     * Set this input to false to remove the ripple effect from the surface.
     */
    mdcRipple: any;
    /**
     * When this input has a value other than false, the ripple is unbounded.
     * Surfaces for bounded ripples should have <code>overflow</code> set to hidden,
     * while surfaces for unbounded ripples should have it set to <code>visible</code>.
     */
    unbounded: any;
    /**
     * This input sets the dimension of the ripple.
     * This input can be set to null for returning to the defaults, which uses the surface
     * element to compute the bounds of the ripple.
     */
    dimension: string | number;
    /**
     * This input can be used to programmatically enable/disable the ripple.
     * When true, the ripple effect will be disabled, when false the ripple
     * effect will be enabled. When not set, or <code>null</code> (default)
     * the ripple effect enabled/disabled state depend on whether or not the
     * surface element has the <code>disabled</code> attribute set.
     */
    disabled: any;
    private reInit();
    private layout();
}
