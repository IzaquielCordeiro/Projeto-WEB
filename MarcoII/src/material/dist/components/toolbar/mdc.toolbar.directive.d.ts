import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';
/**
 * A directive for a toolbar row. The content of a toolbar should always be embedded
 * in toolbar rows. So this directive should always be used as a direct child of an
 * <code>MdcToolbarDirective</code>. Multiple rows are allowed, which rows are visible
 * depends on the style of the toolbar, and the scroll position of the content of
 * the page.
 */
export declare class MdcToolbarRowDirective {
    _elm: ElementRef;
    _hostClass: boolean;
    constructor(_elm: ElementRef);
}
/**
 * A directive for a toolbar section. A toolbar row should always be composed of toolbar sections.
 * Thus, this directive should always be used as a direct child of an <code>MdcToolbarRowDirective</code>.
 * Multiple sections, with different alignment options, are allowed per row.
 */
export declare class MdcToolbarSectionDirective {
    _hostClass: boolean;
    private _alignEnd;
    private _alignStart;
    private _shrinkToFit;
    /**
     * Make the section align to the start of the toolbar row (default alignment is to the
     * center).
     */
    alignStart: any;
    /**
     * Make the section align to the end of the toolbar row (default alignment is to the
     * center).
     */
    alignEnd: any;
    /**
     * Toolbar sections are laid out using flexbox. Each section will take up an equal amount
     * of space within the toolbar by default. To accomodate very long sections (e.g. a  long title),
     * set <code>shrinkToFit</code> to a value other than false on the other sections in the row.
     */
    shrinkToFit: any;
}
/**
 * This directive adds extra styling to toolbar text that represents the title of the toolbar.
 * The directive should be a child of an <code>MdcToolbarSectionDirective</code>.
 */
export declare class MdcToolbarTitleDirective {
    _elm: ElementRef;
    _hostClass: boolean;
    constructor(_elm: ElementRef);
}
/**
 * This directive is typically used to style icons placed in the toolbar placed
 * on the right hands side. Use <code>MdcToolbarMenuIcon</code> for the 'main'
 * icon, usually placed to the left of the menu.
 * The directive should be a child of an <code>MdcToolbarSectionDirective</code>.
 */
export declare class MdcToolbarIcon {
    _elm: ElementRef;
    _hostClass: boolean;
    constructor(_elm: ElementRef);
}
/**
 * This directive is typically used to style the main toolbar icon, usually placed to
 * the left of the toolbar title. For other icons in the toolbar, use
 * <code>MdcToolbarIcon</code> instead.
 */
export declare class MdcToolbarMenuIcon {
    _elm: ElementRef;
    _hostClass: boolean;
    constructor(_elm: ElementRef);
}
/**
 * For <code>isFixed</code> toolbars, this directive should be put on the page's
 * content wrapper element, and the exported directive should be assigned to the
 * <code>fixedAdjust</code> property of the <code>MdcToolbarDirective</code>.
 * This will make the toolbar aware of the content wrapper, so that the top marging
 * can be adjusted based on the style of the toolbar, and the scroll of the content.
 */
export declare class MdcToolbarFixedAdjustDirective {
    _elm: ElementRef;
    _hostClass: boolean;
    constructor(_elm: ElementRef);
}
/**
 * A directive for creating toolbars. All content inside a toolbar should be
 * embedded inside <code>MdcToolbarRowDirective</code> elements.
 */
export declare class MdcToolbarDirective implements AfterViewInit, OnDestroy {
    private renderer;
    private root;
    private registry;
    _hostClass: boolean;
    /**
     * Assign a <code>MdcToolbarFixedAdjustDirective</code> put on the main
     * content of the page. Required for <code>isFixed</code> toolbars,
     * to properly layout the toolbar and the content when users scroll.
     */
    fixedAdjust: MdcToolbarFixedAdjustDirective;
    /**
     * A number between [0, 1] that represents the <em>ratio of flexible space
     * that has already been collapsed divided by the total amount of flexible space</em>
     * for flexible toolbars.
     */
    expansionRatio: EventEmitter<number>;
    _title: any;
    _firstRow: any;
    private _viewport;
    private _mdcViewPortScrollListener;
    private _initialized;
    private _fixed;
    private _waterfall;
    private _fixedLastRowOnly;
    private _flexible;
    private _flexibleDefaultBehavior;
    private mdcAdapter;
    private foundation;
    constructor(renderer: Renderer2, root: ElementRef, registry: MdcEventRegistry);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    _updateViewPort(): void;
    /**
     * If set to a value other than false, the toolbar will be fixed to the top of the
     * screen (or viewport).
     */
    isFixed: any;
    /**
     * If set to a value other than false, and used in combination with <code>isFixed</code>
     * the toolbar will become a waterfall toolbar.
     * A waterfall toolbar is initially static and has no elevation, but when content scrolls under it,
     * the toolbar becomes fixed and gains elevation.
     */
    isWaterfall: any;
    /**
     * If set to a value other than false, fixed toolbars will anchor only the last row to the top.
     */
    isFixedLastrowOnly: any;
    /**
     * A flexible toolbar changes height when the user scrolls. Flexible behavior is highly customizable,
     * quoted from the upstream <code>mdc-toolbar</code> documentation:
     * <blockquote>
     * We only define the change of flexible space size without making further assumptions.
     * But we do recommend the height of flexible space should be an integral number of
     * toolbar row height and provide a easier way for user to customize height.
     * Users can adjust the height of flexible space through sass variable
     * <code>$mdc-toolbar-ratio-to-extend-flexible</code> or css variable
     * <code>--mdc-toolbar-ratio-to-extend-flexible</code>.
     * </blockquote>
     */
    isFlexible: any;
    /**
     * A default behavior for flexible toolbars.
     * For more information see:
     * <a href="https://github.com/material-components/material-components-web/tree/v0.23.0/packages/mdc-toolbar#flexible-toolbar-requires-javascript">
     * Flexible Toolbar documention
     * </a>.
     */
    isFlexibleDefaultBehavior: any;
    /**
     * Assign any <code>HTMLElement</code> to this property to place a flexible toolbar fixed to that element
     * (usually the parent container), instead of to the browser window. This property is mainly added for creating nice
     * demos of toolbars embedded inside oher pages (such as on this documentation page). It is not recommended to use
     * this for a real application toolbar. The position is kept fixed to the container element by listening
     * for scroll/resize events, and using javascript to recompute the position. This may influence the smoothness
     * of the scrolling experience, especially on mobile devices.
     * The viewport element should have css styling: <code>position: relative</code>, and should have a fixed
     * height.
     */
    viewport: HTMLElement;
}
