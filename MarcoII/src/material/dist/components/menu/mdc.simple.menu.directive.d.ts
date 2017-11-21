import { AfterContentInit, ElementRef, EventEmitter, OnDestroy, QueryList, Renderer2 } from '@angular/core';
import { MDCSimpleMenu } from '@material/menu';
import { MdcListDirective, MdcListFunction } from '../list/mdc.list.directive';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';
export interface MdcMenuSelection {
    value: any;
    index: number;
}
/**
 * Directive for an optional anchor to which a menu can position itself.
 * Use the <code>menuAnchor</code> input of <code>MdcSimpleMenuDirective</code>
 * to bind the menu to the anchor. The anchor must be a direct parent of the menu.
 * It will get the following styles to make the positioning work:
 * <code>position: relative;</code>, and <code>overflow: visible;</code>.
 */
export declare class MdcMenuAnchorDirective {
    _elm: ElementRef;
    _cls: boolean;
    constructor(_elm: ElementRef);
}
/**
 * Directive for a spec aligned material design 'Simple Menu'.
 * This directive should wrap an <code>MdcListDirective</code>. The <code>mdcList</code>
 * contains the menu items (and possible separators).
 */
export declare class MdcSimpleMenuDirective implements AfterContentInit, OnDestroy {
    _elm: ElementRef;
    private _rndr;
    private _registry;
    _cls: boolean;
    private _function;
    private _open;
    private _openFrom;
    /**
     * Assign an (optional) <code>MdcMenuAnchorDirective</code>. If set the menu
     * will position itself relative to this anchor element. The anchor should be
     * a direct parent of this menu.
     */
    menuAnchor: MdcMenuAnchorDirective;
    /**
     * Event emitted when the user selects a value. The passed object contains a value
     * (set to the <code>value</code> of the selected list item), and an index
     * (set to the index of the selected list item).
     */
    pick: EventEmitter<MdcMenuSelection>;
    /**
     * Event emitted when the menu is closed without any selection being made.
     */
    cancel: EventEmitter<void>;
    /**
     * Event emitted when the menu is opened or closed.
     */
    isOpenChange: EventEmitter<boolean>;
    private _lastList;
    _listQuery: QueryList<MdcListDirective>;
    private _prevFocus;
    private mdcAdapter;
    private foundation;
    _component: MDCSimpleMenu;
    constructor(_elm: ElementRef, _rndr: Renderer2, _registry: MdcEventRegistry);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private _onOpenClose(emit?);
    _listFunction: MdcListFunction;
    readonly _list: MdcListDirective;
    readonly _isSelect: boolean;
    /**
     * When this input is defined and does not have value false, the menu will be opened,
     * otherwise the menu will be closed.
     */
    isOpen: any;
    /**
     * Set this value if you want to customize the direction from which the menu will be opened.
     * Note that without this setting the menu will base the direction upon its position in the viewport,
     * which is normally the right behavior. Use <code>'tl'</code> for top-left, <code>'br'</code>
     * for bottom-right, etc.
     */
    openFrom: 'tl' | 'tr' | 'bl' | 'br' | null;
    readonly _tl: boolean;
    readonly _tr: boolean;
    readonly _bl: boolean;
    readonly _br: boolean;
    /**
     * Assign any <code>HTMLElement</code> to this property to use as the viewport instead of
     * the window object. The menu will choose to open the menu from the top or bottom, and
     * from the left or right, based on the space available inside the viewport.
     * It's normally not needed to set this, and mainly added for the demos and examples.
     */
    viewport: HTMLElement;
}
