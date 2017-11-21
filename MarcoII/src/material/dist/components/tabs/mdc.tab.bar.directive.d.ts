import { EventEmitter, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';
import { AbstractMdcTabDirective, MdcTabChange } from './mdc.tab.directive';
export declare class MdcTabBarDirective {
    private _rndr;
    _el: ElementRef;
    private registry;
    _hostClass: boolean;
    _insideScrollFrame: boolean;
    _tabs: QueryList<AbstractMdcTabDirective>;
    tabChange: EventEmitter<MdcTabChange>;
    private _indicator;
    private _adapter;
    private _subscriptions;
    private _foundation;
    constructor(_rndr: Renderer2, _el: ElementRef, registry: MdcEventRegistry);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private addIndicator();
    private _listenTabSelected();
    private _unlistenTabSelected();
    private _setActive(tab, notifyChange);
    readonly _tabBarWithIcon: boolean;
    readonly _tabBarWithIconAndText: boolean;
}
