import { ElementRef, Renderer2 } from '@angular/core';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';
/** @docs-private */
export declare abstract class AbstractMdcRipple {
    protected _rippleElm: ElementRef;
    protected _renderer: Renderer2;
    protected _registry: MdcEventRegistry;
    private mdcRippleAdapter;
    protected _rippleFoundation: {
        init();
        destroy();
        activate(event?: Event);
        deactivate(event?: Event);
        layout();
    };
    constructor(_rippleElm: ElementRef, _renderer: Renderer2, _registry: MdcEventRegistry);
    protected initRipple(): void;
    protected destroyRipple(): void;
    protected isRippleInitialized(): boolean;
    activateRipple(): void;
    deactivateRipple(): void;
    protected getRippleInteractionElement(): ElementRef;
    protected isRippleUnbounded(): boolean;
    protected isRippleSurfaceActive(): any;
    protected isActiveElement(element: HTMLElement): any;
    protected isRippleSurfaceDisabled(): boolean;
    protected addClassToRipple(name: string): void;
    protected removeClassFromRipple(name: string): void;
    protected computeRippleBoundingRect(): any;
}
