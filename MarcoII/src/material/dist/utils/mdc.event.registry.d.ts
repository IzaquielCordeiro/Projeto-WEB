import { ElementRef, Optional, Renderer2 } from '@angular/core';
export declare class MdcEventRegistry {
    constructor();
    listen(renderer: Renderer2, type: string, listener: EventListener, ref: ElementRef, options?: any): void;
    listenElm(renderer: Renderer2, type: string, listener: EventListener, el: Element | Window, options?: any): void;
    registerUnlisten(type: string, listener: EventListener, unlistener: Function): void;
    unlisten(type: string, listener: EventListener): void;
}
/** @docs-private */
export declare function MDC_EVENT_REGISTRY_PROVIDER_FACTORY(parent: MdcEventRegistry): MdcEventRegistry;
/** @docs-private */
export declare const MDC_EVENT_REGISTRY_PROVIDER: {
    provide: typeof MdcEventRegistry;
    deps: Optional[][];
    useFactory: (parent: MdcEventRegistry) => MdcEventRegistry;
};
