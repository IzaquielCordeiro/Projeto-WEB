import { ElementRef, AfterContentInit, Renderer2 } from '@angular/core';
/**
 * Directive for elevating an element above its surface.
 */
export declare class MdcElevationDirective implements AfterContentInit {
    private rndr;
    private elm;
    private _z;
    private _transition;
    constructor(rndr: Renderer2, elm: ElementRef);
    ngAfterContentInit(): void;
    /**
     * Input for setting the elevation (z-space). The value sould be in the range [0, 24].
     * When set to 0, the element will not be elevated! The default value is 1.
     */
    mdcElevation: string | number;
    /**
     * When this input is defined and does not have value false, changes of the elevation
     * will be animated.
     */
    animateTransition: any;
}
