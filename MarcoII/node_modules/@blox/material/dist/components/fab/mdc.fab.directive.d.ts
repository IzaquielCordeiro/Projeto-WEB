import { AfterContentInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { AbstractMdcRipple } from '../ripple/abstract.mdc.ripple';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';
/**
 * Directive for the icon of a Floating Action Button
 * (<code>MdcFabDirective</code>).
 */
export declare class MdcFabIconDirective {
    _cls: boolean;
}
/**
 * Material design Floating Action Button. The element should embed
 * an icon element with the <code>MdcFabIconDirective</code>.
 */
export declare class MdcFabDirective extends AbstractMdcRipple implements AfterContentInit, OnDestroy {
    private _elm;
    _cls: boolean;
    private _mini;
    private _exited;
    constructor(_elm: ElementRef, renderer: Renderer2, registry: MdcEventRegistry);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /**
     * When this input is defined and does not have value false, the FAB will
     * be modified to a smaller size.
     */
    mini: any;
    /**
     * Setting this property to true will animate the FAB out of view.
     * Setting it to false will animate the FAB back into view.
     */
    exited: any;
}
