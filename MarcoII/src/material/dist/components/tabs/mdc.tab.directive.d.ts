import { AfterContentInit, EventEmitter, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { AbstractMdcRipple } from '../ripple/abstract.mdc.ripple';
import { MdcTabAdapter } from './mdc.tab.adapter';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';
export interface MdcTabChange {
    tab: AbstractMdcTabDirective;
    tabIndex: number;
}
export declare class MdcTabIconDirective {
    _hostClass: boolean;
}
export declare class MdcTabIconTextDirective {
    _hostClass: boolean;
}
export declare class AbstractMdcTabDirective extends AbstractMdcRipple implements OnDestroy, AfterContentInit {
    protected _rndr: Renderer2;
    protected _root: ElementRef;
    protected _registry: MdcEventRegistry;
    _hostClass: boolean;
    _mdcTabIcon: MdcTabIconDirective;
    _mdcTabIconText: MdcTabIconTextDirective;
    activate: EventEmitter<MdcTabChange>;
    protected _adapter: MdcTabAdapter;
    _foundation: any;
    constructor(_rndr: Renderer2, _root: ElementRef, _registry: MdcEventRegistry);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    readonly _tabWithIconAndText: boolean;
    _active: boolean;
}
export declare class MdcTabDirective extends AbstractMdcTabDirective {
    constructor(rndr: Renderer2, root: ElementRef, registry: MdcEventRegistry);
    isActive: boolean;
}
