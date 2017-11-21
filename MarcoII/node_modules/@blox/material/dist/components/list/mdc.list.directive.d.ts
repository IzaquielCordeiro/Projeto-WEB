import { AfterContentInit, ElementRef, QueryList } from '@angular/core';
/**
 * Directive for a separator in a list.
 * This directive, if used, should be the child of an <code>MdcListDirective</code>, or
 * an <code>MdcSelectMultipleNativeDirective</code>.
 * This directive also adds the "role" attribute to its element.
 */
export declare class MdcListDividerDirective {
    private _elm;
    _cls: boolean;
    _role: string;
    _disabled: boolean;
    private _inset;
    constructor(_elm: ElementRef);
    /**
     * When this input is defined and does not have value false, the divider is styled with
     * an inset.
     */
    hasInset: any;
}
/**
 * Directive for the items of a material list.
 * This directive should be used for the direct children of a <code>MdcListDirective</code>.
 */
export declare class MdcListItemDirective {
    _elm: ElementRef;
    _cls: boolean;
    _role: any;
    private _disabled;
    /**
     * When a list is used inside an <code>mdcSimpleMenu</code>, or <code>mdcSelect</code>,
     * this property can be used to assign a value to this choice/selection item.
     */
    value: any;
    constructor(_elm: ElementRef);
    /**
     * When a list is used inside an <code>mdcSimpleMenu</code>, or <code>mdcSelect</code>,
     * this property can be used to disable the item. When disabled, the list-item will have
     * the <code>aria-disabled</code> attribute, and for  <code>mdcSimpleMenu</code>,
     * or <code>mdcSelect</code> will set the <code>tabindex</code> to <code>-1</code>.
     */
    disabled: any;
    readonly _tabIndex: number;
    readonly _ariaDisabled: string;
}
/**
 * Directive to mark the first line of an item with "two line list" styling
 * according to the Material Design spec.
 * This directive, if used, should be the child of an <code>MdcListItemDirective</code>.
 * Using this directive inside any <code>mdcListItem</code> will put the list
 * "two line" mode.
 */
export declare class MdcListItemTextDirective {
    _cls: boolean;
    constructor();
}
/**
 * Directive for the secondary text of an item with "two line list" styling.
 */
export declare class MdcListItemTextSecondaryDirective {
    _cls: boolean;
    constructor();
}
/**
 * Directive for the start detail item of a list item.
 * This directive, if used, should be the child of an <code>MdcListItemDirective</code>.
 */
export declare class MdcListItemStartDetailDirective {
    _cls: boolean;
    constructor();
}
/**
 * Directive for the end detail item of a list item.
 * This directive, if used, should be the child of an <code>MdcListItemDirective</code>.
 */
export declare class MdcListItemEndDetailDirective {
    _cls: boolean;
    constructor();
}
export declare enum MdcListFunction {
    plain = 0,
    menu = 1,
    select = 2,
}
/**
 * Directive for a material list.
 * The children of this directive should either be <code>MdcListItemDirective</code>,
 * or <code>MdcListDividerDirective</code> elements.
 * This directive can optionally be contained in a <code>MdcListGroupDirective</code>, in a
 * <code>MdcSimpleMenuDirective</code>, or in a <code>MdcSelectDirective</code>.
 */
export declare class MdcListDirective implements AfterContentInit {
    _elm: ElementRef;
    _cls: boolean;
    _items: QueryList<MdcListItemDirective>;
    _texts: QueryList<MdcListItemTextDirective>;
    _twoLine: boolean;
    private _function;
    _hidden: boolean;
    private _dense;
    private _avatar;
    constructor(_elm: ElementRef);
    ngAfterContentInit(): void;
    private updateItemRoles();
    readonly _role: string;
    readonly _ariaHidden: string;
    readonly _isMenu: boolean;
    _setFunction(val: MdcListFunction): void;
    /**
     * When this input is defined and does not have value false, the list will be styled more
     * compact.
     */
    dense: any;
    /**
     * When this input is defined and does not have value false, elements with directive <code>mdcListItemStartDetail</code>
     * will be styled for avatars: large, circular elements that lend themselves well to contact images, profile pictures, etc.
     */
    avatarList: any;
}
/**
 * Directive for a header inside a list group (<code>MdcListGroupDirective</code>) directive.
 */
export declare class MdcListGroupSubHeaderDirective {
    _cls: boolean;
    constructor();
}
/**
 * Directive for a material designed list group, grouping several
 * <code>MdcListDirective</code> lists.
 * List groups should contain elements with <code>mdcListGroupSubHeader</code>,
 * and <code>mdcList</code> directives.
 */
export declare class MdcListGroupDirective {
    _cls: boolean;
    constructor();
}
