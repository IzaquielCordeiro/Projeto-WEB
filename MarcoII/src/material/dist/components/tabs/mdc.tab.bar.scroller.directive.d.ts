import { AfterContentInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { AbstractMdcTabDirective } from './mdc.tab.directive';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';
import { MdcTabBarDirective } from './mdc.tab.bar.directive';
export declare class MdcTabBarScrollerInnerDirective {
    _hostClass: boolean;
}
export declare class MdcTabBarScrollerBackDirective {
    _el: ElementRef;
    _hostClass: boolean;
    _back: boolean;
    constructor(_el: ElementRef);
}
export declare class MdcTabBarScrollerForwardDirective {
    _el: ElementRef;
    _hostClass: boolean;
    _forward: boolean;
    constructor(_el: ElementRef);
}
export declare class MdcTabBarScrollerFrameDirective implements AfterContentInit {
    _el: ElementRef;
    _hostClass: boolean;
    _tabBar: MdcTabBarDirective;
    constructor(_el: ElementRef);
    ngAfterContentInit(): void;
    _tabAt(index: number): AbstractMdcTabDirective;
}
export declare class MdcTabBarScrollerDirective implements AfterContentInit, OnDestroy {
    private _rndr;
    private _el;
    private registry;
    _hostClass: boolean;
    _back: MdcTabBarScrollerBackDirective;
    _forward: MdcTabBarScrollerForwardDirective;
    _scrollFrame: MdcTabBarScrollerFrameDirective;
    direction: string;
    private _adapter;
    private _foundation;
    constructor(_rndr: Renderer2, _el: ElementRef, registry: MdcEventRegistry);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private _tabAt(index);
}
