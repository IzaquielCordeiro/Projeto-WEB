import { AfterContentInit, QueryList, Renderer2 } from '@angular/core';
import { MdcButtonDirective } from '../button/mdc.button.directive';
/**
 * Directive for the primary area (containing titles and subtitles) of a card.
 * The primary area is typically composed of a title (<code>MdcCardTitleDirective</code>),
 * and subtitle (<code>MdcCardSubtitleDirective</code>).
 * This directive should be put inside the card itself (<code>MdcCardDirective</code>),
 * or inside an horizontal block in the card (<code>MdcCardHorizontalDirective</code>).
 */
export declare class MdcCardPrimaryDirective {
    _cls: boolean;
    constructor();
}
/**
 * Directive for the title of a card. Should be put inside the primary area
 * (<code>MdcCardPrimaryDirective</code>) of a card.
 */
export declare class MdcCardTitleDirective {
    _cls: boolean;
    private _large;
    constructor();
    /**
     * When this input is defined and does not have value false,
     * the title will be made larger.
     */
    large: any;
}
/**
 * Directive for the subtitle of a card. Should be put inside the primary area
 * (<code>MdcCardPrimaryDirective</code>) of a card.
 */
export declare class MdcCardSubtitleDirective {
    _cls: boolean;
    constructor();
}
/**
 * Directive for the textual content of the card.
 * If used, this directive should be put inside the card itself ( (<code>MdcCardDirective</code>)),
 * or inside an horizontal block in the card (<code>MdcCardHorizontalDirective</code>)
 */
export declare class MdcCardTextDirective {
    _cls: boolean;
    constructor();
}
/**
 * Directive for rich media embedded in cards.
 * If used, this directive should be put inside the card itself (<code>MdcCardDirective</code>).
 * For media items inside an horizonal block, use <code>MdcCardMediaItemDirective</code>
 * instead.
 */
export declare class MdcCardMediaDirective {
    _cls: boolean;
    constructor();
}
/**
 * Directive for showing the different actions a user can take. Composed of one or more
 * card actions, which must be buttons that have the <code>MdcButtonDirective</code>.
 * (Icon buttons as actions are currently not supported by the upstream Material Components
 * Web library. Once they are supported, we'll add support for them as card actions too).
 */
export declare class MdcCardActionsDirective implements AfterContentInit {
    private renderer;
    _cls: boolean;
    _children: QueryList<MdcButtonDirective>;
    private _initialized;
    private _compact;
    private _vertical;
    constructor(renderer: Renderer2);
    ngAfterContentInit(): void;
    private _initChildren();
    /**
     * When this input is defined and does not have value false, all contained buttions
     * will automagically get compact styling, which is equal to setting the <code>compact</code>
     * input on the buttons individually.
     */
    compact: any;
    /**
     * When this input is defined and does not have value false, the actions are layed out
     * vertically inside of horizontally.
     */
    vertical: any;
}
/**
 * Directive for stacking multiple card blocks horizontally instead of vertically inside the card.
 * This directive should be put inside the card itself (<code>MdcCardDirective</code>) and wraps
 * the blocks that should be stacked horizontally, such as <code>MdcCardPrimaryDirective</code>,
 * <code>MdcCardMediaItemDirective</code>, and <code>MdcCardActionsDirective</code>.
 */
export declare class MdcCardHorizontalDirective {
    _cls: boolean;
    constructor();
}
/**
 * Directive for media items. They are intended for use in horizontal blocks, taking up a fixed height,
 * rather than stretching to the width of the card.
 * Use the <code>sizeFactor</code> input to select from some predefined media item sizes.
 */
export declare class MdcCardMediaItemDirective {
    _cls: boolean;
    private _size;
    constructor();
    readonly _size1dot5: boolean;
    readonly _size2: boolean;
    readonly _size3: boolean;
    /**
     * Directive to select the media item size. Possible values are:<br/>
     * 1 (the default): sets the height to 80px.<br/>
     * 1.5: sets the height to 120px.<br/>
     * 2: sets the height to 160px.<br/>
     * 3: sets the height to 240px.<br/>
     * Any other value will reset <code>sizeFactor</code> to 1, to have a 80px height.
     */
    sizeFactor: any;
}
/**
 * Directive for a material designed card. The card can be composed with the following directives:
 * <code>MdcCardPrimaryDirective</code>, <code>MdcCardTextDirective</code>, <code>MdcCardMediaDirective</code>,
 * <code>MdcCardActionsDirective</code>, <code>MdcCardHorizontalDirective</code>.
 */
export declare class MdcCardDirective {
    _cls: boolean;
    constructor();
}
