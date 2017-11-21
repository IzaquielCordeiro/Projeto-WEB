(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('tslib'), require('@material/ripple'), require('@angular/forms'), require('@material/checkbox'), require('@material/form-field'), require('@material/icon-toggle'), require('@material/linear-progress'), require('@material/menu'), require('@material/radio'), require('@material/select'), require('rxjs/Subject'), require('rxjs/operators/takeUntil'), require('@material/slider'), require('@material/animation'), require('@material/snackbar'), require('rxjs/operators/filter'), require('rxjs/operators/take'), require('@material/tabs'), require('@angular/router'), require('@material/textfield'), require('@material/toolbar')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'tslib', '@material/ripple', '@angular/forms', '@material/checkbox', '@material/form-field', '@material/icon-toggle', '@material/linear-progress', '@material/menu', '@material/radio', '@material/select', 'rxjs/Subject', 'rxjs/operators/takeUntil', '@material/slider', '@material/animation', '@material/snackbar', 'rxjs/operators/filter', 'rxjs/operators/take', '@material/tabs', '@angular/router', '@material/textfield', '@material/toolbar'], factory) :
	(factory((global.blox = global.blox || {}, global.blox.material = {}),global.ng.core,global.ng.common,global.tslib,global.mdc.ripple,global.ng.forms,global.mdc.checkbox,global.mdc.formField,global.mdc.iconToggle,global.mdc.linearProgress,global.mdc.menu,global.mdc.radio,global.mdc.select,global.Rx,global.Rx,global.mdc.slider,global.mdc.animation,global.mdc.snackbar,global.Rx,global.Rx,global.mdc.tabs,global.ng.router,global.mdc.textfield,global.mdc.toolbar));
}(this, (function (exports,core,common,tslib_1,ripple,forms,checkbox,formField,iconToggle,linearProgress,menu,radio,select,Subject,takeUntil,slider,animation,snackbar,filter,take,tabs,router,textfield,toolbar) { 'use strict';

/**
 * @param {?} value
 * @return {?}
 */
function asBoolean(value) {
    return value != null && "" + value !== 'false';
}
/**
 * @param {?} value
 * @return {?}
 */
function asBooleanOrNull(value) {
    if (value == null)
        return value;
    return "" + value !== 'false';
}

// cast to correct type (string); getMatchesProperty is annotated as returning string[], but it does actually return a string:
var matchesProperty = (ripple.util.getMatchesProperty(HTMLElement.prototype));
/**
 * \@docs-private
 * @abstract
 */
var AbstractMdcRipple = (function () {
    /**
     * @param {?} _rippleElm
     * @param {?} _renderer
     * @param {?} _registry
     */
    function AbstractMdcRipple(_rippleElm, _renderer, _registry) {
        var _this = this;
        this._rippleElm = _rippleElm;
        this._renderer = _renderer;
        this._registry = _registry;
        this.mdcRippleAdapter = {
            browserSupportsCssVars: function () { return ripple.util.supportsCssVariables(window); },
            isUnbounded: function () { return _this.isRippleUnbounded(); },
            isSurfaceActive: function () { return _this.isRippleSurfaceActive(); },
            isSurfaceDisabled: function () { return _this.isRippleSurfaceDisabled(); },
            addClass: function (className) { return _this.addClassToRipple(className); },
            removeClass: function (className) { return _this.removeClassFromRipple(className); },
            registerInteractionHandler: function (type, handler) {
                var /** @type {?} */ target = (type === 'mouseup' || type === 'pointerup') ? window : _this.getRippleInteractionElement().nativeElement;
                _this._registry.listenElm(_this._renderer, type, handler, target, ripple.util.applyPassive());
            },
            deregisterInteractionHandler: function (type, handler) {
                _this._registry.unlisten(type, handler);
            },
            registerResizeHandler: function (handler) {
                _this._registry.listenElm(_this._renderer, 'resize', handler, window);
            },
            deregisterResizeHandler: function (handler) {
                _this._registry.unlisten('resize', handler);
            },
            updateCssVariable: function (name, value) { _this._rippleElm.nativeElement.style.setProperty(name, value); },
            computeBoundingRect: function () { return _this.computeRippleBoundingRect(); },
            getWindowPageOffset: function () { return ({ x: window.pageXOffset, y: window.pageYOffset }); }
        };
    }
    /**
     * @return {?}
     */
    AbstractMdcRipple.prototype.initRipple = function () {
        if (this._rippleFoundation)
            throw new Error('initRipple() is called multiple times');
        this._rippleFoundation = new ripple.MDCRippleFoundation(this.mdcRippleAdapter);
        this._rippleFoundation.init();
    };
    /**
     * @return {?}
     */
    AbstractMdcRipple.prototype.destroyRipple = function () {
        if (this._rippleFoundation) {
            this._rippleFoundation.destroy();
            this._rippleFoundation = null;
        }
    };
    /**
     * @return {?}
     */
    AbstractMdcRipple.prototype.isRippleInitialized = function () {
        return this._rippleFoundation != null;
    };
    /**
     * @return {?}
     */
    AbstractMdcRipple.prototype.activateRipple = function () {
        if (this._rippleFoundation)
            this._rippleFoundation.activate();
    };
    /**
     * @return {?}
     */
    AbstractMdcRipple.prototype.deactivateRipple = function () {
        if (this._rippleFoundation)
            this._rippleFoundation.deactivate();
    };
    /**
     * @return {?}
     */
    AbstractMdcRipple.prototype.getRippleInteractionElement = function () {
        return this._rippleElm;
    };
    /**
     * @return {?}
     */
    AbstractMdcRipple.prototype.isRippleUnbounded = function () {
        return false;
    };
    /**
     * @return {?}
     */
    AbstractMdcRipple.prototype.isRippleSurfaceActive = function () {
        var /** @type {?} */ interactionElm = this.getRippleInteractionElement();
        if (interactionElm == null)
            return false;
        return this.isActiveElement(interactionElm.nativeElement);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    AbstractMdcRipple.prototype.isActiveElement = function (element) {
        return element == null ? false : element[matchesProperty](':active');
    };
    /**
     * @return {?}
     */
    AbstractMdcRipple.prototype.isRippleSurfaceDisabled = function () {
        var /** @type {?} */ interactionElm = this.getRippleInteractionElement();
        if (interactionElm == null)
            return true;
        return !!interactionElm.nativeElement.attributes.getNamedItem('disabled');
    };
    /**
     * @param {?} name
     * @return {?}
     */
    AbstractMdcRipple.prototype.addClassToRipple = function (name) {
        this._renderer.addClass(this._rippleElm.nativeElement, name);
    };
    /**
     * @param {?} name
     * @return {?}
     */
    AbstractMdcRipple.prototype.removeClassFromRipple = function (name) {
        this._renderer.removeClass(this._rippleElm.nativeElement, name);
    };
    /**
     * @return {?}
     */
    AbstractMdcRipple.prototype.computeRippleBoundingRect = function () {
        return this._rippleElm.nativeElement.getBoundingClientRect();
    };
    return AbstractMdcRipple;
}());

var unlisteners = new Map();
var MdcEventRegistry = (function () {
    function MdcEventRegistry() {
    }
    /**
     * @param {?} renderer
     * @param {?} type
     * @param {?} listener
     * @param {?} ref
     * @param {?=} options
     * @return {?}
     */
    MdcEventRegistry.prototype.listen = function (renderer, type, listener, ref, options) {
        this.listenElm(renderer, type, listener, ref.nativeElement, options);
    };
    /**
     * @param {?} renderer
     * @param {?} type
     * @param {?} listener
     * @param {?} el
     * @param {?=} options
     * @return {?}
     */
    MdcEventRegistry.prototype.listenElm = function (renderer, type, listener, el, options) {
        el.addEventListener(type, listener, options);
        var /** @type {?} */ unlistener = function () {
            el.removeEventListener(type, listener, options);
        };
        this.registerUnlisten(type, listener, unlistener);
    };
    /**
     * @param {?} type
     * @param {?} listener
     * @param {?} unlistener
     * @return {?}
     */
    MdcEventRegistry.prototype.registerUnlisten = function (type, listener, unlistener) {
        if (!unlisteners.has(type))
            unlisteners.set(type, new WeakMap());
        unlisteners.get(type).set(listener, unlistener);
    };
    /**
     * @param {?} type
     * @param {?} listener
     * @return {?}
     */
    MdcEventRegistry.prototype.unlisten = function (type, listener) {
        if (!unlisteners.has(type))
            return;
        var /** @type {?} */ unlistenerMap = unlisteners.get(type);
        if (!unlistenerMap.has(listener))
            return;
        unlistenerMap.get(listener)();
        unlistenerMap.delete(listener);
    };
    MdcEventRegistry.decorators = [
        { type: core.Injectable },
    ];
    /**
     * @nocollapse
     */
    MdcEventRegistry.ctorParameters = function () { return []; };
    return MdcEventRegistry;
}());
/**
 * \@docs-private
 * @param {?} parent
 * @return {?}
 */
function MDC_EVENT_REGISTRY_PROVIDER_FACTORY(parent) {
    return parent || new MdcEventRegistry();
}
/**
 * \@docs-private
 */
var MDC_EVENT_REGISTRY_PROVIDER = {
    provide: MdcEventRegistry,
    deps: [[new core.Optional(), new core.SkipSelf(), MdcEventRegistry]],
    useFactory: MDC_EVENT_REGISTRY_PROVIDER_FACTORY
};

/**
 * Material design button. Anchors can also be styled as buttons with this directive.
Defaults to a button that is flushed with the surface.
Use the input modifiers to alter the styling, or create your own style
based on the provided sass-mixins.
 */
var MdcButtonDirective = (function (_super) {
    tslib_1.__extends(MdcButtonDirective, _super);
    /**
     * @param {?} _elm
     * @param {?} renderer
     * @param {?} registry
     */
    function MdcButtonDirective(_elm, renderer, registry) {
        var _this = _super.call(this, _elm, renderer, registry) || this;
        _this._elm = _elm;
        _this._cls = true;
        _this._compact = false;
        _this._dense = false;
        _this._primary = false;
        _this._accent = false;
        _this._raised = false;
        _this._stroked = false;
        return _this;
    }
    /**
     * @return {?}
     */
    MdcButtonDirective.prototype.ngAfterContentInit = function () {
        this.initRipple();
    };
    /**
     * @return {?}
     */
    MdcButtonDirective.prototype.ngOnDestroy = function () {
        this.destroyRipple();
    };
    Object.defineProperty(MdcButtonDirective.prototype, "raised", {
        /**
         * When this input is defined and does not have value false, the button will be elevated
        upon the surface.
         * @return {?}
         */
        get: function () {
            return this._raised;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._raised = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcButtonDirective.prototype, "stroked", {
        /**
         * When this input is defined and does not have value false, the button will be styled
        flush with the surface and have a visible border.
         * @return {?}
         */
        get: function () {
            return this._stroked;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._stroked = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcButtonDirective.prototype, "compact", {
        /**
         * When this input is defined and does not have value false, the amount of horizontal padding
        in the button will be reduced.
         * @return {?}
         */
        get: function () {
            return this._compact;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._compact = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcButtonDirective.prototype, "dense", {
        /**
         * When this input is defined and does not have value false, the button text is compressed
        to make it slightly smaller.
         * @return {?}
         */
        get: function () {
            return this._dense;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._dense = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    MdcButtonDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'button[mdcButton],a[mdcButton]',
                    providers: [{ provide: AbstractMdcRipple, useExisting: core.forwardRef(function () { return MdcButtonDirective; }) }]
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcButtonDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.Renderer2, },
        { type: MdcEventRegistry, },
    ]; };
    MdcButtonDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-button',] },],
        'raised': [{ type: core.HostBinding, args: ['class.mdc-button--raised',] }, { type: core.Input },],
        'stroked': [{ type: core.HostBinding, args: ['class.mdc-button--stroked',] }, { type: core.Input },],
        'compact': [{ type: core.HostBinding, args: ['class.mdc-button--compact',] }, { type: core.Input },],
        'dense': [{ type: core.HostBinding, args: ['class.mdc-button--dense',] }, { type: core.Input },],
    };
    return MdcButtonDirective;
}(AbstractMdcRipple));

/**
 * Directive for the primary area (containing titles and subtitles) of a card.
The primary area is typically composed of a title (<code>MdcCardTitleDirective</code>),
and subtitle (<code>MdcCardSubtitleDirective</code>).
This directive should be put inside the card itself (<code>MdcCardDirective</code>),
or inside an horizontal block in the card (<code>MdcCardHorizontalDirective</code>).
 */
var MdcCardPrimaryDirective = (function () {
    function MdcCardPrimaryDirective() {
        this._cls = true;
    }
    MdcCardPrimaryDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcCardPrimary]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcCardPrimaryDirective.ctorParameters = function () { return []; };
    MdcCardPrimaryDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-card__primary',] },],
    };
    return MdcCardPrimaryDirective;
}());
/**
 * Directive for the title of a card. Should be put inside the primary area
(<code>MdcCardPrimaryDirective</code>) of a card.
 */
var MdcCardTitleDirective = (function () {
    function MdcCardTitleDirective() {
        this._cls = true;
        this._large = false;
    }
    Object.defineProperty(MdcCardTitleDirective.prototype, "large", {
        /**
         * When this input is defined and does not have value false,
        the title will be made larger.
         * @return {?}
         */
        get: function () {
            return this._large;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._large = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    MdcCardTitleDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcCardTitle]',
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcCardTitleDirective.ctorParameters = function () { return []; };
    MdcCardTitleDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-card__title',] },],
        'large': [{ type: core.HostBinding, args: ['class.mdc-card__title--large',] }, { type: core.Input },],
    };
    return MdcCardTitleDirective;
}());
/**
 * Directive for the subtitle of a card. Should be put inside the primary area
(<code>MdcCardPrimaryDirective</code>) of a card.
 */
var MdcCardSubtitleDirective = (function () {
    function MdcCardSubtitleDirective() {
        this._cls = true;
    }
    MdcCardSubtitleDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcCardSubtitle]',
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcCardSubtitleDirective.ctorParameters = function () { return []; };
    MdcCardSubtitleDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-card__subtitle',] },],
    };
    return MdcCardSubtitleDirective;
}());
/**
 * Directive for the textual content of the card.
If used, this directive should be put inside the card itself ( (<code>MdcCardDirective</code>)),
or inside an horizontal block in the card (<code>MdcCardHorizontalDirective</code>)
 */
var MdcCardTextDirective = (function () {
    function MdcCardTextDirective() {
        this._cls = true;
    }
    MdcCardTextDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcCardText]',
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcCardTextDirective.ctorParameters = function () { return []; };
    MdcCardTextDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-card__supporting-text',] },],
    };
    return MdcCardTextDirective;
}());
/**
 * Directive for rich media embedded in cards.
If used, this directive should be put inside the card itself (<code>MdcCardDirective</code>).
For media items inside an horizonal block, use <code>MdcCardMediaItemDirective</code>
instead.
 */
var MdcCardMediaDirective = (function () {
    function MdcCardMediaDirective() {
        this._cls = true;
    }
    MdcCardMediaDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcCardMedia]',
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcCardMediaDirective.ctorParameters = function () { return []; };
    MdcCardMediaDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-card__media',] },],
    };
    return MdcCardMediaDirective;
}());
/**
 * Directive for showing the different actions a user can take. Composed of one or more
card actions, which must be buttons that have the <code>MdcButtonDirective</code>.
(Icon buttons as actions are currently not supported by the upstream Material Components
Web library. Once they are supported, we'll add support for them as card actions too).
 */
var MdcCardActionsDirective = (function () {
    /**
     * @param {?} renderer
     */
    function MdcCardActionsDirective(renderer) {
        this.renderer = renderer;
        this._cls = true;
        this._initialized = false;
        this._vertical = false;
    }
    /**
     * @return {?}
     */
    MdcCardActionsDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._initialized = true;
        this._initChildren();
        this._children.changes.subscribe(function () {
            _this._initChildren();
        });
    };
    /**
     * @return {?}
     */
    MdcCardActionsDirective.prototype._initChildren = function () {
        var _this = this;
        if (this._initialized)
            this._children.forEach(function (btn) {
                _this.renderer.addClass(btn._elm.nativeElement, 'mdc-card__action');
                if (_this._compact != null)
                    if (_this._compact)
                        btn.compact = true;
                    else
                        btn.compact = false;
            });
    };
    Object.defineProperty(MdcCardActionsDirective.prototype, "compact", {
        /**
         * When this input is defined and does not have value false, all contained buttions
        will automagically get compact styling, which is equal to setting the <code>compact</code>
        input on the buttons individually.
         * @return {?}
         */
        get: function () {
            return this._compact;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            if (val == null)
                this._compact = val;
            else {
                val = asBoolean(val);
                if (this._compact !== val) {
                    this._compact = val;
                    this._initChildren();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcCardActionsDirective.prototype, "vertical", {
        /**
         * When this input is defined and does not have value false, the actions are layed out
        vertically inside of horizontally.
         * @return {?}
         */
        get: function () {
            return this._vertical;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._vertical = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    MdcCardActionsDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcCardActions]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcCardActionsDirective.ctorParameters = function () { return [
        { type: core.Renderer2, },
    ]; };
    MdcCardActionsDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-card__actions',] },],
        '_children': [{ type: core.ContentChildren, args: [MdcButtonDirective, { descendants: false },] },],
        'compact': [{ type: core.Input },],
        'vertical': [{ type: core.HostBinding, args: ['class.mdc-card__actions--vertical',] }, { type: core.Input },],
    };
    return MdcCardActionsDirective;
}());
/**
 * Directive for stacking multiple card blocks horizontally instead of vertically inside the card.
This directive should be put inside the card itself (<code>MdcCardDirective</code>) and wraps
the blocks that should be stacked horizontally, such as <code>MdcCardPrimaryDirective</code>,
<code>MdcCardMediaItemDirective</code>, and <code>MdcCardActionsDirective</code>.
 */
var MdcCardHorizontalDirective = (function () {
    function MdcCardHorizontalDirective() {
        this._cls = true;
    }
    MdcCardHorizontalDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcCardHorizontal]',
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcCardHorizontalDirective.ctorParameters = function () { return []; };
    MdcCardHorizontalDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-card__horizontal-block',] },],
    };
    return MdcCardHorizontalDirective;
}());
/**
 * Directive for media items. They are intended for use in horizontal blocks, taking up a fixed height,
rather than stretching to the width of the card.
Use the <code>sizeFactor</code> input to select from some predefined media item sizes.
 */
var MdcCardMediaItemDirective = (function () {
    function MdcCardMediaItemDirective() {
        this._cls = true;
        this._size = 1;
    }
    Object.defineProperty(MdcCardMediaItemDirective.prototype, "_size1dot5", {
        /**
         * @return {?}
         */
        get: function () {
            return this._size === 1.5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcCardMediaItemDirective.prototype, "_size2", {
        /**
         * @return {?}
         */
        get: function () {
            return this._size === 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcCardMediaItemDirective.prototype, "_size3", {
        /**
         * @return {?}
         */
        get: function () {
            return this._size === 3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcCardMediaItemDirective.prototype, "sizeFactor", {
        /**
         * Directive to select the media item size. Possible values are:<br/>
        1 (the default): sets the height to 80px.<br/>
        1.5: sets the height to 120px.<br/>
        2: sets the height to 160px.<br/>
        3: sets the height to 240px.<br/>
        Any other value will reset <code>sizeFactor</code> to 1, to have a 80px height.
         * @return {?}
         */
        get: function () {
            return this._size;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            if (+val === 1.5)
                this._size = 1.5;
            else if (+val === 2)
                this._size = 2;
            else if (+val === 3)
                this._size = 3;
            else
                this._size = 1;
        },
        enumerable: true,
        configurable: true
    });
    MdcCardMediaItemDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcCardMediaItem]',
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcCardMediaItemDirective.ctorParameters = function () { return []; };
    MdcCardMediaItemDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-card__media-item',] },],
        '_size1dot5': [{ type: core.HostBinding, args: ['class.mdc-card__media-item--1dot5x',] },],
        '_size2': [{ type: core.HostBinding, args: ['class.mdc-card__media-item--2x',] },],
        '_size3': [{ type: core.HostBinding, args: ['class.mdc-card__media-item--3x',] },],
        'sizeFactor': [{ type: core.Input },],
    };
    return MdcCardMediaItemDirective;
}());
/**
 * Directive for a material designed card. The card can be composed with the following directives:
<code>MdcCardPrimaryDirective</code>, <code>MdcCardTextDirective</code>, <code>MdcCardMediaDirective</code>,
<code>MdcCardActionsDirective</code>, <code>MdcCardHorizontalDirective</code>.
 */
var MdcCardDirective = (function () {
    function MdcCardDirective() {
        this._cls = true;
    }
    MdcCardDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcCard]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcCardDirective.ctorParameters = function () { return []; };
    MdcCardDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-card',] },],
    };
    return MdcCardDirective;
}());

/**
 * \@docs-private
 * @abstract
 */
var AbstractMdcInput = (function () {
    function AbstractMdcInput() {
    }
    return AbstractMdcInput;
}());

/**
 * Directive for the input element of an <code>MdcCheckboxDirective</code>.
 */
var MdcCheckboxInputDirective = (function (_super) {
    tslib_1.__extends(MdcCheckboxInputDirective, _super);
    /**
     * @param {?} _elm
     * @param {?} _cntr
     */
    function MdcCheckboxInputDirective(_elm, _cntr) {
        var _this = _super.call(this) || this;
        _this._elm = _elm;
        _this._cntr = _cntr;
        _this._cls = true;
        _this._disabled = false;
        return _this;
    }
    Object.defineProperty(MdcCheckboxInputDirective.prototype, "id", {
        /**
         * \@docs-private
         * @return {?}
         */
        get: function () {
            return this._id;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcCheckboxInputDirective.prototype, "disabled", {
        /**
         * \@docs-private
         * @return {?}
         */
        get: function () {
            return this._cntr ? this._cntr.disabled : this._disabled;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._disabled = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    MdcCheckboxInputDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'input[mdcCheckboxInput][type=checkbox]',
                    providers: [{ provide: AbstractMdcInput, useExisting: core.forwardRef(function () { return MdcCheckboxInputDirective; }) }]
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcCheckboxInputDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: forms.NgControl, decorators: [{ type: core.Optional }, { type: core.Self },] },
    ]; };
    MdcCheckboxInputDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-checkbox__native-control',] },],
        'id': [{ type: core.HostBinding }, { type: core.Input },],
        'disabled': [{ type: core.HostBinding }, { type: core.Input },],
    };
    return MdcCheckboxInputDirective;
}(AbstractMdcInput));
/**
 * Directive for creating a Material Design checkbox. The checkbox is driven by an
underlying native checkbox input, which must use the <code>MdcCheckboxInputDirective</code>
directive.
The current implementation will add all other required DOM elements (such as the
background).
Future implementations will also support supplying (customized) background
elements.
</p><p>
This directive can be used together with an <code>mdcFormField</code> to
easily position checkboxes and their labels, see
<a href="#/directives/form-field">mdcFormField</a>.
 */
var MdcCheckboxDirective = (function (_super) {
    tslib_1.__extends(MdcCheckboxDirective, _super);
    /**
     * @param {?} renderer
     * @param {?} root
     * @param {?} registry
     */
    function MdcCheckboxDirective(renderer, root, registry) {
        var _this = _super.call(this, root, renderer, registry) || this;
        _this.renderer = renderer;
        _this.root = root;
        _this.registry = registry;
        _this._cls = true;
        _this.mdcAdapter = {
            addClass: function (className) {
                _this.renderer.addClass(_this.root.nativeElement, className);
            },
            removeClass: function (className) {
                _this.renderer.removeClass(_this.root.nativeElement, className);
            },
            registerAnimationEndHandler: function (handler) {
                _this.registry.listen(_this.renderer, 'animationend ', handler, _this.root);
            },
            deregisterAnimationEndHandler: function (handler) {
                _this.registry.unlisten('animationend', handler);
            },
            registerChangeHandler: function (handler) {
                if (_this._input)
                    _this.registry.listen(_this.renderer, 'change', handler, _this._input._elm);
            },
            deregisterChangeHandler: function (handler) {
                if (_this._input)
                    _this.registry.unlisten('change', handler);
            },
            getNativeControl: function () { return _this._input ? _this._input._elm.nativeElement : null; },
            forceLayout: function () { return _this.root.nativeElement.offsetWidth; },
            isAttachedToDOM: function () { return !!_this._input; },
        };
        _this.foundation = new checkbox.MDCCheckboxFoundation(_this.mdcAdapter);
        return _this;
    }
    /**
     * @return {?}
     */
    MdcCheckboxDirective.prototype.ngAfterContentInit = function () {
        this.addBackground();
        this.initRipple();
        this.foundation.init();
    };
    /**
     * @return {?}
     */
    MdcCheckboxDirective.prototype.ngOnDestroy = function () {
        this.foundation.destroy();
        this.destroyRipple();
    };
    /**
     * @return {?}
     */
    MdcCheckboxDirective.prototype.addBackground = function () {
        var /** @type {?} */ path = this.renderer.createElement('path', 'svg');
        this.renderer.addClass(path, 'mdc-checkbox__checkmark__path');
        this.renderer.setAttribute(path, 'fill', 'none');
        this.renderer.setAttribute(path, 'stroke', 'white');
        this.renderer.setAttribute(path, 'd', 'M1.73,12.91 8.1,19.28 22.79,4.59');
        var /** @type {?} */ svg = this.renderer.createElement('svg', 'svg');
        this.renderer.appendChild(svg, path);
        this.renderer.addClass(svg, 'mdc-checkbox__checkmark');
        this.renderer.setAttribute(svg, 'viewBox', '0 0 24 24');
        var /** @type {?} */ mixedmark = this.renderer.createElement('div');
        this.renderer.addClass(mixedmark, 'mdc-checkbox__mixedmark');
        var /** @type {?} */ bg = this.renderer.createElement('div');
        this.renderer.appendChild(bg, svg);
        this.renderer.appendChild(bg, mixedmark);
        this.renderer.addClass(bg, 'mdc-checkbox__background');
        this.renderer.appendChild(this.root.nativeElement, bg);
    };
    /**
     * \@docs-private
     * @return {?}
     */
    MdcCheckboxDirective.prototype.getRippleInteractionElement = function () {
        return this._input ? this._input._elm : null;
    };
    /**
     * \@docs-private
     * @return {?}
     */
    MdcCheckboxDirective.prototype.isRippleUnbounded = function () {
        return true;
    };
    /**
     * \@docs-private
     * @return {?}
     */
    MdcCheckboxDirective.prototype.computeRippleBoundingRect = function () {
        var /** @type {?} */ dim = 40;
        var _a = this.root.nativeElement.getBoundingClientRect(), left = _a.left, top = _a.top;
        return {
            top: top,
            left: left,
            right: left + dim,
            bottom: top + dim,
            width: dim,
            height: dim
        };
    };
    Object.defineProperty(MdcCheckboxDirective.prototype, "_disabled", {
        /**
         * @return {?}
         */
        get: function () {
            return this._input == null || this._input.disabled;
        },
        enumerable: true,
        configurable: true
    });
    MdcCheckboxDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcCheckbox]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcCheckboxDirective.ctorParameters = function () { return [
        { type: core.Renderer2, },
        { type: core.ElementRef, },
        { type: MdcEventRegistry, },
    ]; };
    MdcCheckboxDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-checkbox',] },],
        '_input': [{ type: core.ContentChild, args: [MdcCheckboxInputDirective,] },],
        '_disabled': [{ type: core.HostBinding, args: ['class.mdc-checkbox--disabled',] },],
    };
    return MdcCheckboxDirective;
}(AbstractMdcRipple));

/**
 * Directive for elevating an element above its surface.
 */
var MdcElevationDirective = (function () {
    /**
     * @param {?} rndr
     * @param {?} elm
     */
    function MdcElevationDirective(rndr, elm) {
        this.rndr = rndr;
        this.elm = elm;
        this._z = null;
    }
    /**
     * @return {?}
     */
    MdcElevationDirective.prototype.ngAfterContentInit = function () {
        if (this._z == null)
            this.mdcElevation = 1;
    };
    Object.defineProperty(MdcElevationDirective.prototype, "mdcElevation", {
        /**
         * Input for setting the elevation (z-space). The value sould be in the range [0, 24].
        When set to 0, the element will not be elevated! The default value is 1.
         * @return {?}
         */
        get: function () {
            return this._z;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var /** @type {?} */ newValue = (value == null || value === '') ? 1 : +value;
            if (newValue < 0)
                newValue = 0;
            if (newValue > 24)
                newValue = 24;
            if (newValue !== this._z) {
                if (this._z != null)
                    this.rndr.removeClass(this.elm.nativeElement, 'mdc-elevation--z' + this._z);
                this.rndr.addClass(this.elm.nativeElement, 'mdc-elevation--z' + newValue);
            }
            this._z = newValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcElevationDirective.prototype, "animateTransition", {
        /**
         * When this input is defined and does not have value false, changes of the elevation
        will be animated.
         * @return {?}
         */
        get: function () {
            return this._transition;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._transition = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    MdcElevationDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcElevation]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcElevationDirective.ctorParameters = function () { return [
        { type: core.Renderer2, },
        { type: core.ElementRef, },
    ]; };
    MdcElevationDirective.propDecorators = {
        'mdcElevation': [{ type: core.Input },],
        'animateTransition': [{ type: core.HostBinding, args: ['class.mdc-elevation-transition',] }, { type: core.Input },],
    };
    return MdcElevationDirective;
}());

/**
 * Directive for the icon of a Floating Action Button
(<code>MdcFabDirective</code>).
 */
var MdcFabIconDirective = (function () {
    function MdcFabIconDirective() {
        this._cls = true;
    }
    MdcFabIconDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcFabIcon]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcFabIconDirective.ctorParameters = function () { return []; };
    MdcFabIconDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-fab__icon',] },],
    };
    return MdcFabIconDirective;
}());
/**
 * Material design Floating Action Button. The element should embed
an icon element with the <code>MdcFabIconDirective</code>.
 */
var MdcFabDirective = (function (_super) {
    tslib_1.__extends(MdcFabDirective, _super);
    /**
     * @param {?} _elm
     * @param {?} renderer
     * @param {?} registry
     */
    function MdcFabDirective(_elm, renderer, registry) {
        var _this = _super.call(this, _elm, renderer, registry) || this;
        _this._elm = _elm;
        _this._cls = true;
        _this._mini = false;
        _this._exited = false;
        return _this;
    }
    /**
     * @return {?}
     */
    MdcFabDirective.prototype.ngAfterContentInit = function () {
        this.initRipple();
    };
    /**
     * @return {?}
     */
    MdcFabDirective.prototype.ngOnDestroy = function () {
        this.destroyRipple();
    };
    Object.defineProperty(MdcFabDirective.prototype, "mini", {
        /**
         * When this input is defined and does not have value false, the FAB will
        be modified to a smaller size.
         * @return {?}
         */
        get: function () {
            return this._mini;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._mini = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcFabDirective.prototype, "exited", {
        /**
         * Setting this property to true will animate the FAB out of view.
        Setting it to false will animate the FAB back into view.
         * @return {?}
         */
        get: function () {
            return this._exited;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._exited = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    MdcFabDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcFab]',
                    providers: [{ provide: AbstractMdcRipple, useExisting: core.forwardRef(function () { return MdcFabDirective; }) }]
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcFabDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.Renderer2, },
        { type: MdcEventRegistry, },
    ]; };
    MdcFabDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-fab',] },],
        'mini': [{ type: core.HostBinding, args: ['class.mdc-fab--mini',] }, { type: core.Input },],
        'exited': [{ type: core.HostBinding, args: ['class.mdc-fab--exited',] }, { type: core.Input },],
    };
    return MdcFabDirective;
}(AbstractMdcRipple));

/**
 * \@docs-private
 * @abstract
 */
var AbstractMdcLabel = (function () {
    function AbstractMdcLabel() {
    }
    return AbstractMdcLabel;
}());

var nextId = 1;
var MdcFormFieldInputDirective = (function (_super) {
    tslib_1.__extends(MdcFormFieldInputDirective, _super);
    /**
     * @param {?} _elm
     * @param {?} _cntr
     */
    function MdcFormFieldInputDirective(_elm, _cntr) {
        var _this = _super.call(this) || this;
        _this._elm = _elm;
        _this._cntr = _cntr;
        _this._disabled = false;
        return _this;
    }
    Object.defineProperty(MdcFormFieldInputDirective.prototype, "id", {
        /**
         * @return {?}
         */
        get: function () {
            return this._id;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcFormFieldInputDirective.prototype, "disabled", {
        /**
         * @return {?}
         */
        get: function () {
            return this._cntr ? this._cntr.disabled : this._disabled;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._disabled = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    MdcFormFieldInputDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'input[mdcFormFieldInput], textarea[mdcFormFieldInput]',
                    providers: [{ provide: AbstractMdcInput, useExisting: core.forwardRef(function () { return MdcFormFieldInputDirective; }) }]
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcFormFieldInputDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: forms.NgControl, decorators: [{ type: core.Optional }, { type: core.Self },] },
    ]; };
    MdcFormFieldInputDirective.propDecorators = {
        'id': [{ type: core.HostBinding }, { type: core.Input },],
        'disabled': [{ type: core.HostBinding }, { type: core.Input },],
    };
    return MdcFormFieldInputDirective;
}(AbstractMdcInput));
var MdcFormFieldLabelDirective = (function (_super) {
    tslib_1.__extends(MdcFormFieldLabelDirective, _super);
    /**
     * @param {?} _elm
     */
    function MdcFormFieldLabelDirective(_elm) {
        var _this = _super.call(this) || this;
        _this._elm = _elm;
        return _this;
    }
    MdcFormFieldLabelDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'label[mdcFormFieldLabel]',
                    providers: [{ provide: AbstractMdcLabel, useExisting: core.forwardRef(function () { return MdcFormFieldLabelDirective; }) }]
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcFormFieldLabelDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MdcFormFieldLabelDirective.propDecorators = {
        'for': [{ type: core.HostBinding }, { type: core.Input },],
    };
    return MdcFormFieldLabelDirective;
}(AbstractMdcLabel));
var MdcFormFieldDirective = (function () {
    /**
     * @param {?} renderer
     * @param {?} root
     * @param {?} registry
     */
    function MdcFormFieldDirective(renderer, root, registry) {
        var _this = this;
        this.renderer = renderer;
        this.root = root;
        this.registry = registry;
        this._cls = true;
        this._alignEnd = false;
        this.mdcAdapter = {
            registerInteractionHandler: function (type, handler) {
                _this.registry.listen(_this.renderer, type, handler, _this.root);
            },
            deregisterInteractionHandler: function (type, handler) {
                _this.registry.unlisten(type, handler);
            },
            activateInputRipple: function () {
                if (_this.rippleChild)
                    _this.rippleChild.activateRipple();
            },
            deactivateInputRipple: function () {
                if (_this.rippleChild)
                    _this.rippleChild.deactivateRipple();
            }
        };
        this.foundation = new formField.MDCFormFieldFoundation(this.mdcAdapter);
    }
    /**
     * @return {?}
     */
    MdcFormFieldDirective.prototype.ngAfterContentInit = function () {
        if (this.mdcInput != null && this.mdcLabel != null) {
            if (this.mdcInput.id == null && this.mdcLabel.for == null)
                this.mdcInput.id = this.mdcLabel.for = "mdc-form-input-" + nextId++;
            else if (this.mdcInput.id == null)
                this.mdcInput.id = this.mdcLabel.for;
            else if (this.mdcLabel.for == null)
                this.mdcLabel.for = this.mdcInput.id;
        }
        this.foundation.init();
    };
    /**
     * @return {?}
     */
    MdcFormFieldDirective.prototype.ngOnDestroy = function () {
        this.foundation.destroy();
    };
    Object.defineProperty(MdcFormFieldDirective.prototype, "alignEnd", {
        /**
         * @return {?}
         */
        get: function () {
            return this._alignEnd;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._alignEnd = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    MdcFormFieldDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcFormField]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcFormFieldDirective.ctorParameters = function () { return [
        { type: core.Renderer2, },
        { type: core.ElementRef, },
        { type: MdcEventRegistry, },
    ]; };
    MdcFormFieldDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-form-field',] },],
        'rippleChild': [{ type: core.ContentChild, args: [AbstractMdcRipple,] },],
        'mdcInput': [{ type: core.ContentChild, args: [AbstractMdcInput,] },],
        'mdcLabel': [{ type: core.ContentChild, args: [AbstractMdcLabel,] },],
        'alignEnd': [{ type: core.Input }, { type: core.HostBinding, args: ['class.mdc-form-field--align-end',] },],
    };
    return MdcFormFieldDirective;
}());

/**
 * Directive for an icon nested inside a <code>MdcIconToggleDirective</code>.
This directive is only needed when the icon font uses CSS pseudo-elements in order
to provide the icon. This is how Font Awesome, and many other icon font libraries
provide the icons.
For icon fonts that don't use pseudo elements (such as the Material Design Icons from Google),
this directive is not necessary.
 */
var MdcIconToggleIconDirective = (function () {
    function MdcIconToggleIconDirective() {
    }
    MdcIconToggleIconDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcIconToggleIcon]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcIconToggleIconDirective.ctorParameters = function () { return []; };
    return MdcIconToggleIconDirective;
}());
/**
 * Directive for creating a Material Design icon toggle button.
The icon toggle is fully accessible, and works with any icon font.
When the icon font uses CSS pseudo-elements in order to display the icon,
embed an <code>MdcIconToggleIconDirective</code> inside this directive for
the actual icon. (Otherwise the pseudo-elements used for showing the icon
will interfere with the pseudo-elements this directive uses for showing
ripple styles).
 */
var MdcIconToggleDirective = (function (_super) {
    tslib_1.__extends(MdcIconToggleDirective, _super);
    /**
     * @param {?} elm
     * @param {?} renderer
     * @param {?} registry
     */
    function MdcIconToggleDirective(elm, renderer, registry) {
        var _this = _super.call(this, elm, renderer, registry) || this;
        _this.elm = elm;
        _this.renderer = renderer;
        _this.registry = registry;
        _this._hostClass = true;
        _this._role = 'button';
        /**
         * Event emitted when the state of the icon changes (for example when a user clicks
        the icon).
         */
        _this.isOnChange = new core.EventEmitter();
        _this._onChange = function (value) { };
        _this._onTouched = function () { };
        _this._beforeInitQueu = [];
        _this._initialized = false;
        _this.mdcAdapter = {
            addClass: function (className) {
                var /** @type {?} */ inner = _this._innerIcon && _this._iconIsClass !== false && (className === _this._iconOn || className === _this._iconOff);
                _this.renderer.addClass(inner ? _this._innerIcon.nativeElement : _this.elm.nativeElement, className);
            },
            removeClass: function (className) {
                var /** @type {?} */ inner = _this._innerIcon && _this._iconIsClass !== false && (className === _this._iconOn || className === _this._iconOff);
                _this.renderer.removeClass(inner ? _this._innerIcon.nativeElement : _this.elm.nativeElement, className);
            },
            registerInteractionHandler: function (type, handler) {
                _this.registry.listen(_this.renderer, type, handler, _this.elm);
            },
            deregisterInteractionHandler: function (type, handler) {
                _this.registry.unlisten(type, handler);
            },
            setText: function (text) {
                if (_this._innerIcon)
                    _this._innerIcon.nativeElement.textContent = text;
                else
                    _this.elm.nativeElement.textContent = text;
            },
            getTabIndex: function () { return _this.elm.nativeElement.tabIndex; },
            setTabIndex: function (tabIndex) { _this.elm.nativeElement.tabIndex = tabIndex; },
            getAttr: function (name) { return _this.elm.nativeElement.getAttribute(name); },
            setAttr: function (name, value) { _this.renderer.setAttribute(_this.elm.nativeElement, name, value); },
            rmAttr: function (name) { _this.renderer.removeAttribute(_this.elm.nativeElement, name); },
            notifyChange: function (evtData) {
                _this._onChange(evtData.isOn);
                _this.isOnChange.emit(evtData.isOn);
            }
        };
        _this.foundation = new iconToggle.MDCIconToggleFoundation(_this.mdcAdapter);
        return _this;
    }
    /**
     * @return {?}
     */
    MdcIconToggleDirective.prototype.ngAfterContentInit = function () {
        this.initDefaultAttributes();
        this.initializeData();
        this.foundation.init();
        // run all deferred foundation interactions:
        for (var _i = 0, _a = this._beforeInitQueu; _i < _a.length; _i++) {
            var fun = _a[_i];
            fun();
        }
        this._beforeInitQueu = [];
        // the foundation doesn't initialize the iconOn/iconOff and labelOn/labelOff until
        // toggle is called for the first time,
        // also, this will ensure 'aria-pressed' and 'aria-label' attributes are initialized:
        this.foundation.toggle(this.foundation.isOn());
        this.initRipple();
        this._initialized = true;
    };
    /**
     * @return {?}
     */
    MdcIconToggleDirective.prototype.ngOnDestroy = function () {
        this.destroyRipple();
        this.foundation.destroy();
    };
    /**
     * @param {?} fun
     * @return {?}
     */
    MdcIconToggleDirective.prototype.execAfterInit = function (fun) {
        if (this._initialized)
            fun();
        else
            this._beforeInitQueu.push(fun);
    };
    /**
     * @return {?}
     */
    MdcIconToggleDirective.prototype.refreshData = function () {
        if (this._initialized) {
            this.initializeData();
            this.foundation.refreshToggleData();
        }
    };
    /**
     * @return {?}
     */
    MdcIconToggleDirective.prototype.initDefaultAttributes = function () {
        if (!this.elm.nativeElement.hasAttribute('tabindex'))
            // unless overridden by another tabIndex, we want icon-toggles to
            // participate in tabbing (the foundation will remove the tabIndex
            // when the icon-toggle is disabled):
            this.elm.nativeElement.tabIndex = 0;
    };
    /**
     * @return {?}
     */
    MdcIconToggleDirective.prototype.initializeData = function () {
        // iconOn/iconOff are classes when the iconIsClass is true, or when iconIsClass is not set,
        //  and _innerIcon is used (because _innerIcon is specifically for cases where icons are set via pseudo elements
        //  by using classes):
        var /** @type {?} */ iconIsClass = this._iconIsClass == null ? this._innerIcon != null : this._iconIsClass;
        this.renderer.setAttribute(this.elm.nativeElement, 'data-toggle-on', this.createDataAttrForToggle(this._labelOn, this._iconOn, iconIsClass));
        this.renderer.setAttribute(this.elm.nativeElement, 'data-toggle-off', this.createDataAttrForToggle(this._labelOff, this._iconOff, iconIsClass));
    };
    /**
     * @param {?} label
     * @param {?} icon
     * @param {?} iconIsClass
     * @return {?}
     */
    MdcIconToggleDirective.prototype.createDataAttrForToggle = function (label, icon, iconIsClass) {
        var /** @type {?} */ data = {
            label: label
        };
        data[iconIsClass ? 'cssClass' : 'content'] = icon;
        return JSON.stringify(data);
    };
    /**
     * \@docs-private
     * @param {?} obj
     * @return {?}
     */
    MdcIconToggleDirective.prototype.writeValue = function (obj) {
        var _this = this;
        this.execAfterInit(function () { return _this.foundation.toggle(!!obj); });
    };
    /**
     * \@docs-private
     * @param {?} onChange
     * @return {?}
     */
    MdcIconToggleDirective.prototype.registerOnChange = function (onChange) {
        this._onChange = onChange;
    };
    /**
     * \@docs-private
     * @param {?} onTouched
     * @return {?}
     */
    MdcIconToggleDirective.prototype.registerOnTouched = function (onTouched) {
        this._onTouched = onTouched;
    };
    /**
     * \@docs-private
     * @param {?} disabled
     * @return {?}
     */
    MdcIconToggleDirective.prototype.setDisabledState = function (disabled) {
        this.disabled = disabled;
    };
    /**
     * \@docs-private
     * @return {?}
     */
    MdcIconToggleDirective.prototype.isRippleUnbounded = function () {
        return true;
    };
    /**
     * \@docs-private
     * @return {?}
     */
    MdcIconToggleDirective.prototype.isRippleSurfaceActive = function () {
        return this.foundation.isKeyboardActivated();
    };
    /**
     * \@docs-private
     * @return {?}
     */
    MdcIconToggleDirective.prototype.computeRippleBoundingRect = function () {
        var /** @type {?} */ dim = 48;
        var _a = this.elm.nativeElement.getBoundingClientRect(), left = _a.left, top = _a.top;
        return {
            left: left,
            top: top,
            width: dim,
            height: dim,
            right: left + dim,
            bottom: left + dim,
        };
    };
    Object.defineProperty(MdcIconToggleDirective.prototype, "isOn", {
        /**
         * The current state of the icon (true for on/pressed, false for off/unpressed).
         * @return {?}
         */
        get: function () {
            return this.foundation.isOn();
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var _this = this;
            this.execAfterInit(function () { return _this.foundation.toggle(asBoolean(value)); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcIconToggleDirective.prototype, "labelOn", {
        /**
         * The aria-label to use for the on/pressed state of the icon.
         * @return {?}
         */
        get: function () {
            return this._labelOn;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._labelOn = value;
            this.refreshData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcIconToggleDirective.prototype, "labelOff", {
        /**
         * The aria-label to use for the off/unpressed state of the icon.
         * @return {?}
         */
        get: function () {
            return this._labelOff;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._labelOff = value;
            this.refreshData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcIconToggleDirective.prototype, "iconOn", {
        /**
         * The icon to use for the on/pressed state of the icon.
         * @return {?}
         */
        get: function () {
            return this._iconOn;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._iconOn = value;
            this.refreshData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcIconToggleDirective.prototype, "iconOff", {
        /**
         * The icon to use for the off/unpressed state of the icon.
         * @return {?}
         */
        get: function () {
            return this._iconOff;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._iconOff = value;
            this.refreshData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcIconToggleDirective.prototype, "iconIsClass", {
        /**
         * Some icon fonst (such as Font Awesome) use CSS class names to select the icon to show.
        Others, such as the Material Design Icons from Google use ligatures (allowing selection of
        the icon by using their textual name). When <code>iconIsClass</code> is true, the directive
        assumes <code>iconOn</code>, and <code>iconOff</code> represent class names. When
        <code>iconIsClass</code> is false, the directive assumes the use of ligatures.
        <p>
        When <code>iconIsClass</code> is not assigned, the directive bases its decision on whether
        or not an embedded <code>MdcIconToggleIconDirective</code> is used.
        In most cases you won't need to set this input, as the default based on an embedded
        <code>MdcIconToggleIconDirective</code> is typically what you need.
        </p>
         * @return {?}
         */
        get: function () {
            return this._iconIsClass;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._iconIsClass = asBooleanOrNull(value);
            this.refreshData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcIconToggleDirective.prototype, "disabled", {
        /**
         * To disable the icon toggle, set this input to true.
         * @return {?}
         */
        get: function () {
            return this.foundation.isDisabled();
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var _this = this;
            this.execAfterInit(function () {
                var /** @type {?} */ newValue = asBoolean(value);
                // we only set the disabled state if it changes from the current value.
                // if we don't do that, then calling setDisabled(false) after initialization
                // will clear the tabIndex. So this works around a bug in @material/icon-toggle:
                if (_this.foundation.isDisabled() != newValue)
                    _this.foundation.setDisabled(asBoolean(value));
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MdcIconToggleDirective.prototype._onBlur = function () {
        this._onTouched();
    };
    MdcIconToggleDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcIconToggle]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcIconToggleDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.Renderer2, },
        { type: MdcEventRegistry, },
    ]; };
    MdcIconToggleDirective.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.mdc-icon-toggle',] },],
        '_role': [{ type: core.HostBinding, args: ['attr.role',] },],
        '_innerIcon': [{ type: core.ContentChild, args: [MdcIconToggleIconDirective, { read: core.ElementRef },] },],
        'isOnChange': [{ type: core.Output },],
        'isOn': [{ type: core.Input },],
        'labelOn': [{ type: core.Input },],
        'labelOff': [{ type: core.Input },],
        'iconOn': [{ type: core.Input },],
        'iconOff': [{ type: core.Input },],
        'iconIsClass': [{ type: core.Input },],
        'disabled': [{ type: core.Input },],
        '_onBlur': [{ type: core.HostListener, args: ['(blur',] },],
    };
    return MdcIconToggleDirective;
}(AbstractMdcRipple));
/**
 * Directive for adding Angular Forms (<code>ControlValueAccessor</code>) behavior to an
<code>MdcIconToggleDirective</code>. Allows the use of the Angular Forms API with
icon toggles, e.g. binding to <code>[(ngModel)]</code>, form validation, etc.
 */
var MdcFormsIconToggleDirective = (function () {
    /**
     * @param {?} mdcIconToggle
     */
    function MdcFormsIconToggleDirective(mdcIconToggle) {
        this.mdcIconToggle = mdcIconToggle;
    }
    /**
     * \@docs-private
     * @param {?} obj
     * @return {?}
     */
    MdcFormsIconToggleDirective.prototype.writeValue = function (obj) {
        this.mdcIconToggle.writeValue(obj);
    };
    /**
     * \@docs-private
     * @param {?} onChange
     * @return {?}
     */
    MdcFormsIconToggleDirective.prototype.registerOnChange = function (onChange) {
        this.mdcIconToggle.registerOnChange(onChange);
    };
    /**
     * \@docs-private
     * @param {?} onTouched
     * @return {?}
     */
    MdcFormsIconToggleDirective.prototype.registerOnTouched = function (onTouched) {
        this.mdcIconToggle.registerOnTouched(onTouched);
    };
    /**
     * \@docs-private
     * @param {?} disabled
     * @return {?}
     */
    MdcFormsIconToggleDirective.prototype.setDisabledState = function (disabled) {
        this.mdcIconToggle.setDisabledState(disabled);
    };
    MdcFormsIconToggleDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcIconToggle][formControlName],[mdcIconToggle][formControl],[mdcIconToggle][ngModel]',
                    providers: [
                        { provide: forms.NG_VALUE_ACCESSOR, useExisting: core.forwardRef(function () { return MdcFormsIconToggleDirective; }), multi: true }
                    ]
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcFormsIconToggleDirective.ctorParameters = function () { return [
        { type: MdcIconToggleDirective, decorators: [{ type: core.Self },] },
    ]; };
    return MdcFormsIconToggleDirective;
}());

var CLASS_INDETERMINATE = 'mdc-linear-progress--indeterminate';
var CLASS_REVERSED = 'mdc-linear-progress--reversed';
/**
 * Directive for creating a Material Design linear progress indicator.
The current implementation will add and manage all DOM child elements that
are required for the wrapped <code>mdc-linear-progress</code> component.
Future implementations will also support supplying (customized)
DOM children.
 */
var MdcLinearProgressDirective = (function () {
    /**
     * @param {?} _rndr
     * @param {?} _root
     * @param {?} _registry
     */
    function MdcLinearProgressDirective(_rndr, _root, _registry) {
        var _this = this;
        this._rndr = _rndr;
        this._root = _root;
        this._registry = _registry;
        this._cls = true;
        this._role = 'progressbar';
        this._initialized = false;
        this._indeterminate = false;
        this._reverse = false;
        this._progress = 0;
        this._buffer = 1;
        this._closed = false;
        this.mdcAdapter = {
            addClass: function (className) {
                if (className !== CLASS_INDETERMINATE && className != CLASS_REVERSED)
                    _this._rndr.addClass(_this._root.nativeElement, className);
            },
            getPrimaryBar: function () { return _this._elmPrimaryBar; },
            getBuffer: function () { return _this._elmBuffer; },
            hasClass: function (className) {
                if (className === CLASS_INDETERMINATE)
                    return _this._indeterminate;
                if (className === CLASS_REVERSED)
                    return _this._reverse;
                return _this._root.nativeElement.classList.contains(className);
            },
            removeClass: function (className) {
                if (className !== CLASS_INDETERMINATE && className != CLASS_REVERSED)
                    _this._rndr.removeClass(_this._root.nativeElement, className);
            },
            setStyle: function (el, styleProperty, value) {
                _this._rndr.setStyle(el, styleProperty, value);
            }
        };
        this.foundation = new linearProgress.MDCLinearProgressFoundation(this.mdcAdapter);
    }
    /**
     * @return {?}
     */
    MdcLinearProgressDirective.prototype.ngAfterContentInit = function () {
        this.initElements();
        this.foundation.init();
        this._initialized = true;
        this.foundation.setProgress(this._progress);
        this.foundation.setBuffer(this._buffer);
        if (this._closed)
            this.foundation.close();
    };
    /**
     * @return {?}
     */
    MdcLinearProgressDirective.prototype.ngOnDestroy = function () {
        this.foundation.destroy();
    };
    /**
     * @return {?}
     */
    MdcLinearProgressDirective.prototype.initElements = function () {
        var /** @type {?} */ elmBufferingDots = this.addElement(this._root.nativeElement, 'div', ['mdc-linear-progress__buffering-dots']);
        this._elmBuffer = this.addElement(this._root.nativeElement, 'div', ['mdc-linear-progress__buffer']);
        this._elmPrimaryBar = this.addElement(this._root.nativeElement, 'div', ['mdc-linear-progress__bar', 'mdc-linear-progress__primary-bar']);
        this.addElement(this._elmPrimaryBar, 'span', ['mdc-linear-progress__bar-inner']);
        var /** @type {?} */ secondaryBar = this.addElement(this._root.nativeElement, 'div', ['mdc-linear-progress__bar', 'mdc-linear-progress__secondary-bar']);
        this.addElement(this._elmPrimaryBar, 'span', ['mdc-linear-progress__bar-inner']);
    };
    /**
     * @param {?} parent
     * @param {?} element
     * @param {?} classNames
     * @return {?}
     */
    MdcLinearProgressDirective.prototype.addElement = function (parent, element, classNames) {
        var _this = this;
        var /** @type {?} */ child = this._rndr.createElement(element);
        classNames.forEach(function (name) {
            _this._rndr.addClass(child, name);
        });
        this._rndr.appendChild(parent, child);
        return child;
    };
    Object.defineProperty(MdcLinearProgressDirective.prototype, "isIndeterminate", {
        /**
         * Puts the progress indicator in 'indeterminate' state, signaling
        that the exact progress on a measured task is not known.
         * @return {?}
         */
        get: function () {
            return this._indeterminate;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var /** @type {?} */ newValue = asBoolean(value);
            if (newValue !== this._indeterminate) {
                this._indeterminate = newValue;
                if (this._initialized) {
                    this.foundation.setDeterminate(!this._indeterminate);
                    if (!this._indeterminate) {
                        this.foundation.setProgress(this._progress);
                        this.foundation.setBuffer(this._buffer);
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcLinearProgressDirective.prototype, "isReversed", {
        /**
         * Reverses the direction of the linear progress indicator.
         * @return {?}
         */
        get: function () {
            return this._reverse;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._reverse = asBoolean(value);
            if (this._initialized)
                this.foundation.setReverse(this._reverse);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcLinearProgressDirective.prototype, "progressValue", {
        /**
         * Set the progress, the value should be between [0, 1].
         * @return {?}
         */
        get: function () {
            return this._progress;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._progress = +value;
            if (this._initialized)
                this.foundation.setProgress(this._progress);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcLinearProgressDirective.prototype, "bufferValue", {
        /**
         * Set the buffer progress, the value should be between [0, 1].
         * @return {?}
         */
        get: function () {
            return this._buffer;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._buffer = +value;
            if (this._initialized)
                this.foundation.setBuffer(this._buffer);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcLinearProgressDirective.prototype, "isClosed", {
        /**
         * When set to true this closes (animates away) the progress bar,
        when set to false this opens (animates into view) the progress bar.
         * @return {?}
         */
        get: function () {
            return this._closed;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var /** @type {?} */ newValue = asBoolean(value);
            if (newValue !== this._closed) {
                this._closed = newValue;
                if (this._initialized) {
                    if (newValue)
                        this.foundation.close();
                    else
                        this.foundation.open();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    MdcLinearProgressDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcLinearProgress]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcLinearProgressDirective.ctorParameters = function () { return [
        { type: core.Renderer2, },
        { type: core.ElementRef, },
        { type: MdcEventRegistry, },
    ]; };
    MdcLinearProgressDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-linear-progress',] },],
        '_role': [{ type: core.HostBinding, args: ['attr.role',] },],
        '_indeterminate': [{ type: core.HostBinding, args: ['class.' + CLASS_INDETERMINATE,] },],
        '_reverse': [{ type: core.HostBinding, args: ['class.' + CLASS_REVERSED,] },],
        'isIndeterminate': [{ type: core.Input }, { type: core.HostBinding, args: ['class.' + CLASS_INDETERMINATE,] },],
        'isReversed': [{ type: core.Input }, { type: core.HostBinding, args: ['class.' + CLASS_REVERSED,] },],
        'progressValue': [{ type: core.Input },],
        'bufferValue': [{ type: core.Input },],
        'isClosed': [{ type: core.Input },],
    };
    return MdcLinearProgressDirective;
}());

/**
 * Directive for a separator in a list.
This directive, if used, should be the child of an <code>MdcListDirective</code>, or
an <code>MdcSelectMultipleNativeDirective</code>.
This directive also adds the "role" attribute to its element.
 */
var MdcListDividerDirective = (function () {
    /**
     * @param {?} _elm
     */
    function MdcListDividerDirective(_elm) {
        this._elm = _elm;
        this._cls = true;
        this._role = 'separator';
        this._disabled = false;
        this._inset = false;
        if (_elm.nativeElement.nodeName === 'OPTION') {
            this._role = 'presentation';
            this._disabled = true;
        }
    }
    Object.defineProperty(MdcListDividerDirective.prototype, "hasInset", {
        /**
         * When this input is defined and does not have value false, the divider is styled with
        an inset.
         * @return {?}
         */
        get: function () {
            return this._inset;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._inset = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    MdcListDividerDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcListDivider]',
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcListDividerDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MdcListDividerDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-list-divider',] },],
        '_role': [{ type: core.HostBinding, args: ['attr.role',] },],
        '_disabled': [{ type: core.HostBinding, args: ['attr.disabled',] },],
        'hasInset': [{ type: core.Input }, { type: core.HostBinding, args: ['class.mdc-list-divider--inset',] },],
    };
    return MdcListDividerDirective;
}());
/**
 * Directive for the items of a material list.
This directive should be used for the direct children of a <code>MdcListDirective</code>.
 */
var MdcListItemDirective = (function () {
    /**
     * @param {?} _elm
     */
    function MdcListItemDirective(_elm) {
        this._elm = _elm;
        this._cls = true;
        this._role = null;
        this._disabled = false;
    }
    Object.defineProperty(MdcListItemDirective.prototype, "disabled", {
        /**
         * When a list is used inside an <code>mdcSimpleMenu</code>, or <code>mdcSelect</code>,
        this property can be used to disable the item. When disabled, the list-item will have
        the <code>aria-disabled</code> attribute, and for  <code>mdcSimpleMenu</code>,
        or <code>mdcSelect</code> will set the <code>tabindex</code> to <code>-1</code>.
         * @return {?}
         */
        get: function () {
            return this._disabled;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._disabled = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcListItemDirective.prototype, "_tabIndex", {
        /**
         * @return {?}
         */
        get: function () {
            if (this._role === 'menuitem' || this._role === 'option')
                return this._disabled ? -1 : 0;
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcListItemDirective.prototype, "_ariaDisabled", {
        /**
         * @return {?}
         */
        get: function () {
            if (this._disabled)
                return 'true';
            return null;
        },
        enumerable: true,
        configurable: true
    });
    MdcListItemDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcListItem]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcListItemDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MdcListItemDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-list-item',] },],
        '_role': [{ type: core.HostBinding, args: ['attr.role',] },],
        'value': [{ type: core.Input },],
        'disabled': [{ type: core.Input },],
        '_tabIndex': [{ type: core.HostBinding, args: ['attr.tabindex',] },],
        '_ariaDisabled': [{ type: core.HostBinding, args: ['attr.aria-disabled',] },],
    };
    return MdcListItemDirective;
}());
/**
 * Directive to mark the first line of an item with "two line list" styling
according to the Material Design spec.
This directive, if used, should be the child of an <code>MdcListItemDirective</code>.
Using this directive inside any <code>mdcListItem</code> will put the list
"two line" mode.
 */
var MdcListItemTextDirective = (function () {
    function MdcListItemTextDirective() {
        this._cls = true;
    }
    MdcListItemTextDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcListItemText]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcListItemTextDirective.ctorParameters = function () { return []; };
    MdcListItemTextDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-list-item__text',] },],
    };
    return MdcListItemTextDirective;
}());
/**
 * Directive for the secondary text of an item with "two line list" styling.
 */
var MdcListItemTextSecondaryDirective = (function () {
    function MdcListItemTextSecondaryDirective() {
        this._cls = true;
    }
    MdcListItemTextSecondaryDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcListItemTextSecondary]',
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcListItemTextSecondaryDirective.ctorParameters = function () { return []; };
    MdcListItemTextSecondaryDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-list-item__text__secondary',] },],
    };
    return MdcListItemTextSecondaryDirective;
}());
/**
 * Directive for the start detail item of a list item.
This directive, if used, should be the child of an <code>MdcListItemDirective</code>.
 */
var MdcListItemStartDetailDirective = (function () {
    function MdcListItemStartDetailDirective() {
        this._cls = true;
    }
    MdcListItemStartDetailDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcListItemStartDetail]',
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcListItemStartDetailDirective.ctorParameters = function () { return []; };
    MdcListItemStartDetailDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-list-item__start-detail',] },],
    };
    return MdcListItemStartDetailDirective;
}());
/**
 * Directive for the end detail item of a list item.
This directive, if used, should be the child of an <code>MdcListItemDirective</code>.
 */
var MdcListItemEndDetailDirective = (function () {
    function MdcListItemEndDetailDirective() {
        this._cls = true;
    }
    MdcListItemEndDetailDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcListItemEndDetail]',
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcListItemEndDetailDirective.ctorParameters = function () { return []; };
    MdcListItemEndDetailDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-list-item__end-detail',] },],
    };
    return MdcListItemEndDetailDirective;
}());
var MdcListFunction = {};
MdcListFunction.plain = 0;
MdcListFunction.menu = 1;
MdcListFunction.select = 2;
MdcListFunction[MdcListFunction.plain] = "plain";
MdcListFunction[MdcListFunction.menu] = "menu";
MdcListFunction[MdcListFunction.select] = "select";

/**
 * Directive for a material list.
The children of this directive should either be <code>MdcListItemDirective</code>,
or <code>MdcListDividerDirective</code> elements.
This directive can optionally be contained in a <code>MdcListGroupDirective</code>, in a
<code>MdcSimpleMenuDirective</code>, or in a <code>MdcSelectDirective</code>.
 */
var MdcListDirective = (function () {
    /**
     * @param {?} _elm
     */
    function MdcListDirective(_elm) {
        this._elm = _elm;
        this._cls = true;
        this._twoLine = false;
        this._function = MdcListFunction.plain;
        this._hidden = false;
        this._dense = false;
        this._avatar = false;
    }
    /**
     * @return {?}
     */
    MdcListDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.updateItemRoles();
        this._items.changes.subscribe(function () {
            _this.updateItemRoles();
        });
        this._texts.changes.subscribe(function (_) { return _this._twoLine = _this._texts.length > 0; });
        this._twoLine = this._texts.length > 0;
    };
    /**
     * @return {?}
     */
    MdcListDirective.prototype.updateItemRoles = function () {
        var /** @type {?} */ itemRole = null;
        if (this._function === MdcListFunction.menu)
            itemRole = 'menuitem';
        else if (this._function === MdcListFunction.select)
            itemRole = 'option';
        this._items.forEach(function (item) {
            item._role = itemRole;
        });
    };
    Object.defineProperty(MdcListDirective.prototype, "_role", {
        /**
         * @return {?}
         */
        get: function () {
            return (this._function === MdcListFunction.menu) ? 'menu' : null;
            // Note: role="listbox" is set on the mdcSelect, not on this mdcList
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcListDirective.prototype, "_ariaHidden", {
        /**
         * @return {?}
         */
        get: function () {
            return (this._hidden && this._function === MdcListFunction.menu) ? 'true' : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcListDirective.prototype, "_isMenu", {
        /**
         * @return {?}
         */
        get: function () {
            return this._function === MdcListFunction.menu || this._function === MdcListFunction.select;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} val
     * @return {?}
     */
    MdcListDirective.prototype._setFunction = function (val) {
        this._function = val;
        this.updateItemRoles();
    };
    Object.defineProperty(MdcListDirective.prototype, "dense", {
        /**
         * When this input is defined and does not have value false, the list will be styled more
        compact.
         * @return {?}
         */
        get: function () {
            return this._dense;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._dense = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcListDirective.prototype, "avatarList", {
        /**
         * When this input is defined and does not have value false, elements with directive <code>mdcListItemStartDetail</code>
        will be styled for avatars: large, circular elements that lend themselves well to contact images, profile pictures, etc.
         * @return {?}
         */
        get: function () {
            return this._avatar;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._avatar = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    MdcListDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcList]',
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcListDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MdcListDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-list',] },],
        '_items': [{ type: core.ContentChildren, args: [MdcListItemDirective,] },],
        '_texts': [{ type: core.ContentChildren, args: [MdcListItemTextDirective, { descendants: true },] },],
        '_twoLine': [{ type: core.HostBinding, args: ['class.mdc-list--two-line',] },],
        '_role': [{ type: core.HostBinding, args: ['attr.role',] },],
        '_ariaHidden': [{ type: core.HostBinding, args: ['attr.aria-hidden',] },],
        '_isMenu': [{ type: core.HostBinding, args: ['class.mdc-simple-menu__items',] },],
        'dense': [{ type: core.Input }, { type: core.HostBinding, args: ['class.mdc-list--dense',] },],
        'avatarList': [{ type: core.Input }, { type: core.HostBinding, args: ['class.mdc-list--avatar-list',] },],
    };
    return MdcListDirective;
}());
/**
 * Directive for a header inside a list group (<code>MdcListGroupDirective</code>) directive.
 */
var MdcListGroupSubHeaderDirective = (function () {
    function MdcListGroupSubHeaderDirective() {
        this._cls = true;
    }
    MdcListGroupSubHeaderDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcListGroupSubHeader]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcListGroupSubHeaderDirective.ctorParameters = function () { return []; };
    MdcListGroupSubHeaderDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-list-group__subheader',] },],
    };
    return MdcListGroupSubHeaderDirective;
}());
/**
 * Directive for a material designed list group, grouping several
<code>MdcListDirective</code> lists.
List groups should contain elements with <code>mdcListGroupSubHeader</code>,
and <code>mdcList</code> directives.
 */
var MdcListGroupDirective = (function () {
    function MdcListGroupDirective() {
        this._cls = true;
    }
    MdcListGroupDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcListGroup]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcListGroupDirective.ctorParameters = function () { return []; };
    MdcListGroupDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-list-group',] },],
    };
    return MdcListGroupDirective;
}());

var CLASS_MENU = 'mdc-simple-menu';
var CLASS_MENU_OPEN = 'mdc-simple-menu--open';
var CLASS_TOP_LEFT = 'mdc-simple-menu--open-from-top-left';
var CLASS_TOP_RIGHT = 'mdc-simple-menu--open-from-top-right';
var CLASS_BOTTOM_LEFT = 'mdc-simple-menu--open-from-bottom-left';
var CLASS_BOTTOM_RIGHT = 'mdc-simple-menu--open-from-bottom-right';
/**
 * Directive for an optional anchor to which a menu can position itself.
Use the <code>menuAnchor</code> input of <code>MdcSimpleMenuDirective</code>
to bind the menu to the anchor. The anchor must be a direct parent of the menu.
It will get the following styles to make the positioning work:
<code>position: relative;</code>, and <code>overflow: visible;</code>.
 */
var MdcMenuAnchorDirective = (function () {
    /**
     * @param {?} _elm
     */
    function MdcMenuAnchorDirective(_elm) {
        this._elm = _elm;
        this._cls = true;
    }
    MdcMenuAnchorDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcMenuAnchor]',
                    exportAs: 'mdcMenuAnchor'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcMenuAnchorDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MdcMenuAnchorDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-menu-anchor',] },],
    };
    return MdcMenuAnchorDirective;
}());
/**
 * Directive for a spec aligned material design 'Simple Menu'.
This directive should wrap an <code>MdcListDirective</code>. The <code>mdcList</code>
contains the menu items (and possible separators).
 */
var MdcSimpleMenuDirective = (function () {
    /**
     * @param {?} _elm
     * @param {?} _rndr
     * @param {?} _registry
     */
    function MdcSimpleMenuDirective(_elm, _rndr, _registry) {
        var _this = this;
        this._elm = _elm;
        this._rndr = _rndr;
        this._registry = _registry;
        this._cls = true;
        this._function = MdcListFunction.menu;
        this._open = false;
        this._openFrom = null;
        /**
         * Event emitted when the user selects a value. The passed object contains a value
        (set to the <code>value</code> of the selected list item), and an index
        (set to the index of the selected list item).
         */
        this.pick = new core.EventEmitter();
        /**
         * Event emitted when the menu is closed without any selection being made.
         */
        this.cancel = new core.EventEmitter();
        /**
         * Event emitted when the menu is opened or closed.
         */
        this.isOpenChange = new core.EventEmitter();
        this.mdcAdapter = {
            addClass: function (className) {
                _this._rndr.addClass(_this._elm.nativeElement, className);
            },
            removeClass: function (className) {
                _this._rndr.removeClass(_this._elm.nativeElement, className);
            },
            hasClass: function (className) {
                if (CLASS_MENU === className)
                    return true;
                if (CLASS_MENU_OPEN === className)
                    return _this._open;
                if (CLASS_TOP_LEFT === className)
                    return _this._openFrom === 'tl';
                if (CLASS_TOP_RIGHT === className)
                    return _this._openFrom === 'tr';
                if (CLASS_BOTTOM_LEFT === className)
                    return _this._openFrom === 'bl';
                if (CLASS_BOTTOM_RIGHT === className)
                    return _this._openFrom === 'br';
                return _this._elm.nativeElement.classList.contains(className);
            },
            hasNecessaryDom: function () { return _this._listQuery.length != 0; },
            getAttributeForEventTarget: function (target, attrName) { return target.getAttribute(attrName); },
            getInnerDimensions: function () {
                var /** @type {?} */ elm = _this._list._elm.nativeElement;
                return { width: elm.offsetWidth, height: elm.offsetHeight };
            },
            hasAnchor: function () { return _this.menuAnchor != null; },
            getAnchorDimensions: function () {
                if (!_this.viewport)
                    return _this.menuAnchor._elm.nativeElement.getBoundingClientRect();
                var /** @type {?} */ viewportRect = _this.viewport.getBoundingClientRect();
                var /** @type {?} */ anchorRect = _this.menuAnchor._elm.nativeElement.getBoundingClientRect();
                return {
                    bottom: anchorRect.bottom - viewportRect.top,
                    left: anchorRect.left - viewportRect.left,
                    right: anchorRect.right - viewportRect.left,
                    top: anchorRect.top - viewportRect.top,
                    width: anchorRect.width,
                    height: anchorRect.height
                };
            },
            getWindowDimensions: function () { return ({
                width: _this.viewport ? _this.viewport.clientWidth : window.innerWidth,
                height: _this.viewport ? _this.viewport.clientHeight : window.innerHeight
            }); },
            setScale: function (x, y) {
                _this._elm.nativeElement.style[menu.util.getTransformPropertyName(window)] = "scale(" + x + ", " + y + ")";
            },
            setInnerScale: function (x, y) {
                _this._list._elm.nativeElement.style[menu.util.getTransformPropertyName(window)] = "scale(" + x + ", " + y + ")";
            },
            getNumberOfItems: function () { return _this._list._items.length; },
            registerInteractionHandler: function (type, handler) {
                _this._registry.listen(_this._rndr, type, handler, _this._elm);
            },
            deregisterInteractionHandler: function (type, handler) {
                _this._registry.unlisten(type, handler);
            },
            registerBodyClickHandler: function (handler) {
                _this._registry.listenElm(_this._rndr, 'click', handler, document.body);
            },
            deregisterBodyClickHandler: function (handler) {
                _this._registry.unlisten('click', handler);
            },
            getYParamsForItemAtIndex: function (index) {
                var _a = _this._list._items.toArray()[index]._elm.nativeElement, top = _a.offsetTop, height = _a.offsetHeight;
                return { top: top, height: height };
            },
            setTransitionDelayForItemAtIndex: function (index, value) {
                _this._list._items.toArray()[index]._elm.nativeElement.style.setProperty('transition-delay', value);
            },
            getIndexForEventTarget: function (target) { return _this._list._items.toArray().map(function (i) { return i._elm.nativeElement; }).indexOf(target); },
            notifySelected: function (evtData) {
                _this._open = false;
                _this.pick.emit({ index: evtData.index, value: _this._list._items.toArray()[evtData.index].value });
                _this._onOpenClose();
            },
            notifyCancel: function () {
                _this._open = false;
                _this.cancel.emit();
                _this._onOpenClose();
            },
            saveFocus: function () {
                _this._prevFocus = document.activeElement;
            },
            restoreFocus: function () {
                if (_this._prevFocus)
                    ((_this._prevFocus)).focus();
            },
            isFocused: function () { return document.activeElement === _this._elm.nativeElement; },
            focus: function () {
                _this._elm.nativeElement.focus();
            },
            getFocusedItemIndex: function () { return _this._list._items.toArray().map(function (i) { return i._elm.nativeElement; }).indexOf(document.activeElement); },
            focusItemAtIndex: function (index) {
                _this._list._items.toArray()[index]._elm.nativeElement.focus();
            },
            isRtl: function () { return getComputedStyle(_this._elm.nativeElement).getPropertyValue('direction') === 'rtl'; },
            setTransformOrigin: function (origin) {
                _this._elm.nativeElement.style[menu.util.getTransformPropertyName(window) + "-origin"] = origin;
            },
            setPosition: function (position) {
                var /** @type {?} */ el = _this._elm.nativeElement;
                _this._rndr.setStyle(el, 'left', 'left' in position ? position.left : null);
                _this._rndr.setStyle(el, 'right', 'right' in position ? position.right : null);
                _this._rndr.setStyle(el, 'top', 'top' in position ? position.top : null);
                _this._rndr.setStyle(el, 'bottom', 'bottom' in position ? position.bottom : null);
            },
            getAccurateTime: function () { return window.performance.now(); }
        };
        this.foundation = new menu.MDCSimpleMenuFoundation(this.mdcAdapter);
    }
    /**
     * @return {?}
     */
    MdcSimpleMenuDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._lastList = this._listQuery.first;
        if (this._lastList) {
            this._lastList._setFunction(MdcListFunction.menu);
            this._onOpenClose(false);
        }
        this._listQuery.changes.subscribe(function () {
            if (_this._lastList !== _this._listQuery.first) {
                _this._lastList._setFunction(MdcListFunction.plain);
                _this._lastList = _this._listQuery.first;
                if (_this._lastList) {
                    _this._lastList._setFunction(MdcListFunction.menu);
                    _this._onOpenClose(false);
                    if (_this._component == null)
                        _this._component = new menu.MDCSimpleMenu(_this._elm.nativeElement, _this.foundation);
                }
                else {
                    _this._component.destroy();
                    _this._component = null;
                    _this.foundation = new menu.MDCSimpleMenuFoundation(_this.mdcAdapter);
                }
            }
        });
        if (this._lastList)
            // constructing the MDCSimpleMenu also initializes the foundation:
            this._component = new menu.MDCSimpleMenu(this._elm.nativeElement, this.foundation);
    };
    /**
     * @return {?}
     */
    MdcSimpleMenuDirective.prototype.ngOnDestroy = function () {
        if (this._component)
            this._component.destroy();
    };
    /**
     * @param {?=} emit
     * @return {?}
     */
    MdcSimpleMenuDirective.prototype._onOpenClose = function (emit) {
        if (emit === void 0) { emit = true; }
        if (this._list)
            this._list._hidden = !this._open;
        if (emit)
            this.isOpenChange.emit(this._open);
    };
    Object.defineProperty(MdcSimpleMenuDirective.prototype, "_listFunction", {
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._function = val;
            if (this._lastList)
                this._list._setFunction(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSimpleMenuDirective.prototype, "_list", {
        /**
         * @return {?}
         */
        get: function () {
            return this._listQuery.first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSimpleMenuDirective.prototype, "_isSelect", {
        /**
         * @return {?}
         */
        get: function () {
            return this._function === MdcListFunction.select;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSimpleMenuDirective.prototype, "isOpen", {
        /**
         * When this input is defined and does not have value false, the menu will be opened,
        otherwise the menu will be closed.
         * @return {?}
         */
        get: function () {
            return this._open;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            var /** @type {?} */ newValue = asBoolean(val);
            if (newValue !== this._open) {
                this._open = newValue;
                if (this._component != null) {
                    if (this._open)
                        this.foundation.open();
                    else
                        this.foundation.close();
                }
                this._onOpenClose(false);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSimpleMenuDirective.prototype, "openFrom", {
        /**
         * Set this value if you want to customize the direction from which the menu will be opened.
        Note that without this setting the menu will base the direction upon its position in the viewport,
        which is normally the right behavior. Use <code>'tl'</code> for top-left, <code>'br'</code>
        for bottom-right, etc.
         * @return {?}
         */
        get: function () {
            return this._openFrom;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            if (val === 'br' || val === 'bl' || val === 'tr' || val === 'tl')
                this._openFrom = val;
            else
                this._openFrom = null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSimpleMenuDirective.prototype, "_tl", {
        /**
         * @return {?}
         */
        get: function () { return this._openFrom === 'tl'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSimpleMenuDirective.prototype, "_tr", {
        /**
         * @return {?}
         */
        get: function () { return this._openFrom === 'tr'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSimpleMenuDirective.prototype, "_bl", {
        /**
         * @return {?}
         */
        get: function () { return this._openFrom === 'bl'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSimpleMenuDirective.prototype, "_br", {
        /**
         * @return {?}
         */
        get: function () { return this._openFrom === 'br'; },
        enumerable: true,
        configurable: true
    });
    MdcSimpleMenuDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcSimpleMenu]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcSimpleMenuDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.Renderer2, },
        { type: MdcEventRegistry, },
    ]; };
    MdcSimpleMenuDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-simple-menu',] },],
        'menuAnchor': [{ type: core.Input },],
        'pick': [{ type: core.Output },],
        'cancel': [{ type: core.Output },],
        'isOpenChange': [{ type: core.Output },],
        '_listQuery': [{ type: core.ContentChildren, args: [MdcListDirective,] },],
        '_isSelect': [{ type: core.HostBinding, args: ['class.mdc-select__menu',] },],
        'isOpen': [{ type: core.Input }, { type: core.HostBinding, args: ['class.mdc-simple-menu--open',] },],
        'openFrom': [{ type: core.Input },],
        '_tl': [{ type: core.HostBinding, args: ['class.mdc-simple-menu--open-from-top-left',] },],
        '_tr': [{ type: core.HostBinding, args: ['class.mdc-simple-menu--open-from-top-right',] },],
        '_bl': [{ type: core.HostBinding, args: ['class.mdc-simple-menu--open-from-bottom-left',] },],
        '_br': [{ type: core.HostBinding, args: ['class.mdc-simple-menu--open-from-bottom-right',] },],
        'viewport': [{ type: core.Input },],
    };
    return MdcSimpleMenuDirective;
}());

/**
 * Directive for the input element of an <code>MdcRadioDirective</code>.
 */
var MdcRadioInputDirective = (function (_super) {
    tslib_1.__extends(MdcRadioInputDirective, _super);
    /**
     * @param {?} _elm
     * @param {?} _cntr
     */
    function MdcRadioInputDirective(_elm, _cntr) {
        var _this = _super.call(this) || this;
        _this._elm = _elm;
        _this._cntr = _cntr;
        _this._cls = true;
        _this._disabled = false;
        return _this;
    }
    Object.defineProperty(MdcRadioInputDirective.prototype, "id", {
        /**
         * \@docs-private
         * @return {?}
         */
        get: function () {
            return this._id;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcRadioInputDirective.prototype, "disabled", {
        /**
         * \@docs-private
         * @return {?}
         */
        get: function () {
            return this._cntr ? this._cntr.disabled : this._disabled;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._disabled = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    MdcRadioInputDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'input[mdcRadioInput][type=radio]',
                    providers: [{ provide: AbstractMdcInput, useExisting: core.forwardRef(function () { return MdcRadioInputDirective; }) }]
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcRadioInputDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: forms.NgControl, decorators: [{ type: core.Optional }, { type: core.Self },] },
    ]; };
    MdcRadioInputDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-radio__native-control',] },],
        'id': [{ type: core.HostBinding }, { type: core.Input },],
        'disabled': [{ type: core.HostBinding }, { type: core.Input },],
    };
    return MdcRadioInputDirective;
}(AbstractMdcInput));
/**
 * Directive for creating a Material Design radio button. The radio button is driven by an
underlying native radio input, which must use the <code>MdcRadioInputDirective</code>
directive.
The current implementation will add all other required DOM elements (such as the
background).
Future implementations will also support supplying (customized) background
elements.
</p><p>
This directive can be used together with an <code>mdcFormField</code> to
easily position radio buttons and their labels, see
<a href="#/directives/form-field">mdcFormField</a>.
 */
var MdcRadioDirective = (function (_super) {
    tslib_1.__extends(MdcRadioDirective, _super);
    /**
     * @param {?} renderer
     * @param {?} root
     * @param {?} registry
     */
    function MdcRadioDirective(renderer, root, registry) {
        var _this = _super.call(this, root, renderer, registry) || this;
        _this.renderer = renderer;
        _this.root = root;
        _this.registry = registry;
        _this._cls = true;
        _this.mdcAdapter = {
            addClass: function (className) {
                _this.renderer.addClass(_this.root.nativeElement, className);
            },
            removeClass: function (className) {
                _this.renderer.removeClass(_this.root.nativeElement, className);
            },
            getNativeControl: function () { return _this._input ? _this._input._elm.nativeElement : null; }
        };
        _this.foundation = new radio.MDCRadioFoundation(_this.mdcAdapter);
        return _this;
    }
    /**
     * @return {?}
     */
    MdcRadioDirective.prototype.ngAfterContentInit = function () {
        this.addBackground();
        this.initRipple();
        this.foundation.init();
    };
    /**
     * @return {?}
     */
    MdcRadioDirective.prototype.ngOnDestroy = function () {
        this.destroyRipple();
        this.foundation.destroy();
    };
    /**
     * @return {?}
     */
    MdcRadioDirective.prototype.addBackground = function () {
        var /** @type {?} */ outerCircle = this.renderer.createElement('div');
        this.renderer.addClass(outerCircle, 'mdc-radio__outer-circle');
        var /** @type {?} */ innerCircle = this.renderer.createElement('div');
        this.renderer.addClass(innerCircle, 'mdc-radio__inner-circle');
        var /** @type {?} */ bg = this.renderer.createElement('div');
        this.renderer.appendChild(bg, outerCircle);
        this.renderer.appendChild(bg, innerCircle);
        this.renderer.addClass(bg, 'mdc-radio__background');
        this.renderer.appendChild(this.root.nativeElement, bg);
    };
    /**
     * \@docs-private
     * @return {?}
     */
    MdcRadioDirective.prototype.getRippleInteractionElement = function () {
        return this._input ? this._input._elm : null;
    };
    /**
     * \@docs-private
     * @return {?}
     */
    MdcRadioDirective.prototype.isRippleUnbounded = function () {
        return true;
    };
    /**
     * \@docs-private
     * @return {?}
     */
    MdcRadioDirective.prototype.isRippleSurfaceActive = function () {
        // This is what the @material/radio MDCRadio component does, with the following comment:
        // "Radio buttons technically go 'active' whenever there is *any* keyboard interaction.
        //  This is not the UI we desire."
        return false;
    };
    /**
     * \@docs-private
     * @return {?}
     */
    MdcRadioDirective.prototype.computeRippleBoundingRect = function () {
        var /** @type {?} */ dim = 40;
        var _a = this.root.nativeElement.getBoundingClientRect(), left = _a.left, top = _a.top;
        return {
            top: top,
            left: left,
            right: left + dim,
            bottom: top + dim,
            width: dim,
            height: dim
        };
    };
    Object.defineProperty(MdcRadioDirective.prototype, "_disabled", {
        /**
         * @return {?}
         */
        get: function () {
            return this._input == null || this._input.disabled;
        },
        enumerable: true,
        configurable: true
    });
    MdcRadioDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcRadio]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcRadioDirective.ctorParameters = function () { return [
        { type: core.Renderer2, },
        { type: core.ElementRef, },
        { type: MdcEventRegistry, },
    ]; };
    MdcRadioDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-radio',] },],
        '_input': [{ type: core.ContentChild, args: [MdcRadioInputDirective,] },],
        '_disabled': [{ type: core.HostBinding, args: ['class.mdc-radio--disabled',] },],
    };
    return MdcRadioDirective;
}(AbstractMdcRipple));

/**
 * Directive for making an element a ripple surface.
 */
var MdcRippleDirective = (function (_super) {
    tslib_1.__extends(MdcRippleDirective, _super);
    /**
     * @param {?} elm
     * @param {?} renderer
     * @param {?} registry
     */
    function MdcRippleDirective(elm, renderer, registry) {
        var _this = _super.call(this, elm, renderer, registry) || this;
        _this.elm = elm;
        _this.renderer = renderer;
        _this.registry = registry;
        _this._initialized = false;
        _this._on = false;
        _this._disabled = null;
        _this._unbounded = false;
        _this._dim = null;
        return _this;
    }
    /**
     * @return {?}
     */
    MdcRippleDirective.prototype.ngAfterContentInit = function () {
        if (this._on)
            this.initRipple();
        this._initialized = true;
    };
    /**
     * @return {?}
     */
    MdcRippleDirective.prototype.ngOnDestroy = function () {
        this.destroyRipple();
    };
    /**
     * \@docs-private
     * @return {?}
     */
    MdcRippleDirective.prototype.isRippleUnbounded = function () {
        return this._unbounded;
    };
    /**
     * \@docs-private
     * @return {?}
     */
    MdcRippleDirective.prototype.isRippleSurfaceDisabled = function () {
        return this._disabled == null ? _super.prototype.isRippleSurfaceDisabled.call(this) : this._disabled;
    };
    /**
     * \@docs-private
     * @return {?}
     */
    MdcRippleDirective.prototype.computeRippleBoundingRect = function () {
        if (this._dim == null)
            return _super.prototype.computeRippleBoundingRect.call(this);
        var _a = this.elm.nativeElement.getBoundingClientRect(), left = _a.left, top = _a.top;
        return {
            left: left,
            top: top,
            width: this._dim,
            height: this._dim,
            right: left + this._dim,
            bottom: left + this._dim,
        };
    };
    Object.defineProperty(MdcRippleDirective.prototype, "mdcRipple", {
        /**
         * Set this input to false to remove the ripple effect from the surface.
         * @return {?}
         */
        get: function () {
            return !this._on;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var /** @type {?} */ newValue = asBoolean(value);
            if (newValue !== this._on) {
                this._on = newValue;
                if (this._initialized) {
                    if (newValue)
                        this.initRipple();
                    else
                        this.destroyRipple();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcRippleDirective.prototype, "unbounded", {
        /**
         * When this input has a value other than false, the ripple is unbounded.
        Surfaces for bounded ripples should have <code>overflow</code> set to hidden,
        while surfaces for unbounded ripples should have it set to <code>visible</code>.
         * @return {?}
         */
        get: function () {
            return this._unbounded;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var /** @type {?} */ newValue = asBoolean(value);
            if (newValue !== this._unbounded) {
                this._unbounded = newValue;
                this.reInit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcRippleDirective.prototype, "dimension", {
        /**
         * This input sets the dimension of the ripple.
        This input can be set to null for returning to the defaults, which uses the surface
        element to compute the bounds of the ripple.
         * @return {?}
         */
        get: function () {
            return this._dim;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._dim = value == null ? null : +value;
            this.layout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcRippleDirective.prototype, "disabled", {
        /**
         * This input can be used to programmatically enable/disable the ripple.
        When true, the ripple effect will be disabled, when false the ripple
        effect will be enabled. When not set, or <code>null</code> (default)
        the ripple effect enabled/disabled state depend on whether or not the
        surface element has the <code>disabled</code> attribute set.
         * @return {?}
         */
        get: function () {
            return this._disabled;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._disabled = asBooleanOrNull(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MdcRippleDirective.prototype.reInit = function () {
        if (this._initialized && this.isRippleInitialized()) {
            this.destroyRipple();
            this.initRipple();
        }
    };
    /**
     * @return {?}
     */
    MdcRippleDirective.prototype.layout = function () {
        if (this._initialized && this.isRippleInitialized()) {
            this._rippleFoundation.layout();
        }
    };
    MdcRippleDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcRipple]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcRippleDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.Renderer2, },
        { type: MdcEventRegistry, },
    ]; };
    MdcRippleDirective.propDecorators = {
        '_on': [{ type: core.HostBinding, args: ['class.mdc-ripple-surface',] },],
        'mdcRipple': [{ type: core.Input },],
        'unbounded': [{ type: core.Input },],
        'dimension': [{ type: core.Input },],
        'disabled': [{ type: core.Input },],
    };
    return MdcRippleDirective;
}(AbstractMdcRipple));

var CLASS_SELECT = 'mdc-select';
var CLASS_SELECT_SELECTED_TEXT = 'mdc-select__selected-text';
/**
 * Directive for the text representation of an <code>mdcSelect</code> selection control.
 */
var MdcSelectTextDirective = (function () {
    /**
     * @param {?} _elm
     */
    function MdcSelectTextDirective(_elm) {
        this._elm = _elm;
        this._cls = true;
    }
    MdcSelectTextDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcSelectedText]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcSelectTextDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MdcSelectTextDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.' + CLASS_SELECT_SELECTED_TEXT,] },],
    };
    return MdcSelectTextDirective;
}());
/**
 * Directive for a spec aligned material design 'Select Control',
build on top of a simple menu.
This directive should wrap an <code>MdcSelectTextDirective</code>, and
an <code>MdcSimpleMenuDirective</code>
 */
var MdcSelectDirective = (function () {
    /**
     * @param {?} _elm
     * @param {?} _rndr
     * @param {?} _registry
     */
    function MdcSelectDirective(_elm, _rndr, _registry) {
        var _this = this;
        this._elm = _elm;
        this._rndr = _rndr;
        this._registry = _registry;
        this.onDestroy$ = new Subject.Subject();
        this._cls = true;
        this._role = 'listbox';
        this._onChange = function (value) { };
        this._onTouched = function () { };
        this._initialized = false;
        this._value = null;
        this._disabled = false;
        /**
         * Event emitted when the value of the select changes. Note that when an <code>mdcSelect</code> is used as a FormControl,
        it's also possible to bind to <code>ngModelChange</code> instead of <code>valueChange</code>.
         */
        this.valueChange = new core.EventEmitter();
        this.mdcAdapter = {
            addClass: function (className) { _this._rndr.addClass(_this._elm.nativeElement, className); },
            removeClass: function (className) { _this._rndr.removeClass(_this._elm.nativeElement, className); },
            setAttr: function (attr, value) { _this._rndr.setAttribute(_this._elm.nativeElement, attr, value); },
            rmAttr: function (attr) { _this._rndr.removeAttribute(_this._elm.nativeElement, attr); },
            computeBoundingRect: function () { return _this._elm.nativeElement.getBoundingClientRect(); },
            registerInteractionHandler: function (type, handler) { return _this._registry.listen(_this._rndr, type, handler, _this._elm); },
            deregisterInteractionHandler: function (type, handler) { return _this._registry.unlisten(type, handler); },
            focus: function () { _this._elm.nativeElement.focus(); },
            makeTabbable: function () { _this._elm.nativeElement.tabIndex = 0; },
            makeUntabbable: function () { _this._elm.nativeElement.tabIndex = -1; },
            getComputedStyleValue: function (prop) { return window.getComputedStyle(_this._elm.nativeElement).getPropertyValue(prop); },
            setStyle: function (propertyName, value) { _this._rndr.setStyle(_this._elm.nativeElement, propertyName, value); },
            create2dRenderingContext: function () { return document.createElement('canvas').getContext('2d'); },
            setMenuElStyle: function (propertyName, value) { return _this._rndr.setStyle(_this._menuEl, propertyName, value); },
            setMenuElAttr: function (attr, value) { return _this._rndr.setAttribute(_this._menuEl, attr, value); },
            rmMenuElAttr: function (attr) { return _this._rndr.removeAttribute(_this._menuEl, attr); },
            getMenuElOffsetHeight: function () { return _this._menuEl.offsetHeight; },
            openMenu: function (focusIndex) { return _this._menu._component.show({ focusIndex: focusIndex }); },
            isMenuOpen: function () { return _this._menu._component.open; },
            setSelectedTextContent: function (selectedTextContent) {
                if (_this._text)
                    _this._text._elm.nativeElement.textContent = selectedTextContent;
            },
            getNumberOfOptions: function () { return _this._items.length; },
            getTextForOptionAtIndex: function (index) { return _this._items[index]._elm.nativeElement.textContent; },
            getValueForOptionAtIndex: function (index) { return _this._items[index].value; },
            setAttrForOptionAtIndex: function (index, attr, value) { return _this._rndr.setAttribute(_this._items[index]._elm.nativeElement, attr, value); },
            rmAttrForOptionAtIndex: function (index, attr) { return _this._rndr.removeAttribute(_this._items[index]._elm.nativeElement, attr); },
            getOffsetTopForOptionAtIndex: function (index) { return _this._items[index]._elm.nativeElement.offsetTop; },
            registerMenuInteractionHandler: function (type, handler) {
                var /** @type {?} */ subscription;
                if (type === 'MDCSimpleMenu:selected')
                    subscription = _this._menu.pick.subscribe(function (evt) {
                        handler(_this.createEvent(type, { index: evt.index }));
                        _this._onTouched();
                    });
                else if (type === 'MDCSimpleMenu:cancel')
                    subscription = _this._menu.cancel.subscribe(function (evt) {
                        handler(_this.createEvent(type, {}));
                        _this._onTouched();
                    });
                else
                    throw new Error('Unsupported event type: ' + type);
                _this._registry.registerUnlisten(type, handler, function () { subscription.unsubscribe(); });
            },
            deregisterMenuInteractionHandler: function (type, handler) {
                _this._registry.unlisten(type, handler);
            },
            notifyChange: function () {
                var /** @type {?} */ idx = _this.foundation.getSelectedIndex();
                _this._value = (idx == -1) ? null : _this._items[idx].value;
                _this.valueChange.emit(_this._value);
                _this._onChange(_this._value);
            },
            getWindowInnerHeight: function () { return window.innerHeight; },
        };
        this.foundation = new select.MDCSelectFoundation(this.mdcAdapter);
    }
    /**
     * @return {?}
     */
    MdcSelectDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (!this._menu || !this._menu._list)
            throw new Error('mdcSelect requires an embedded mdcMenu and mdcList');
        // This style is needed for layout (size detection) of the select box,
        // but not yet available from the HostBinding in ngAfterContentInit:
        this._elm.nativeElement.classList.add(CLASS_SELECT);
        if (!this._elm.nativeElement.hasAttribute('tabindex'))
            // unless overridden by another tabIndex, we want icon-toggles to
            // participate in tabbing (the foundation will remove the tabIndex
            // when the icon-toggle is disabled):
            this._elm.nativeElement.tabIndex = 0;
        this._menu._listFunction = MdcListFunction.select;
        this.foundation.init();
        this._initialized = true;
        if (this._value)
            this.updateIndexFromValue();
        // when the list items change, the index might be affected based on the currently selected value:
        this._menu._list._items.changes.pipe(takeUntil.takeUntil(this.onDestroy$)).subscribe(function () {
            _this.updateIndexFromValue();
        });
        if (this._disabled)
            this.foundation.setDisabled(this._disabled);
    };
    /**
     * @return {?}
     */
    MdcSelectDirective.prototype.ngOnDestroy = function () {
        this.onDestroy$.next();
        this.onDestroy$.complete();
        this.foundation.destroy();
    };
    Object.defineProperty(MdcSelectDirective.prototype, "_items", {
        /**
         * @return {?}
         */
        get: function () {
            return this._menu._list._items.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSelectDirective.prototype, "_menuEl", {
        /**
         * @return {?}
         */
        get: function () {
            return this._menu._elm.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} emit
     * @param {?=} onchanges
     * @return {?}
     */
    MdcSelectDirective.prototype.updateIndexFromValue = function (emit, onchanges) {
        if (emit === void 0) { emit = true; }
        if (onchanges === void 0) { onchanges = true; }
        if (this._initialized) {
            var /** @type {?} */ index = this._items.map(function (i) { return i.value; }).indexOf(this._value);
            var /** @type {?} */ newValue = index === -1 ? null : this._value;
            if (index !== this.foundation.getSelectedIndex())
                this.foundation.setSelectedIndex(index);
            if (this._value !== newValue) {
                this._value = newValue;
                if (emit)
                    this.valueChange.emit(this._value);
                if (onchanges)
                    this._onChange(this._value);
            }
        }
    };
    /**
     * @param {?} type
     * @param {?} details
     * @return {?}
     */
    MdcSelectDirective.prototype.createEvent = function (type, details) {
        if (typeof CustomEvent === 'function')
            return new CustomEvent(type, { detail: details });
        else {
            var /** @type {?} */ result = document.createEvent('CustomEvent');
            result.initCustomEvent(type, false, false, details);
            return result;
        }
    };
    /**
     * \@docs-private
     * @param {?} obj
     * @return {?}
     */
    MdcSelectDirective.prototype.writeValue = function (obj) {
        this._value = obj;
        this.updateIndexFromValue(true, false);
    };
    /**
     * \@docs-private
     * @param {?} onChange
     * @return {?}
     */
    MdcSelectDirective.prototype.registerOnChange = function (onChange) {
        this._onChange = onChange;
    };
    /**
     * \@docs-private
     * @param {?} onTouched
     * @return {?}
     */
    MdcSelectDirective.prototype.registerOnTouched = function (onTouched) {
        this._onTouched = onTouched;
    };
    Object.defineProperty(MdcSelectDirective.prototype, "value", {
        /**
         * Property for the chosen value of the select control. The value that each option represents
        can be set with the <code>value</code> option on the <code>MdcListItemDirective</code>
        that represents that choice. Note that when an <code>mdcSelect</code> is used as a FormControl,
        it's also possible to bind to <code>ngModel</code> instead of <code>value</code>.
         * @return {?}
         */
        get: function () {
            return this._value;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._value = value;
            this.updateIndexFromValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSelectDirective.prototype, "disabled", {
        /**
         * When this input is defined and does not have value false, the select control will be disabled.
         * @return {?}
         */
        get: function () {
            return this._disabled;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var /** @type {?} */ newValue = asBoolean(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                if (this._initialized)
                    this.foundation.setDisabled(newValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    MdcSelectDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcSelect]:not(select)'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcSelectDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.Renderer2, },
        { type: MdcEventRegistry, },
    ]; };
    MdcSelectDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.' + CLASS_SELECT,] },],
        '_role': [{ type: core.HostBinding, args: ['attr.role',] },],
        '_menu': [{ type: core.ContentChild, args: [MdcSimpleMenuDirective,] },],
        '_text': [{ type: core.ContentChild, args: [MdcSelectTextDirective,] },],
        'valueChange': [{ type: core.Output },],
        'value': [{ type: core.Input },],
        'disabled': [{ type: core.Input },],
    };
    return MdcSelectDirective;
}());
/**
 * Directive for adding Angular Forms (<code>ControlValueAccessor</code>) behavior to an
<code>MdcSelectDirective</code>. Allows the use of the Angular Forms API with
select inputs, e.g. binding to <code>[(ngModel)]</code>, form validation, etc.
 */
var MdcFormsSelectDirective = (function () {
    /**
     * @param {?} mdcSelect
     */
    function MdcFormsSelectDirective(mdcSelect) {
        this.mdcSelect = mdcSelect;
    }
    /**
     * \@docs-private
     * @param {?} obj
     * @return {?}
     */
    MdcFormsSelectDirective.prototype.writeValue = function (obj) {
        this.mdcSelect.writeValue(obj);
    };
    /**
     * \@docs-private
     * @param {?} onChange
     * @return {?}
     */
    MdcFormsSelectDirective.prototype.registerOnChange = function (onChange) {
        this.mdcSelect.registerOnChange(onChange);
    };
    /**
     * \@docs-private
     * @param {?} onTouched
     * @return {?}
     */
    MdcFormsSelectDirective.prototype.registerOnTouched = function (onTouched) {
        this.mdcSelect.registerOnTouched(onTouched);
    };
    /**
     * \@docs-private
     * @param {?} disabled
     * @return {?}
     */
    MdcFormsSelectDirective.prototype.setDisabledState = function (disabled) {
        this.mdcSelect.disabled = disabled;
    };
    MdcFormsSelectDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcSelect][formControlName]:not(select),[mdcSelect][formControl]:not(select),[mdcSelect][ngModel]:not(select)',
                    providers: [
                        { provide: forms.NG_VALUE_ACCESSOR, useExisting: core.forwardRef(function () { return MdcFormsSelectDirective; }), multi: true }
                    ]
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcFormsSelectDirective.ctorParameters = function () { return [
        { type: MdcSelectDirective, decorators: [{ type: core.Self },] },
    ]; };
    return MdcFormsSelectDirective;
}());
/**
 * Directive for a 'Select Control' based on the native HTML <code>select</code>
element. This directive may provide better usability then the <code>MdcSelectDirective</code>
on mobile devices. For tablets and desktop, the standard <code>MdcSelectDirective</code>
is recommended.
When this directive is used, the standard HTML <code>option</code> and <code>optgroup</code>
elements must be used to define the choices. No additional directives are needed.
 */
var MdcSelectNativeDirective = (function () {
    function MdcSelectNativeDirective() {
        this._cls = true;
    }
    MdcSelectNativeDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'select[mdcSelect]:not([multiple])'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcSelectNativeDirective.ctorParameters = function () { return []; };
    MdcSelectNativeDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.' + CLASS_SELECT,] },],
    };
    return MdcSelectNativeDirective;
}());
/**
 * Directive for an option inside a mult-selection 'Select Control'
using <code>MdcSelectMultipleNativeDirective</code>.
 */
var MdcSelectOptionNativeDirective = (function () {
    function MdcSelectOptionNativeDirective() {
        this._cls = false;
    }
    MdcSelectOptionNativeDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'option[mdcSelectOption]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcSelectOptionNativeDirective.ctorParameters = function () { return []; };
    MdcSelectOptionNativeDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-list-item',] },],
    };
    return MdcSelectOptionNativeDirective;
}());
/**
 * Directive for an optgroup inside a mult-selection 'Select Control'
using <code>MdcSelectMultipleNativeDirective</code>.
 */
var MdcSelectGroupNativeDirective = (function () {
    function MdcSelectGroupNativeDirective() {
        this._cls = false;
    }
    MdcSelectGroupNativeDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'optgroup[mdcSelectGroup]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcSelectGroupNativeDirective.ctorParameters = function () { return []; };
    MdcSelectGroupNativeDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-list-group',] },],
    };
    return MdcSelectGroupNativeDirective;
}());
/**
 * Directive for a mult-selection 'Select Control' based on the native HTML <code>select[multiple]</code>
element.
When this directive is used, the standard HTML <code>option</code> and <code>optgroup</code>
elements must be used to define the choices. Each option should be annotated with an
<code>MdcSelectOptionNativeDirective</code>, and each <code>optgroup</code> with an
<code>MdcSelectGroupNativeDirective</code>.
Option dividers can be created as follows:
<code>&lt;option mdcListDivider&gt;&lt;/option&gt;</code>.
 */
var MdcSelectMultipleNativeDirective = (function () {
    function MdcSelectMultipleNativeDirective() {
        this._cls1 = true;
        this._cls2 = true;
    }
    /**
     * @return {?}
     */
    MdcSelectMultipleNativeDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.groups.forEach(function (group) { return group._cls = true; });
        this.options.forEach(function (option) { return option._cls = true; });
        this.groups.changes.subscribe(function () {
            _this.groups.forEach(function (group) { return group._cls = true; });
        });
        this.options.changes.subscribe(function () {
            _this.options.forEach(function (option) { return option._cls = true; });
        });
    };
    MdcSelectMultipleNativeDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'select[mdcSelect][multiple]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcSelectMultipleNativeDirective.ctorParameters = function () { return []; };
    MdcSelectMultipleNativeDirective.propDecorators = {
        '_cls1': [{ type: core.HostBinding, args: ['class.mdc-multi-select',] },],
        '_cls2': [{ type: core.HostBinding, args: ['class.mdc-list',] },],
        'options': [{ type: core.ContentChildren, args: [MdcSelectOptionNativeDirective, { descendants: true },] },],
        'groups': [{ type: core.ContentChildren, args: [MdcSelectGroupNativeDirective, { descendants: true },] },],
    };
    return MdcSelectMultipleNativeDirective;
}());

/**
 * Directive for creating a Material Design slider input.
(Modelled after the <code>&lt;input type="range"/&gt;</code> element).
The slider is fully accessible. The current implementation
will add and manage all DOM child elements that are required for the wrapped
<code>mdc-slider</code> component.
Future implementations will also support supplying (customized)
DOM children.
 */
var MdcSliderDirective = (function () {
    /**
     * @param {?} _rndr
     * @param {?} _root
     * @param {?} _registry
     */
    function MdcSliderDirective(_rndr, _root, _registry) {
        var _this = this;
        this._rndr = _rndr;
        this._root = _root;
        this._registry = _registry;
        this._cls = true;
        this._role = 'slider';
        /**
         * Event emitted when the value changes. The value may change because of user input,
        or as a side affect of setting new min, max, or step values.
         */
        this.valueChange = new core.EventEmitter();
        /**
         * Event emitted when the min range value changes. This may happen as a side effect
        of setting a new max value (when the new max is smaller than the old min).
         */
        this.minValueChange = new core.EventEmitter();
        /**
         * Event emitted when the max range value changes. This may happen as a side effect
        of setting a new min value (when the new min is larger than the old max).
         */
        this.maxValueChange = new core.EventEmitter();
        /**
         * Event emitted when the step value changes. This may happen as a side effect
        of making the slider discrete.
         */
        this.stepValueChange = new core.EventEmitter();
        this._initialized = false;
        this._onChange = function (value) { };
        this._onTouched = function () { };
        this._discrete = false;
        this._markers = false;
        this._disabled = false;
        this._value = 0;
        this._min = 0;
        this._max = 100;
        this._step = 0;
        this._interactionHandlers = [];
        this.mdcAdapter = {
            hasClass: function (className) {
                if (className === 'mdc-slider--discrete')
                    return _this._discrete;
                if (className === 'mdc-slider--display-markers')
                    return _this._markers;
                return _this._root.nativeElement.classList.contains(className);
            },
            addClass: function (className) {
                _this._rndr.addClass(_this._root.nativeElement, className);
            },
            removeClass: function (className) {
                _this._rndr.removeClass(_this._root.nativeElement, className);
            },
            getAttribute: function (name) { return _this._root.nativeElement.getAttribute(name); },
            setAttribute: function (name, value) { _this._rndr.setAttribute(_this._root.nativeElement, name, value); },
            removeAttribute: function (name) { _this._rndr.removeAttribute(_this._root.nativeElement, name); },
            computeBoundingRect: function () { return _this._root.nativeElement.getBoundingClientRect(); },
            getTabIndex: function () { return _this._root.nativeElement.tabIndex; },
            registerInteractionHandler: function (type, handler) {
                _this._registry.listen(_this._rndr, type, handler, _this._root);
                _this._interactionHandlers.push({ type: type, handler: handler });
            },
            deregisterInteractionHandler: function (type, handler) {
                _this._registry.unlisten(type, handler);
                for (var /** @type {?} */ i = 0; i != _this._interactionHandlers.length; ++i) {
                    var /** @type {?} */ handlerInfo = _this._interactionHandlers[i];
                    if (handlerInfo.type === type && handlerInfo.handler === handler) {
                        _this._interactionHandlers.splice(i, 1);
                        break;
                    }
                }
            },
            registerThumbContainerInteractionHandler: function (type, handler) {
                _this._registry.listenElm(_this._rndr, type, handler, _this._elmThumbCntr);
            },
            deregisterThumbContainerInteractionHandler: function (type, handler) {
                _this._registry.unlisten(type, handler);
            },
            registerBodyInteractionHandler: function (type, handler) {
                _this._registry.listenElm(_this._rndr, type, handler, document.body);
            },
            deregisterBodyInteractionHandler: function (type, handler) {
                _this._registry.unlisten(type, handler);
            },
            registerResizeHandler: function (handler) {
                _this._registry.listenElm(_this._rndr, 'resize', handler, window);
            },
            deregisterResizeHandler: function (handler) {
                _this._registry.unlisten('resize', handler);
            },
            notifyInput: function () {
                var /** @type {?} */ newValue = _this.foundation.getValue();
                if (newValue !== _this._value) {
                    _this._value = newValue;
                    _this.notifyValueChanged(true);
                }
            },
            notifyChange: function () {
                // currently not handling this event, if there is a usecase for this, please
                // create a feature request.
            },
            setThumbContainerStyleProperty: function (propertyName, value) {
                _this._rndr.setStyle(_this._elmThumbCntr, propertyName, value);
            },
            setTrackStyleProperty: function (propertyName, value) {
                _this._rndr.setStyle(_this._elmTrack, propertyName, value);
            },
            setMarkerValue: function (value) {
                if (_this._elmValueMarker)
                    _this._elmValueMarker.innerText = value != null ? value.toString() : null;
            },
            appendTrackMarkers: function (numMarkers) {
                if (_this._elmTrackMarkerCntr) {
                    var /** @type {?} */ frag = document.createDocumentFragment();
                    for (var /** @type {?} */ i = 0; i < numMarkers; i++) {
                        var /** @type {?} */ marker = document.createElement('div');
                        marker.classList.add('mdc-slider__track-marker');
                        frag.appendChild(marker);
                    }
                    _this._rndr.appendChild(_this._elmTrackMarkerCntr, frag);
                }
            },
            removeTrackMarkers: function () {
                if (_this._elmTrackMarkerCntr)
                    while (_this._elmTrackMarkerCntr.firstChild)
                        _this._rndr.removeChild(_this._elmTrackMarkerCntr, _this._elmTrackMarkerCntr.firstChild);
            },
            setLastTrackMarkersStyleProperty: function (propertyName, value) {
                var /** @type {?} */ lastTrackMarker = _this._root.nativeElement.querySelector('.mdc-slider__track-marker:last-child');
                if (lastTrackMarker)
                    _this._rndr.setStyle(lastTrackMarker, propertyName, value);
            },
            isRTL: function () { return getComputedStyle(_this._root.nativeElement).direction === 'rtl'; }
        };
        this.foundation = new slider.MDCSliderFoundation(this.mdcAdapter);
    }
    /**
     * @return {?}
     */
    MdcSliderDirective.prototype.ngAfterContentInit = function () {
        this.initElements();
        this.initDefaultAttributes();
        this.foundation.init();
        this._lastWidth = this.mdcAdapter.computeBoundingRect().width;
        this.updateValues({}, true);
        this._initialized = true;
    };
    /**
     * @return {?}
     */
    MdcSliderDirective.prototype.ngAfterViewInit = function () {
        this.updateLayout();
    };
    /**
     * @return {?}
     */
    MdcSliderDirective.prototype.ngOnDestroy = function () {
        this.foundation.destroy();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MdcSliderDirective.prototype.ngOnChanges = function (changes) {
        this._onChanges(changes);
    };
    /**
     * @param {?} changes
     * @param {?=} callValueAccessorOnValueChange
     * @return {?}
     */
    MdcSliderDirective.prototype._onChanges = function (changes, callValueAccessorOnValueChange) {
        if (callValueAccessorOnValueChange === void 0) { callValueAccessorOnValueChange = true; }
        if (this._initialized) {
            if (this.isChanged('isDiscrete', changes) || this.isChanged('hasMarkers', changes)) {
                for (var _i = 0, _a = this._interactionHandlers; _i < _a.length; _i++) {
                    var handlerInfo = _a[_i];
                    // workaround for uspstream bug: https://github.com/material-components/material-components-web/issues/1429
                    this._registry.unlisten(handlerInfo.type, handlerInfo.handler);
                }
                this._interactionHandlers = [];
                this.foundation.destroy();
                this.initElements();
                this.initDefaultAttributes();
                this.foundation = new slider.MDCSliderFoundation(this.mdcAdapter);
                this.foundation.init();
            }
            this.updateValues(changes, callValueAccessorOnValueChange);
            this.updateLayout();
        }
    };
    /**
     * @param {?} name
     * @param {?} changes
     * @return {?}
     */
    MdcSliderDirective.prototype.isChanged = function (name, changes) {
        return changes[name] && changes[name].currentValue !== changes[name].previousValue;
    };
    /**
     * @return {?}
     */
    MdcSliderDirective.prototype.initElements = function () {
        // initElements is also called when changes dictate a new Foundation initialization,
        // in which case we create new child elements:
        while (this._root.nativeElement.firstChild)
            this._rndr.removeChild(this._root.nativeElement, this._root.nativeElement.firstChild);
        var /** @type {?} */ elmTrackContainer = this.addElement(this._root.nativeElement, 'div', ['mdc-slider__track-container']);
        this._elmTrack = this.addElement(elmTrackContainer, 'div', ['mdc-slider__track']);
        if (this._discrete && this._markers)
            this._elmTrackMarkerCntr = this.addElement(elmTrackContainer, 'div', ['mdc-slider__track-marker-container']);
        else
            this._elmTrackMarkerCntr = null;
        this._elmThumbCntr = this.addElement(this._root.nativeElement, 'div', ['mdc-slider__thumb-container']);
        if (this._discrete) {
            this._elmSliderPin = this.addElement(this._elmThumbCntr, 'div', ['mdc-slider__pin']);
            this._elmValueMarker = this.addElement(this._elmSliderPin, 'div', ['mdc-slider__pin-value-marker']);
        }
        else {
            this._elmSliderPin = null;
            this._elmValueMarker = null;
        }
        var /** @type {?} */ svg = this._rndr.createElement('svg', 'svg');
        this._rndr.addClass(svg, 'mdc-slider__thumb');
        this._rndr.setAttribute(svg, 'width', '21');
        this._rndr.setAttribute(svg, 'height', '21');
        this._rndr.appendChild(this._elmThumbCntr, svg);
        var /** @type {?} */ circle = this._rndr.createElement('circle', 'svg');
        this._rndr.setAttribute(circle, 'cx', '10.5');
        this._rndr.setAttribute(circle, 'cy', '10.5');
        this._rndr.setAttribute(circle, 'r', '7.875');
        this._rndr.appendChild(svg, circle);
        this.addElement(this._elmThumbCntr, 'div', ['mdc-slider__focus-ring']);
    };
    /**
     * @param {?} parent
     * @param {?} element
     * @param {?} classNames
     * @return {?}
     */
    MdcSliderDirective.prototype.addElement = function (parent, element, classNames) {
        var _this = this;
        var /** @type {?} */ child = this._rndr.createElement(element);
        classNames.forEach(function (name) {
            _this._rndr.addClass(child, name);
        });
        this._rndr.appendChild(parent, child);
        return child;
    };
    /**
     * @return {?}
     */
    MdcSliderDirective.prototype.initDefaultAttributes = function () {
        if (this._reinitTabIndex)
            // value was set the first time we initialized the foundation,
            // so it should also be set when we reinitialize evrything:
            this._root.nativeElement.tabIndex = this._reinitTabIndex;
        else if (!this._root.nativeElement.hasAttribute('tabindex')) {
            // unless overridden by another tabIndex, we want sliders to
            // participate in tabbing (the foundation will remove the tabIndex
            // when the slider is disabled, reset to the initial value when enabled again):
            this._root.nativeElement.tabIndex = 0;
            this._reinitTabIndex = 0;
        }
        else {
            this._reinitTabIndex = this._root.nativeElement.tabIndex;
        }
    };
    /**
     * @param {?} changes
     * @param {?} callValueAccessorOnChange
     * @return {?}
     */
    MdcSliderDirective.prototype.updateValues = function (changes, callValueAccessorOnChange) {
        var _this = this;
        if (this._discrete && this._step < 1) {
            // See https://github.com/material-components/material-components-web/issues/1426
            // mdc-slider doesn't allow a discrete step value < 1 currently:
            this._step = 1;
            setTimeout(function () { _this.stepValueChange.emit(_this._step); }, 0);
        }
        else if (this._step < 0) {
            this._step = 0;
            setTimeout(function () { _this.stepValueChange.emit(_this._step); }, 0);
        }
        if (this._min > this._max) {
            if (this.isChanged('maxValue', changes)) {
                this._min = this._max;
                setTimeout(function () { _this.minValueChange.emit(_this._min); }, 0);
            }
            else {
                this._max = this._min;
                setTimeout(function () { _this.maxValueChange.emit(_this._max); }, 0);
            }
        }
        var /** @type {?} */ oldValue = changes['value'] ? changes['value'].previousValue : this._value;
        if (this._value < this._min)
            this._value = this._min;
        if (this._value > this._max)
            this._value = this._max;
        // find an order in which the changed values will be accepted by the foundation
        // (since the foundation will throw errors for min > max and other conditions):
        if (this._min < this.foundation.getMax()) {
            this.foundation.setMin(this._min);
            this.foundation.setMax(this._max);
        }
        else {
            this.foundation.setMax(this._max);
            this.foundation.setMin(this._min);
        }
        this.foundation.setStep(this._step);
        if (this.foundation.isDisabled() !== this._disabled) {
            // without this check, MDCFoundation may remove the tabIndex incorrectly,
            // preventing the slider from getting focus on keyboard commands:
            this.foundation.setDisabled(this._disabled);
        }
        this.foundation.setValue(this._value);
        // value may have changed during setValue(), due to step settings:
        this._value = this.foundation.getValue();
        if (oldValue !== this._value)
            setTimeout(function () { _this.notifyValueChanged(callValueAccessorOnChange); }, 0);
    };
    /**
     * @return {?}
     */
    MdcSliderDirective.prototype.updateLayout = function () {
        var /** @type {?} */ newWidth = this.mdcAdapter.computeBoundingRect().width;
        if (newWidth !== this._lastWidth) {
            this._lastWidth = newWidth;
            this.foundation.layout();
        }
    };
    /**
     * @param {?} callValueAccessorOnChange
     * @return {?}
     */
    MdcSliderDirective.prototype.notifyValueChanged = function (callValueAccessorOnChange) {
        this.valueChange.emit(this._value);
        if (callValueAccessorOnChange)
            this._onChange(this._value);
    };
    /**
     * \@docs-private
     * @param {?} onChange
     * @return {?}
     */
    MdcSliderDirective.prototype.registerOnChange = function (onChange) {
        this._onChange = onChange;
    };
    /**
     * \@docs-private
     * @param {?} onTouched
     * @return {?}
     */
    MdcSliderDirective.prototype.registerOnTouched = function (onTouched) {
        this._onTouched = onTouched;
    };
    Object.defineProperty(MdcSliderDirective.prototype, "isDiscrete", {
        /**
         * Make the slider discrete. Note from the wrapped <code>mdc-slider</code>
        component:
        <blockquote>If a slider contains a step value it does not mean that the slider is a "discrete" slider.
        "Discrete slider" is a UX treatment, while having a step value is behavioral.</blockquote>
         * @return {?}
         */
        get: function () {
            return this._discrete;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._discrete = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSliderDirective.prototype, "hasMarkers", {
        /**
         * Property to enable/disable the display of track markers. Display markers
        are only supported for discrete sliders. Thus they are only shown when the values
        of both hasMarkers and isDiscrete equal true.
         * @return {?}
         */
        get: function () {
            return this._markers;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._markers = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSliderDirective.prototype, "value", {
        /**
         * The current value of the slider.
         * @return {?}
         */
        get: function () {
            return this._value;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._value = +value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSliderDirective.prototype, "minValue", {
        /**
         * The minumum allowed value of the slider.
         * @return {?}
         */
        get: function () {
            return this._min;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._min = +value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSliderDirective.prototype, "maxValue", {
        /**
         * The maximum allowed value of the slider.
         * @return {?}
         */
        get: function () {
            return this._max;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._max = +value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSliderDirective.prototype, "stepValue", {
        /**
         * Set the step value (or set to 0 for no step value).
        The step value can be a floating point value &gt;= 0.
        The slider will quantize all values to match the step value, except for the minimum and
        maximum, which can always be set.
        Discrete sliders are required to have a step value other than 0.
        Note from the wrapped <code>mdc-slider</code> component:
        <blockquote>If a slider contains a step value it does not mean that the slider is a "discrete" slider.
        "Discrete slider" is a UX treatment, while having a step value is behavioral.</blockquote>
         * @return {?}
         */
        get: function () {
            return this._step;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._step = +value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSliderDirective.prototype, "disabled", {
        /**
         * A property to disable the slider.
         * @return {?}
         */
        get: function () {
            return this._disabled;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._disabled = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    MdcSliderDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcSlider]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcSliderDirective.ctorParameters = function () { return [
        { type: core.Renderer2, },
        { type: core.ElementRef, },
        { type: MdcEventRegistry, },
    ]; };
    MdcSliderDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-slider',] },],
        '_role': [{ type: core.HostBinding, args: ['attr.role',] },],
        'valueChange': [{ type: core.Output },],
        'minValueChange': [{ type: core.Output },],
        'maxValueChange': [{ type: core.Output },],
        'stepValueChange': [{ type: core.Output },],
        'isDiscrete': [{ type: core.Input }, { type: core.HostBinding, args: ['class.mdc-slider--discrete',] },],
        'hasMarkers': [{ type: core.Input }, { type: core.HostBinding, args: ['class.mdc-slider--display-markers',] },],
        'value': [{ type: core.Input }, { type: core.HostBinding, args: ['attr.aria-valuenow',] },],
        'minValue': [{ type: core.Input }, { type: core.HostBinding, args: ['attr.aria-valuemin',] },],
        'maxValue': [{ type: core.Input }, { type: core.HostBinding, args: ['attr.aria-valuemax',] },],
        'stepValue': [{ type: core.Input },],
        'disabled': [{ type: core.Input }, { type: core.HostBinding, args: ['attr.aria-disabled',] },],
    };
    return MdcSliderDirective;
}());
/**
 * Directive for adding Angular Forms (<code>ControlValueAccessor</code>) behavior to an
<code>MdcSliderDirective</code>. Allows the use of the Angular Forms API with
icon toggles, e.g. binding to <code>[(ngModel)]</code>, form validation, etc.
 */
var MdcFormsSliderDirective = (function () {
    /**
     * @param {?} mdcSlider
     */
    function MdcFormsSliderDirective(mdcSlider) {
        this.mdcSlider = mdcSlider;
    }
    /**
     * \@docs-private
     * @param {?} obj
     * @return {?}
     */
    MdcFormsSliderDirective.prototype.writeValue = function (obj) {
        var /** @type {?} */ change = new core.SimpleChange(this.mdcSlider.value, +obj, false);
        this.mdcSlider.value = obj;
        this.mdcSlider._onChanges({ value: change }, false);
    };
    /**
     * \@docs-private
     * @param {?} onChange
     * @return {?}
     */
    MdcFormsSliderDirective.prototype.registerOnChange = function (onChange) {
        this.mdcSlider.registerOnChange(onChange);
    };
    /**
     * \@docs-private
     * @param {?} onTouched
     * @return {?}
     */
    MdcFormsSliderDirective.prototype.registerOnTouched = function (onTouched) {
        this.mdcSlider.registerOnTouched(onTouched);
    };
    /**
     * \@docs-private
     * @param {?} disabled
     * @return {?}
     */
    MdcFormsSliderDirective.prototype.setDisabledState = function (disabled) {
        this.mdcSlider.disabled = disabled;
    };
    MdcFormsSliderDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcSlider][formControlName],[mdcSlider][formControl],[mdcSlider][ngModel]',
                    providers: [
                        { provide: forms.NG_VALUE_ACCESSOR, useExisting: core.forwardRef(function () { return MdcFormsSliderDirective; }), multi: true }
                    ]
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcFormsSliderDirective.ctorParameters = function () { return [
        { type: MdcSliderDirective, decorators: [{ type: core.Self },] },
    ]; };
    return MdcFormsSliderDirective;
}());

var CLASS_ACTIVE = 'mdc-snackbar--active';
var CLASS_ALIGN_START = 'mdc-snackbar--align-start';
/**
 * This class provides information about a posted snackbar message.
It can also be used to subscribe to action clicks.
 */
var MdcSnackbarRef = (function () {
    /**
     * @param {?} _action
     */
    function MdcSnackbarRef(_action) {
        this._action = _action;
    }
    /**
     * Subscribe to this observable to be informed when a user clicks the action
    for the shown snackbar. Note that the observable will complete when the snackbar
    disappears from screen, so there is no need to unsubscribe.
     * @return {?}
     */
    MdcSnackbarRef.prototype.action = function () {
        return this._action.asObservable();
    };
    return MdcSnackbarRef;
}());
/**
 * A service for showing spec-aligned material design snackbar/toast messages.
 */
var MdcSnackbarService = (function () {
    function MdcSnackbarService() {
        this.snackbar = null;
        this.root = null;
        this.isActive = false;
        this.postedMessages = 0;
        this.lastActivated = -1;
        this.lastDismissed = -1;
        this.closeMessage = new Subject.Subject();
    }
    /**
     * @return {?}
     */
    MdcSnackbarService.prototype.initHtml = function () {
        if (!this.snackbar) {
            this.root = document.createElement('div');
            this.root.classList.add('mdc-snackbar');
            this.root.setAttribute('aria-live', 'assertive');
            this.root.setAttribute('aria-atomic', 'true');
            this.root.setAttribute('aria-hidden', 'true');
            var /** @type {?} */ snackbarText = document.createElement('div');
            snackbarText.classList.add('mdc-snackbar__text');
            this.root.appendChild(snackbarText);
            var /** @type {?} */ snackbarAction = document.createElement('div');
            snackbarAction.classList.add('mdc-snackbar__action-wrapper');
            this.root.appendChild(snackbarAction);
            var /** @type {?} */ snackbarActionButton = document.createElement('button');
            snackbarActionButton.classList.add('mdc-snackbar__action-button');
            snackbarActionButton.setAttribute('type', 'button');
            snackbarAction.appendChild(snackbarActionButton);
            document.body.appendChild(this.root);
            this.snackbar = new snackbar.MDCSnackbar(this.root, this.getFoundation(this.root));
        }
    };
    /**
     * @param {?} root
     * @return {?}
     */
    MdcSnackbarService.prototype.getFoundation = function (root) {
        var _this = this;
        var /** @type {?} */ textEl = root.querySelector('.mdc-snackbar__text');
        var /** @type {?} */ buttonEl = (root.querySelector('.mdc-snackbar__action-button'));
        var /** @type {?} */ adapter = {
            addClass: function (className) {
                if (className === CLASS_ACTIVE)
                    _this.activateNext();
                root.classList.add(className);
            },
            removeClass: function (className) {
                if (className === 'mdc-snackbar--active')
                    _this.deactivateLast();
                root.classList.remove(className);
            },
            setAriaHidden: function () { return root.setAttribute('aria-hidden', 'true'); },
            unsetAriaHidden: function () { return root.removeAttribute('aria-hidden'); },
            setActionAriaHidden: function () { return buttonEl.setAttribute('aria-hidden', 'true'); },
            unsetActionAriaHidden: function () { return buttonEl.removeAttribute('aria-hidden'); },
            setActionText: function (text) { buttonEl.textContent = text; },
            setMessageText: function (text) { textEl.textContent = text; },
            setFocus: function () { return buttonEl.focus(); },
            visibilityIsHidden: function () { return document.hidden; },
            registerCapturedBlurHandler: function (handler) { return buttonEl.addEventListener('blur', handler, true); },
            deregisterCapturedBlurHandler: function (handler) { return buttonEl.removeEventListener('blur', handler, true); },
            registerVisibilityChangeHandler: function (handler) { return document.addEventListener('visibilitychange', handler); },
            deregisterVisibilityChangeHandler: function (handler) { return document.removeEventListener('visibilitychange', handler); },
            registerCapturedInteractionHandler: function (evt, handler) { return document.body.addEventListener(evt, handler, true); },
            deregisterCapturedInteractionHandler: function (evt, handler) { return document.body.removeEventListener(evt, handler, true); },
            registerActionClickHandler: function (handler) { return buttonEl.addEventListener('click', handler); },
            deregisterActionClickHandler: function (handler) { return buttonEl.removeEventListener('click', handler); },
            registerTransitionEndHandler: function (handler) { return root.addEventListener(animation.getCorrectEventName(window, 'transitionend'), handler); },
            deregisterTransitionEndHandler: function (handler) { return root.removeEventListener(animation.getCorrectEventName(window, 'transitionend'), handler); }
        };
        return new snackbar.MDCSnackbarFoundation(adapter);
    };
    /**
     * @return {?}
     */
    MdcSnackbarService.prototype.activateNext = function () {
        while (this.lastDismissed < this.lastActivated)
            // since this activates a new message, all messages before will logically be closed:
            this.closeMessage.next(++this.lastDismissed);
        ++this.lastActivated;
        this.isActive = true;
    };
    /**
     * @return {?}
     */
    MdcSnackbarService.prototype.deactivateLast = function () {
        if (this.isActive) {
            ++this.lastDismissed;
            this.isActive = false;
            this.closeMessage.next(this.lastDismissed);
        }
    };
    /**
     * Show a snackbar/toast message. If a snackbar message is already showing, the new
    message will be queued to show after earlier message have been shown.
    The returned <code>MdcSnackbarRef</code> provides methods to subscribe to action clicks.
    
    \@param message Queue a snackbar message to show.
     * @param {?} message
     * @return {?}
     */
    MdcSnackbarService.prototype.show = function (message) {
        // make sure data passes precondition checks in foundation,
        // or our counters will not be right after snackbar.show throws exception:
        if (!message)
            throw new Error('snackbar message called with no data');
        if (!message.message)
            throw new Error('snackbar message is missing the actual message text');
        this.initHtml();
        var /** @type {?} */ messageNr = this.postedMessages++;
        var /** @type {?} */ data = {
            message: message.message,
            actionText: message.actionText,
            multiline: message.multiline,
            actionOnBottom: message.actionOnBottom,
            timeout: message.timeout
        };
        // provide a means to subscribe to an action click:
        var /** @type {?} */ action = new Subject.Subject();
        if (message.actionText)
            data.actionHandler = function () { action.next(); };
        // make sure the action Subject will complete after the snackbar is removed from screen,
        // so that callers never have to unsubscribe:
        this.closeMessage.asObservable().pipe(filter.filter(function (nr) { return nr === messageNr; }), take.take(1)).subscribe(function (nr) {
            action.complete();
        });
        // show the actual snackbar:
        this.snackbar.show(data);
        return new MdcSnackbarRef(action);
    };
    Object.defineProperty(MdcSnackbarService.prototype, "startAligned", {
        /**
         * Set this property to true to show snackbars start-aligned instead of center-aligned. Desktop and tablet only.
         * @return {?}
         */
        get: function () {
            return this.snackbar ? this.root.classList.contains(CLASS_ALIGN_START) : false;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.initHtml();
            if (value)
                this.root.classList.add(CLASS_ALIGN_START);
            else
                this.root.classList.remove(CLASS_ALIGN_START);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSnackbarService.prototype, "dismissesOnAction", {
        /**
         * By default the snackbar will be dimissed when the user presses the action button.
        If you want the snackbar to remain visible until the timeout is reached (regardless of
        whether the user pressed the action button or not) you can set the dismissesOnAction
        property to false.
         * @return {?}
         */
        get: function () {
            return this.snackbar ? this.snackbar.dismissesOnAction : true;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.initHtml();
            this.snackbar.dismissesOnAction = value;
        },
        enumerable: true,
        configurable: true
    });
    MdcSnackbarService.decorators = [
        { type: core.Injectable },
    ];
    /**
     * @nocollapse
     */
    MdcSnackbarService.ctorParameters = function () { return []; };
    return MdcSnackbarService;
}());
/**
 * \@docs-private
 * @param {?} parent
 * @return {?}
 */
function MDC_SNACKBAR_PROVIDER_FACTORY(parent) {
    return parent || new MdcSnackbarService();
}
/**
 * \@docs-private
 */
var MDC_SNACKBAR_PROVIDER = {
    provide: MdcSnackbarService,
    deps: [[new core.Optional(), new core.SkipSelf(), MdcSnackbarService]],
    useFactory: MDC_SNACKBAR_PROVIDER_FACTORY
};

/**
 * Directive for the input element of an <code>MdcSwitchDirective</code>.
 */
var MdcSwitchInputDirective = (function (_super) {
    tslib_1.__extends(MdcSwitchInputDirective, _super);
    /**
     * @param {?} _elm
     * @param {?} _cntr
     */
    function MdcSwitchInputDirective(_elm, _cntr) {
        var _this = _super.call(this) || this;
        _this._elm = _elm;
        _this._cntr = _cntr;
        _this._cls = true;
        _this._disabled = false;
        return _this;
    }
    Object.defineProperty(MdcSwitchInputDirective.prototype, "id", {
        /**
         * \@docs-private
         * @return {?}
         */
        get: function () {
            return this._id;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcSwitchInputDirective.prototype, "disabled", {
        /**
         * \@docs-private
         * @return {?}
         */
        get: function () {
            return this._cntr ? this._cntr.disabled : this._disabled;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._disabled = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    MdcSwitchInputDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'input[mdcSwitchInput][type=checkbox]',
                    providers: [{ provide: AbstractMdcInput, useExisting: core.forwardRef(function () { return MdcSwitchInputDirective; }) }]
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcSwitchInputDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: forms.NgControl, decorators: [{ type: core.Optional }, { type: core.Self },] },
    ]; };
    MdcSwitchInputDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-switch__native-control',] },],
        'id': [{ type: core.HostBinding }, { type: core.Input },],
        'disabled': [{ type: core.HostBinding }, { type: core.Input },],
    };
    return MdcSwitchInputDirective;
}(AbstractMdcInput));
/**
 * Directive for creating a Material Design switch component. The switch is driven by an
underlying native checkbox input, which must use the <code>MdcSwitchInputDirective</code>
directive.
The current implementation will add all other required DOM elements (such as the
background).
Future implementations will also support supplying (customized) background
elements.
</p><p>
This directive can be used together with an <code>mdcFormField</code> to
easily position switches and their labels, see
<a href="#/directives/form-field">mdcFormField</a>.
 */
var MdcSwitchDirective = (function () {
    /**
     * @param {?} rndr
     * @param {?} root
     */
    function MdcSwitchDirective(rndr, root) {
        this.rndr = rndr;
        this.root = root;
        this._cls = true;
    }
    /**
     * @return {?}
     */
    MdcSwitchDirective.prototype.ngAfterContentInit = function () {
        this.addBackground();
    };
    /**
     * @return {?}
     */
    MdcSwitchDirective.prototype.addBackground = function () {
        var /** @type {?} */ knob = this.rndr.createElement('div');
        this.rndr.addClass(knob, 'mdc-switch__knob');
        var /** @type {?} */ bg = this.rndr.createElement('div');
        this.rndr.addClass(bg, 'mdc-switch__background');
        this.rndr.appendChild(bg, knob);
        this.rndr.appendChild(this.root.nativeElement, bg);
    };
    Object.defineProperty(MdcSwitchDirective.prototype, "_disabled", {
        /**
         * @return {?}
         */
        get: function () {
            return this._input == null || this._input.disabled;
        },
        enumerable: true,
        configurable: true
    });
    MdcSwitchDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcSwitch]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcSwitchDirective.ctorParameters = function () { return [
        { type: core.Renderer2, },
        { type: core.ElementRef, },
    ]; };
    MdcSwitchDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-switch',] },],
        '_input': [{ type: core.ContentChild, args: [MdcSwitchInputDirective,] },],
        '_disabled': [{ type: core.HostBinding, args: ['class.mdc-switch--disabled',] },],
    };
    return MdcSwitchDirective;
}());

var MdcTabIconDirective = (function () {
    function MdcTabIconDirective() {
        this._hostClass = true;
    }
    MdcTabIconDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcTabIcon]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcTabIconDirective.ctorParameters = function () { return []; };
    MdcTabIconDirective.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.mdc-tab__icon',] },],
    };
    return MdcTabIconDirective;
}());
var MdcTabIconTextDirective = (function () {
    function MdcTabIconTextDirective() {
        this._hostClass = true;
    }
    MdcTabIconTextDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcTabIconText]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcTabIconTextDirective.ctorParameters = function () { return []; };
    MdcTabIconTextDirective.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.mdc-tab__icon-text',] },],
    };
    return MdcTabIconTextDirective;
}());
var AbstractMdcTabDirective = (function (_super) {
    tslib_1.__extends(AbstractMdcTabDirective, _super);
    /**
     * @param {?} _rndr
     * @param {?} _root
     * @param {?} _registry
     */
    function AbstractMdcTabDirective(_rndr, _root, _registry) {
        var _this = _super.call(this, _root, _rndr, _registry) || this;
        _this._rndr = _rndr;
        _this._root = _root;
        _this._registry = _registry;
        _this._hostClass = true;
        _this.activate = new core.EventEmitter();
        _this._adapter = {
            addClass: function (className) { return _this._rndr.addClass(_this._root.nativeElement, className); },
            removeClass: function (className) { return _this._rndr.removeClass(_this._root.nativeElement, className); },
            registerInteractionHandler: function (type, handler) { return _this._registry.listen(_this._rndr, type, handler, _this._root); },
            deregisterInteractionHandler: function (type, handler) { return _this._registry.unlisten(type, handler); },
            getOffsetWidth: function () { return _this._root.nativeElement.offsetWidth; },
            getOffsetLeft: function () { return _this._root.nativeElement.offsetLeft; },
            notifySelected: function () { return _this.activate.emit({ tab: _this, tabIndex: null }); }
        };
        _this._foundation = new tabs.MDCTabFoundation(_this._adapter);
        return _this;
    }
    /**
     * @return {?}
     */
    AbstractMdcTabDirective.prototype.ngAfterContentInit = function () {
        this.initRipple();
        this._foundation.init();
    };
    /**
     * @return {?}
     */
    AbstractMdcTabDirective.prototype.ngOnDestroy = function () {
        this.destroyRipple();
        this._foundation.destroy();
    };
    Object.defineProperty(AbstractMdcTabDirective.prototype, "_tabWithIconAndText", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mdcTabIcon != null && this._mdcTabIconText != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractMdcTabDirective.prototype, "_active", {
        /**
         * @return {?}
         */
        get: function () {
            return this._foundation.isActive();
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._foundation.setActive(value);
        },
        enumerable: true,
        configurable: true
    });
    AbstractMdcTabDirective.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.mdc-tab',] },],
        '_mdcTabIcon': [{ type: core.ContentChild, args: [MdcTabIconDirective,] },],
        '_mdcTabIconText': [{ type: core.ContentChild, args: [MdcTabIconTextDirective,] },],
        'activate': [{ type: core.Output },],
        '_tabWithIconAndText': [{ type: core.HostBinding, args: ['class.mdc-tab--with-icon-and-text',] },],
        '_active': [{ type: core.HostBinding, args: ['class.mdc-tab--active',] },],
    };
    return AbstractMdcTabDirective;
}(AbstractMdcRipple));
var MdcTabDirective = (function (_super) {
    tslib_1.__extends(MdcTabDirective, _super);
    /**
     * @param {?} rndr
     * @param {?} root
     * @param {?} registry
     */
    function MdcTabDirective(rndr, root, registry) {
        return _super.call(this, rndr, root, registry) || this;
    }
    Object.defineProperty(MdcTabDirective.prototype, "isActive", {
        /**
         * @return {?}
         */
        get: function () {
            return this._active;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var /** @type {?} */ activate = asBoolean(value);
            if (activate) {
                this._active = true;
                this._adapter.notifySelected();
            }
        },
        enumerable: true,
        configurable: true
    });
    MdcTabDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcTab]',
                    providers: [{ provide: AbstractMdcTabDirective, useExisting: core.forwardRef(function () { return MdcTabDirective; }) }]
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcTabDirective.ctorParameters = function () { return [
        { type: core.Renderer2, },
        { type: core.ElementRef, },
        { type: MdcEventRegistry, },
    ]; };
    MdcTabDirective.propDecorators = {
        'isActive': [{ type: core.Input },],
    };
    return MdcTabDirective;
}(AbstractMdcTabDirective));

var MdcTabRouterDirective = (function (_super) {
    tslib_1.__extends(MdcTabRouterDirective, _super);
    /**
     * @param {?} rndr
     * @param {?} root
     * @param {?} registry
     * @param {?} router
     * @param {?} cdr
     */
    function MdcTabRouterDirective(rndr, root, registry, router$$1, cdr) {
        var _this = _super.call(this, rndr, root, registry) || this;
        _this.router = router$$1;
        _this.cdr = cdr;
        _this.onDestroy$ = new Subject.Subject();
        router$$1.events.pipe(takeUntil.takeUntil(_this.onDestroy$)).subscribe(function (s) {
            if (s instanceof router.NavigationEnd) {
                _this.update();
            }
        });
        return _this;
    }
    /**
     * @return {?}
     */
    MdcTabRouterDirective.prototype.ngOnDestroy = function () {
        this.onDestroy$.next();
        this.onDestroy$.complete();
        _super.prototype.ngOnDestroy.call(this);
    };
    /**
     * @return {?}
     */
    MdcTabRouterDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        _super.prototype.ngAfterContentInit.call(this);
        this._links.changes.subscribe(function (_) { return _this.update(); });
        this._linksWithHrefs.changes.subscribe(function (_) { return _this.update(); });
        this.update();
    };
    /**
     * @return {?}
     */
    MdcTabRouterDirective.prototype.ngAfterViewInit = function () {
        this.update();
    };
    Object.defineProperty(MdcTabRouterDirective.prototype, "isActive", {
        /**
         * @return {?}
         */
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MdcTabRouterDirective.prototype.update = function () {
        if (!this._links || !this._linksWithHrefs || !this.router.navigated)
            return;
        var /** @type {?} */ hasActiveLinks = this.hasActiveLinks();
        var /** @type {?} */ active = this._active;
        if (active !== hasActiveLinks) {
            this._active = hasActiveLinks;
            if (this._active) {
                this._adapter.notifySelected();
            }
        }
    };
    /**
     * @return {?}
     */
    MdcTabRouterDirective.prototype.hasActiveLinks = function () {
        return this._links.some(this.isLinkActive(this.router)) || this._linksWithHrefs.some(this.isLinkActive(this.router));
    };
    /**
     * @param {?} router
     * @return {?}
     */
    MdcTabRouterDirective.prototype.isLinkActive = function (router$$1) {
        return function (link) { return router$$1.isActive(link.urlTree, false); };
    };
    MdcTabRouterDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcTabRouter]',
                    exportAs: 'mdcTabRouter',
                    providers: [{ provide: AbstractMdcTabDirective, useExisting: core.forwardRef(function () { return MdcTabRouterDirective; }) }]
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcTabRouterDirective.ctorParameters = function () { return [
        { type: core.Renderer2, },
        { type: core.ElementRef, },
        { type: MdcEventRegistry, },
        { type: router.Router, },
        { type: core.ChangeDetectorRef, },
    ]; };
    MdcTabRouterDirective.propDecorators = {
        '_links': [{ type: core.ContentChildren, args: [router.RouterLink, { descendants: true },] },],
        '_linksWithHrefs': [{ type: core.ContentChildren, args: [router.RouterLinkWithHref, { descendants: true },] },],
    };
    return MdcTabRouterDirective;
}(AbstractMdcTabDirective));

var CLASS_TAB_BAR = 'mdc-tab-bar';
var CLASS_INDICATOR = 'mdc-tab-bar__indicator';
var CLASS_ICONS_BAR = 'mdc-tab-bar--icon-tab-bar';
var CLASS_ICONS_WITH_TEXT_BAR = 'mdc-tab-bar--icons-with-text';
var MdcTabBarDirective = (function () {
    /**
     * @param {?} _rndr
     * @param {?} _el
     * @param {?} registry
     */
    function MdcTabBarDirective(_rndr, _el, registry) {
        var _this = this;
        this._rndr = _rndr;
        this._el = _el;
        this.registry = registry;
        this._hostClass = true;
        this._insideScrollFrame = false;
        this.tabChange = new core.EventEmitter();
        this._adapter = {
            addClass: function (className) { return _this._rndr.addClass(_this._el.nativeElement, className); },
            removeClass: function (className) { return _this._rndr.removeClass(_this._el.nativeElement, className); },
            bindOnMDCTabSelectedEvent: function () { return _this._listenTabSelected(); },
            unbindOnMDCTabSelectedEvent: function () { return _this._unlistenTabSelected(); },
            registerResizeHandler: function (handler) { return window.addEventListener('resize', handler); },
            deregisterResizeHandler: function (handler) { return window.removeEventListener('resize', handler); },
            getOffsetWidth: function () { return _this._el.nativeElement.offsetWidth; },
            setStyleForIndicator: function (propertyName, value) { return _this._rndr.setStyle(_this._indicator, propertyName, value); },
            getOffsetWidthForIndicator: function () { return _this._indicator.offsetWidth; },
            notifyChange: function (evtData) {
                _this.tabChange.emit({ tab: null, tabIndex: evtData.activeTabIndex });
            },
            getNumberOfTabs: function () { return _this._tabs.length; },
            isTabActiveAtIndex: function (index) { return index >= 0 ? _this._tabs.toArray()[index]._active : false; },
            setTabActiveAtIndex: function (index, isActive) {
                if (isActive === void 0) { isActive = true; }
                return _this._tabs.toArray()[index]._active = isActive;
            },
            isDefaultPreventedOnClickForTabAtIndex: function (index) { return !!_this._tabs.toArray()[index]._foundation.preventsDefaultOnClick; },
            setPreventDefaultOnClickForTabAtIndex: function (index, preventDefaultOnClick) { return _this._tabs.toArray()[index]._foundation.setPreventDefaultOnClick(preventDefaultOnClick); },
            measureTabAtIndex: function (index) { return _this._tabs.toArray()[index]._foundation.measureSelf(); },
            getComputedWidthForTabAtIndex: function (index) { return _this._tabs.toArray()[index]._foundation.getComputedWidth(); },
            getComputedLeftForTabAtIndex: function (index) { return _this._tabs.toArray()[index]._foundation.getComputedLeft(); }
        };
        this._foundation = new tabs.MDCTabBarFoundation(this._adapter);
    }
    /**
     * @return {?}
     */
    MdcTabBarDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._tabs.changes.subscribe(function () {
            if (_this._subscriptions)
                // make sure we update the tab change event subscriptions:
                _this._listenTabSelected();
        });
        this.addIndicator();
        this._foundation.init();
    };
    /**
     * @return {?}
     */
    MdcTabBarDirective.prototype.ngOnDestroy = function () {
        this._foundation.destroy();
    };
    /**
     * @return {?}
     */
    MdcTabBarDirective.prototype.addIndicator = function () {
        this._indicator = this._rndr.createElement('span');
        this._rndr.addClass(this._indicator, CLASS_INDICATOR);
        this._rndr.appendChild(this._el.nativeElement, this._indicator);
    };
    /**
     * @return {?}
     */
    MdcTabBarDirective.prototype._listenTabSelected = function () {
        var _this = this;
        if (this._subscriptions)
            this._unlistenTabSelected();
        this._subscriptions = new Array();
        this._tabs.forEach(function (tab) {
            _this._subscriptions.push(tab.activate.subscribe(function (event) {
                _this._setActive(event.tab, true);
            }));
        });
    };
    /**
     * @return {?}
     */
    MdcTabBarDirective.prototype._unlistenTabSelected = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        this._subscriptions = null;
    };
    /**
     * @param {?} tab
     * @param {?} notifyChange
     * @return {?}
     */
    MdcTabBarDirective.prototype._setActive = function (tab, notifyChange) {
        var /** @type {?} */ index = this._tabs.toArray().indexOf(tab);
        this._foundation.switchToTabAtIndex(index, notifyChange);
    };
    Object.defineProperty(MdcTabBarDirective.prototype, "_tabBarWithIcon", {
        /**
         * @return {?}
         */
        get: function () {
            return this._tabs.length > 0
                && this._tabs.first._mdcTabIcon != null
                && this._tabs.first._mdcTabIconText == null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcTabBarDirective.prototype, "_tabBarWithIconAndText", {
        /**
         * @return {?}
         */
        get: function () {
            return this._tabs.length > 0
                && this._tabs.first._mdcTabIcon != null
                && this._tabs.first._mdcTabIconText != null;
        },
        enumerable: true,
        configurable: true
    });
    MdcTabBarDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcTabBar]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcTabBarDirective.ctorParameters = function () { return [
        { type: core.Renderer2, },
        { type: core.ElementRef, },
        { type: MdcEventRegistry, },
    ]; };
    MdcTabBarDirective.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.' + CLASS_TAB_BAR,] },],
        '_insideScrollFrame': [{ type: core.HostBinding, args: ['class.mdc-tab-bar-scroller__scroll-frame__tabs',] },],
        '_tabs': [{ type: core.ContentChildren, args: [AbstractMdcTabDirective, { descendants: false },] },],
        'tabChange': [{ type: core.Output },],
        '_tabBarWithIcon': [{ type: core.HostBinding, args: ['class.' + CLASS_ICONS_BAR,] },],
        '_tabBarWithIconAndText': [{ type: core.HostBinding, args: ['class.' + CLASS_ICONS_WITH_TEXT_BAR,] },],
    };
    return MdcTabBarDirective;
}());

var CLASS_SCROLLER = 'mdc-tab-bar-scroller';
var CLASS_INDICATOR$1 = 'mdc-tab-bar-scroller__indicator';
var CLASS_INDICATOR_INNER = 'mdc-tab-bar-scroller__indicator__inner';
var CLASS_INDICATOR_BACK = 'mdc-tab-bar-scroller__indicator--back';
var CLASS_INDICATOR_FORWARD = 'mdc-tab-bar-scroller__indicator--forward';
var CLASS_SCROLLER_FRAME = 'mdc-tab-bar-scroller__scroll-frame';
var MdcTabBarScrollerInnerDirective = (function () {
    function MdcTabBarScrollerInnerDirective() {
        this._hostClass = true;
    }
    MdcTabBarScrollerInnerDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcTabBarScrollerInner]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcTabBarScrollerInnerDirective.ctorParameters = function () { return []; };
    MdcTabBarScrollerInnerDirective.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.' + CLASS_INDICATOR_INNER,] },],
    };
    return MdcTabBarScrollerInnerDirective;
}());
var MdcTabBarScrollerBackDirective = (function () {
    /**
     * @param {?} _el
     */
    function MdcTabBarScrollerBackDirective(_el) {
        this._el = _el;
        this._hostClass = true;
        this._back = true;
    }
    MdcTabBarScrollerBackDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcTabBarScrollerBack]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcTabBarScrollerBackDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MdcTabBarScrollerBackDirective.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.' + CLASS_INDICATOR$1,] },],
        '_back': [{ type: core.HostBinding, args: ['class.' + CLASS_INDICATOR_BACK,] },],
    };
    return MdcTabBarScrollerBackDirective;
}());
var MdcTabBarScrollerForwardDirective = (function () {
    /**
     * @param {?} _el
     */
    function MdcTabBarScrollerForwardDirective(_el) {
        this._el = _el;
        this._hostClass = true;
        this._forward = true;
    }
    MdcTabBarScrollerForwardDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcTabBarScrollerForward]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcTabBarScrollerForwardDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MdcTabBarScrollerForwardDirective.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.' + CLASS_INDICATOR$1,] },],
        '_forward': [{ type: core.HostBinding, args: ['class.' + CLASS_INDICATOR_FORWARD,] },],
    };
    return MdcTabBarScrollerForwardDirective;
}());
var MdcTabBarScrollerFrameDirective = (function () {
    /**
     * @param {?} _el
     */
    function MdcTabBarScrollerFrameDirective(_el) {
        this._el = _el;
        this._hostClass = true;
    }
    /**
     * @return {?}
     */
    MdcTabBarScrollerFrameDirective.prototype.ngAfterContentInit = function () {
        if (this._tabBar)
            this._tabBar._insideScrollFrame = true;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    MdcTabBarScrollerFrameDirective.prototype._tabAt = function (index) {
        if (this._tabBar) {
            var /** @type {?} */ tabs$$1 = this._tabBar._tabs.toArray();
            if (index >= 0 && index < tabs$$1.length)
                return tabs$$1[index];
        }
        return null;
    };
    MdcTabBarScrollerFrameDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcTabBarScrollerFrame]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcTabBarScrollerFrameDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MdcTabBarScrollerFrameDirective.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.' + CLASS_SCROLLER_FRAME,] },],
        '_tabBar': [{ type: core.ContentChild, args: [MdcTabBarDirective,] },],
    };
    return MdcTabBarScrollerFrameDirective;
}());
var MdcTabBarScrollerDirective = (function () {
    /**
     * @param {?} _rndr
     * @param {?} _el
     * @param {?} registry
     */
    function MdcTabBarScrollerDirective(_rndr, _el, registry) {
        var _this = this;
        this._rndr = _rndr;
        this._el = _el;
        this.registry = registry;
        this._hostClass = true;
        this.direction = 'ltr';
        this._adapter = {
            addClass: function (className) { return _this._rndr.addClass(_this._el.nativeElement, className); },
            removeClass: function (className) { return _this._rndr.removeClass(_this._el.nativeElement, className); },
            eventTargetHasClass: function (target, className) { return target.classList.contains(className); },
            addClassToForwardIndicator: function (className) {
                if (_this._forward)
                    _this._rndr.addClass(_this._forward._el.nativeElement, className);
            },
            removeClassFromForwardIndicator: function (className) {
                if (_this._forward)
                    _this._rndr.removeClass(_this._forward._el.nativeElement, className);
            },
            addClassToBackIndicator: function (className) {
                if (_this._back)
                    _this._rndr.addClass(_this._back._el.nativeElement, className);
            },
            removeClassFromBackIndicator: function (className) {
                if (_this._back)
                    _this._rndr.removeClass(_this._back._el.nativeElement, className);
            },
            isRTL: function () { return _this.direction === 'rtl'; },
            registerBackIndicatorClickHandler: function (handler) {
                if (_this._back)
                    _this.registry.listen(_this._rndr, 'click', handler, _this._back._el);
            },
            deregisterBackIndicatorClickHandler: function (handler) {
                if (_this._back)
                    _this.registry.unlisten('click', handler);
            },
            registerForwardIndicatorClickHandler: function (handler) {
                if (_this._forward)
                    _this.registry.listen(_this._rndr, 'click', handler, _this._forward._el);
            },
            deregisterForwardIndicatorClickHandler: function (handler) {
                if (_this._forward)
                    _this.registry.unlisten('click', handler);
            },
            registerCapturedInteractionHandler: function (evt, handler) {
                _this.registry.listen(_this._rndr, evt, handler, _this._el);
            },
            deregisterCapturedInteractionHandler: function (evt, handler) {
                _this.registry.unlisten(evt, handler);
            },
            registerWindowResizeHandler: function (handler) { return window.addEventListener('resize', handler); },
            deregisterWindowResizeHandler: function (handler) { return window.removeEventListener('resize', handler); },
            getNumberOfTabs: function () {
                if (_this._scrollFrame && _this._scrollFrame._tabBar)
                    return _this._scrollFrame._tabBar._tabs.length;
                return 0;
            },
            getComputedWidthForTabAtIndex: function (index) { return _this._tabAt(index)._foundation.getComputedWidth(); },
            getComputedLeftForTabAtIndex: function (index) { return _this._tabAt(index)._foundation.getComputedLeft(); },
            getOffsetWidthForScrollFrame: function () {
                if (_this._scrollFrame)
                    return _this._scrollFrame._el.nativeElement.offsetWidth;
                return 0;
            },
            getScrollLeftForScrollFrame: function () {
                if (_this._scrollFrame)
                    return _this._scrollFrame._el.nativeElement.scrollLeft;
                return 0;
            },
            setScrollLeftForScrollFrame: function (scrollLeftAmount) {
                if (_this._scrollFrame)
                    _this._rndr.setProperty(_this._scrollFrame._el.nativeElement, 'scrollLeft', scrollLeftAmount);
            },
            getOffsetWidthForTabBar: function () {
                if (_this._scrollFrame && _this._scrollFrame._tabBar)
                    return _this._scrollFrame._tabBar._el.nativeElement.offsetWidth;
                return 0;
            },
            setTransformStyleForTabBar: function (value) {
                if (_this._scrollFrame && _this._scrollFrame._tabBar)
                    _this._rndr.setStyle(_this._scrollFrame._tabBar._el.nativeElement, animation.getCorrectPropertyName(window, 'transform'), value);
            },
            getOffsetLeftForEventTarget: function (target) { return target.offsetLeft; },
            getOffsetWidthForEventTarget: function (target) { return target.offsetWidth; }
        };
        this._foundation = new tabs.MDCTabBarScrollerFoundation(this._adapter);
    }
    /**
     * @return {?}
     */
    MdcTabBarScrollerDirective.prototype.ngAfterContentInit = function () {
        this._foundation.init();
    };
    /**
     * @return {?}
     */
    MdcTabBarScrollerDirective.prototype.ngOnDestroy = function () {
        this._foundation.destroy();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    MdcTabBarScrollerDirective.prototype._tabAt = function (index) {
        if (this._scrollFrame)
            return this._scrollFrame._tabAt(index);
        return null;
    };
    MdcTabBarScrollerDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcTabBarScroller]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcTabBarScrollerDirective.ctorParameters = function () { return [
        { type: core.Renderer2, },
        { type: core.ElementRef, },
        { type: MdcEventRegistry, },
    ]; };
    MdcTabBarScrollerDirective.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.' + CLASS_SCROLLER,] },],
        '_back': [{ type: core.ContentChild, args: [MdcTabBarScrollerBackDirective,] },],
        '_forward': [{ type: core.ContentChild, args: [MdcTabBarScrollerForwardDirective,] },],
        '_scrollFrame': [{ type: core.ContentChild, args: [MdcTabBarScrollerFrameDirective,] },],
        'direction': [{ type: core.Input },],
    };
    return MdcTabBarScrollerDirective;
}());

var CLASS_BOTTOM_LINE = 'mdc-text-field__bottom-line';
var nextId$1 = 1;
var MdcTextFieldInputDirective = (function (_super) {
    tslib_1.__extends(MdcTextFieldInputDirective, _super);
    /**
     * @param {?} _elm
     * @param {?} renderer
     * @param {?} _cntr
     */
    function MdcTextFieldInputDirective(_elm, renderer, _cntr) {
        var _this = _super.call(this) || this;
        _this._elm = _elm;
        _this.renderer = renderer;
        _this._cntr = _cntr;
        _this._onChange = function (value) { };
        _this._type = 'text';
        _this._disabled = false;
        _this._required = false;
        _this._focused = false;
        _this._hostClass = true;
        return _this;
    }
    /**
     * @return {?}
     */
    MdcTextFieldInputDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Force setter to be called in case id was not specified.
        this.id = this.id;
        if (this._cntr) {
            this._cntr.valueChanges.subscribe(function (value) {
                _this._onChange(value);
            });
        }
    };
    Object.defineProperty(MdcTextFieldInputDirective.prototype, "id", {
        /**
         * @return {?}
         */
        get: function () {
            return this._id;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._id = value || this._newId();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcTextFieldInputDirective.prototype, "disabled", {
        /**
         * @return {?}
         */
        get: function () {
            return this._cntr ? this._cntr.disabled : this._disabled;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._disabled = value != null && "" + value !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcTextFieldInputDirective.prototype, "required", {
        /**
         * @return {?}
         */
        get: function () {
            return this._required;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._required = value != null && "" + value !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcTextFieldInputDirective.prototype, "type", {
        /**
         * @return {?}
         */
        get: function () {
            return this._type;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._type = value || 'text';
            // Angular Input is not automatically set on the native input element:
            if (!this._isTextarea()) {
                try {
                    this.renderer.setProperty(this._elm.nativeElement, 'type', this._type);
                }
                catch (e) {
                    ((this.renderer)).setElementProperty(this._elm.nativeElement, 'type', this._type);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcTextFieldInputDirective.prototype, "value", {
        /**
         * \@docs-private
         * @return {?}
         */
        get: function () {
            return this._elm.nativeElement.value;
        },
        /**
         * \@docs-private
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._elm.nativeElement.value = value;
            this._onChange(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * \@docs-private
     * @return {?}
     */
    MdcTextFieldInputDirective.prototype.focus = function () {
        this._elm.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    MdcTextFieldInputDirective.prototype._onFocus = function () {
        this._focused = true;
    };
    /**
     * @return {?}
     */
    MdcTextFieldInputDirective.prototype._onBlur = function () {
        this._focused = false;
    };
    /**
     * @return {?}
     */
    MdcTextFieldInputDirective.prototype._onInput = function () {
        // Having a listener for input changes forces a change detection for each 'input' event.
        // Necessary in some edge cases.
    };
    Object.defineProperty(MdcTextFieldInputDirective.prototype, "valid", {
        /**
         * \@docs-private
         * @return {?}
         */
        get: function () {
            return this._cntr ? this._cntr.valid : ((this._elm.nativeElement)).validity.valid;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MdcTextFieldInputDirective.prototype._isBadInput = function () {
        return ((this._elm.nativeElement)).validity.badInput;
    };
    /**
     * @return {?}
     */
    MdcTextFieldInputDirective.prototype._isTextarea = function () {
        return this._elm.nativeElement.nodeName.toLowerCase() === 'textarea';
    };
    /**
     * @return {?}
     */
    MdcTextFieldInputDirective.prototype._newId = function () {
        this.cachedId = this.cachedId || "mdc-input-" + nextId$1++;
        return this.cachedId;
    };
    MdcTextFieldInputDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'input[mdcTextFieldInput], textarea[mdcTextFieldInput]',
                    providers: [{ provide: AbstractMdcInput, useExisting: core.forwardRef(function () { return MdcTextFieldInputDirective; }) }]
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcTextFieldInputDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.Renderer2, },
        { type: forms.NgControl, decorators: [{ type: core.Optional }, { type: core.Self },] },
    ]; };
    MdcTextFieldInputDirective.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.mdc-text-field__input',] },],
        'id': [{ type: core.HostBinding }, { type: core.Input },],
        'disabled': [{ type: core.HostBinding }, { type: core.Input },],
        'required': [{ type: core.HostBinding }, { type: core.Input },],
        'type': [{ type: core.Input },],
        '_onFocus': [{ type: core.HostListener, args: ['focus',] },],
        '_onBlur': [{ type: core.HostListener, args: ['blur',] },],
        '_onInput': [{ type: core.HostListener, args: ['input',] },],
    };
    return MdcTextFieldInputDirective;
}(AbstractMdcInput));
var MdcTextFieldIconDirective = (function () {
    /**
     * @param {?} _el
     */
    function MdcTextFieldIconDirective(_el) {
        this._el = _el;
        this._cls = true;
    }
    MdcTextFieldIconDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcTextFieldIcon]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcTextFieldIconDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MdcTextFieldIconDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-text-field__icon',] },],
    };
    return MdcTextFieldIconDirective;
}());
var MdcTextFieldLabelDirective = (function (_super) {
    tslib_1.__extends(MdcTextFieldLabelDirective, _super);
    /**
     * @param {?} _elm
     */
    function MdcTextFieldLabelDirective(_elm) {
        var _this = _super.call(this) || this;
        _this._elm = _elm;
        _this._cls = true;
        return _this;
    }
    MdcTextFieldLabelDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'label[mdcTextFieldLabel]',
                    providers: [{ provide: AbstractMdcLabel, useExisting: core.forwardRef(function () { return MdcTextFieldLabelDirective; }) }]
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcTextFieldLabelDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MdcTextFieldLabelDirective.propDecorators = {
        'for': [{ type: core.HostBinding },],
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-text-field__label',] },],
    };
    return MdcTextFieldLabelDirective;
}(AbstractMdcLabel));
var MdcTextFieldHelptextDirective = (function () {
    /**
     * @param {?} _elm
     */
    function MdcTextFieldHelptextDirective(_elm) {
        this._elm = _elm;
        this._cls = true;
        this._isValidation = false;
        this._isPersistent = false;
        this.forceShow = false;
    }
    Object.defineProperty(MdcTextFieldHelptextDirective.prototype, "isValidation", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._isValidation = value != null && "" + value !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcTextFieldHelptextDirective.prototype, "isPersistent", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._isPersistent = value != null && "" + value !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    MdcTextFieldHelptextDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcTextFieldHelptext]',
                    exportAs: 'mdcHelptext'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcTextFieldHelptextDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MdcTextFieldHelptextDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-text-field-helptext',] },],
        '_isValidation': [{ type: core.HostBinding, args: ['class.mdc-text-field-helptext--validation-msg',] },],
        '_isPersistent': [{ type: core.HostBinding, args: ['class.mdc-text-field-helptext--persistent',] },],
        'forceShow': [{ type: core.Input },],
        'isValidation': [{ type: core.Input },],
        'isPersistent': [{ type: core.Input },],
    };
    return MdcTextFieldHelptextDirective;
}());
var MdcTextFieldDirective = (function (_super) {
    tslib_1.__extends(MdcTextFieldDirective, _super);
    /**
     * @param {?} renderer
     * @param {?} root
     * @param {?} registry
     */
    function MdcTextFieldDirective(renderer, root, registry) {
        var _this = _super.call(this, root, renderer, registry) || this;
        _this.renderer = renderer;
        _this.root = root;
        _this.registry = registry;
        _this._cls = true;
        _this._initialized = false;
        _this._box = false;
        _this._dense = false;
        _this._bottomLineElm = null;
        _this.valid = null;
        _this.mdcAdapter = {
            addClass: function (className) {
                _this.renderer.addClass(_this.root.nativeElement, className);
            },
            removeClass: function (className) {
                _this.renderer.removeClass(_this.root.nativeElement, className);
            },
            addClassToLabel: function (className) {
                if (_this._label)
                    _this.renderer.addClass(_this._label._elm.nativeElement, className);
            },
            removeClassFromLabel: function (className) {
                if (_this._label)
                    _this.renderer.removeClass(_this._label._elm.nativeElement, className);
            },
            setIconAttr: function (name, value) {
                if (_this._icon)
                    _this._icon._el.nativeElement.setAttribute(name, value);
            },
            eventTargetHasClass: function (target, className) {
                return target.classList.contains(className);
            },
            registerTextFieldInteractionHandler: function (evtType, handler) {
                _this.registry.listen(_this.renderer, evtType, handler, _this.root);
            },
            deregisterTextFieldInteractionHandler: function (evtType, handler) {
                _this.registry.unlisten(evtType, handler);
            },
            notifyIconAction: function () {
                // TODO
            },
            addClassToBottomLine: function (className) {
                if (_this._bottomLineElm)
                    _this.renderer.addClass(_this._bottomLineElm, className);
            },
            removeClassFromBottomLine: function (className) {
                if (_this._bottomLineElm)
                    _this.renderer.removeClass(_this._bottomLineElm, className);
            },
            addClassToHelptext: function (className) {
                if (_this.helptext)
                    _this.renderer.addClass(_this.helptext._elm.nativeElement, className);
            },
            removeClassFromHelptext: function (className) {
                if (_this.helptext)
                    _this.renderer.removeClass(_this.helptext._elm.nativeElement, className);
            },
            helptextHasClass: function (className) {
                if (_this.helptext)
                    return _this.helptext._elm.nativeElement.classList.contains(className);
            },
            registerInputInteractionHandler: function (evtType, handler) {
                if (_this._input)
                    _this.registry.listen(_this.renderer, evtType, handler, _this._input._elm);
            },
            deregisterInputInteractionHandler: function (evtType, handler) {
                _this.registry.unlisten(evtType, handler);
            },
            registerTransitionEndHandler: function (handler) {
                if (_this._bottomLineElm)
                    _this.registry.listenElm(_this.renderer, 'transitionend', handler, _this._bottomLineElm);
            },
            deregisterTransitionEndHandler: function (handler) {
                _this.registry.unlisten('transitionend', handler);
            },
            setBottomLineAttr: function (attr, value) {
                if (_this._bottomLineElm)
                    _this._bottomLineElm.setAttribute(attr, value);
            },
            setHelptextAttr: function (name, value) {
                if (_this.helptext)
                    _this.renderer.setAttribute(_this.helptext._elm.nativeElement, name, value);
            },
            removeHelptextAttr: function (name) {
                if (_this.helptext)
                    _this.renderer.removeAttribute(_this.helptext._elm.nativeElement, name);
            },
            getNativeInput: function () {
                return {
                    checkValidity: function () { return _this.valid == null ? _this._input.valid : !!_this.valid; },
                    value: _this._input.value,
                    disabled: _this._input.disabled,
                    badInput: _this._input._isBadInput()
                };
            }
        };
        _this.foundation = new textfield.MDCTextFieldFoundation(_this.mdcAdapter);
        return _this;
    }
    /**
     * @return {?}
     */
    MdcTextFieldDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this._label && this._input && !this._label.for)
            this._label.for = this._input.id;
        this._initialized = true;
        this._bottomLineElm = this.renderer.createElement('div');
        this.renderer.addClass(this._bottomLineElm, CLASS_BOTTOM_LINE);
        this.renderer.appendChild(this.root.nativeElement, this._bottomLineElm);
        this.initBox();
        this.foundation.init();
        // TODO: we should actually reassign this if mdcInput changes, eg via ngContentChanges hook
        if (this._input)
            this._input._onChange = function (value) {
                if (_this._input && !_this._input._focused) {
                    // programmatic changes to the input value are not seen by the foundation,
                    // but some states should be updated with the new value:
                    if (value == null || value.toString().length === 0)
                        _this.mdcAdapter.removeClassFromLabel('mdc-text-field__label--float-above');
                    else
                        _this.mdcAdapter.addClassToLabel('mdc-text-field__label--float-above');
                }
            };
    };
    /**
     * @return {?}
     */
    MdcTextFieldDirective.prototype.ngOnDestroy = function () {
        this.destroyRipple();
        this.foundation.destroy();
        this._input._onChange = function (value) { };
    };
    /**
     * @return {?}
     */
    MdcTextFieldDirective.prototype.initBox = function () {
        if (this._box != !!this.isRippleInitialized()) {
            if (this._box)
                this.initRipple();
            else
                this.destroyRipple();
        }
    };
    Object.defineProperty(MdcTextFieldDirective.prototype, "isValid", {
        /**
         * When binding to 'isValid', the value will determine the valid state of the input,
        instead of it being managed by the underlying input element directly.
        For most use cases this is not needed. When the input/textarea is an ngControl,
        the mdcTextField is already aware of that, and is already using the 'valid'
        property of that control.
        <p>
        However, in some specific cases, binding to isValid can help. Example:
        When you want the mdcTextField to go to  'invalid' state only when the underlying
        control is invalid AND that control is touched, you can bind as follows:
        <code>isValid="myControl.valid || !myControl.touched"</code>.
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (value == null) {
                this.valid = null; // reset to null, validity now managed by the input control.
                this.foundation.useCustomValidityChecking_ = false;
                this.foundation.changeValidity_(this.mdcAdapter.getNativeInput().checkValidity());
            }
            else if (value !== this.valid) {
                this.valid = asBoolean(value);
                this.foundation.setValid(this.valid);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcTextFieldDirective.prototype, "_textArea", {
        /**
         * @return {?}
         */
        get: function () {
            return this._input._isTextarea();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcTextFieldDirective.prototype, "boxed", {
        /**
         * @return {?}
         */
        get: function () {
            return this._box;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._box = asBoolean(val);
            this.initBox();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcTextFieldDirective.prototype, "_leadingIcon", {
        /**
         * @return {?}
         */
        get: function () {
            return this._icon && !this._icon._el.nativeElement.previousElementSibling;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcTextFieldDirective.prototype, "_trailingIcon", {
        /**
         * @return {?}
         */
        get: function () {
            return this._icon && this._icon._el.nativeElement.previousElementSibling;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcTextFieldDirective.prototype, "dense", {
        /**
         * @return {?}
         */
        get: function () {
            return this._dense;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._dense = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    MdcTextFieldDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcTextField]',
                    providers: [{ provide: AbstractMdcRipple, useExisting: core.forwardRef(function () { return MdcTextFieldDirective; }) }]
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcTextFieldDirective.ctorParameters = function () { return [
        { type: core.Renderer2, },
        { type: core.ElementRef, },
        { type: MdcEventRegistry, },
    ]; };
    MdcTextFieldDirective.propDecorators = {
        '_cls': [{ type: core.HostBinding, args: ['class.mdc-text-field',] },],
        '_icon': [{ type: core.ContentChild, args: [MdcTextFieldIconDirective,] },],
        '_input': [{ type: core.ContentChild, args: [MdcTextFieldInputDirective,] },],
        '_label': [{ type: core.ContentChild, args: [MdcTextFieldLabelDirective,] },],
        '_labels': [{ type: core.ContentChildren, args: ['label', { descendants: true, read: core.ElementRef },] },],
        'helptext': [{ type: core.Input },],
        'isValid': [{ type: core.Input },],
        '_textArea': [{ type: core.HostBinding, args: ['class.mdc-text-field--textarea',] },],
        'boxed': [{ type: core.HostBinding, args: ['class.mdc-text-field--box',] }, { type: core.Input },],
        '_leadingIcon': [{ type: core.HostBinding, args: ['class.mdc-text-field--with-leading-icon',] },],
        '_trailingIcon': [{ type: core.HostBinding, args: ['class.mdc-text-field--with-trailing-icon',] },],
        'dense': [{ type: core.HostBinding, args: ['class.mdc-text-field--dense',] }, { type: core.Input },],
    };
    return MdcTextFieldDirective;
}(AbstractMdcRipple));

/**
 * A directive for a toolbar row. The content of a toolbar should always be embedded
in toolbar rows. So this directive should always be used as a direct child of an
<code>MdcToolbarDirective</code>. Multiple rows are allowed, which rows are visible
depends on the style of the toolbar, and the scroll position of the content of
the page.
 */
var MdcToolbarRowDirective = (function () {
    /**
     * @param {?} _elm
     */
    function MdcToolbarRowDirective(_elm) {
        this._elm = _elm;
        this._hostClass = true;
    }
    MdcToolbarRowDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcToolbarRow]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcToolbarRowDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MdcToolbarRowDirective.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.mdc-toolbar__row',] },],
    };
    return MdcToolbarRowDirective;
}());
/**
 * A directive for a toolbar section. A toolbar row should always be composed of toolbar sections.
Thus, this directive should always be used as a direct child of an <code>MdcToolbarRowDirective</code>.
Multiple sections, with different alignment options, are allowed per row.
 */
var MdcToolbarSectionDirective = (function () {
    function MdcToolbarSectionDirective() {
        this._hostClass = true;
        this._alignEnd = false;
        this._alignStart = false;
        this._shrinkToFit = false;
    }
    Object.defineProperty(MdcToolbarSectionDirective.prototype, "alignStart", {
        /**
         * Make the section align to the start of the toolbar row (default alignment is to the
        center).
         * @return {?}
         */
        get: function () {
            return this._alignStart;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._alignStart = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcToolbarSectionDirective.prototype, "alignEnd", {
        /**
         * Make the section align to the end of the toolbar row (default alignment is to the
        center).
         * @return {?}
         */
        get: function () {
            return this._alignEnd;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._alignEnd = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcToolbarSectionDirective.prototype, "shrinkToFit", {
        /**
         * Toolbar sections are laid out using flexbox. Each section will take up an equal amount
        of space within the toolbar by default. To accomodate very long sections (e.g. a  long title),
        set <code>shrinkToFit</code> to a value other than false on the other sections in the row.
         * @return {?}
         */
        get: function () {
            return this._shrinkToFit;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._shrinkToFit = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    MdcToolbarSectionDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcToolbarSection]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcToolbarSectionDirective.ctorParameters = function () { return []; };
    MdcToolbarSectionDirective.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.mdc-toolbar__section',] },],
        'alignStart': [{ type: core.Input }, { type: core.HostBinding, args: ['class.mdc-toolbar__section--align-start',] },],
        'alignEnd': [{ type: core.Input }, { type: core.HostBinding, args: ['class.mdc-toolbar__section--align-end',] },],
        'shrinkToFit': [{ type: core.Input }, { type: core.HostBinding, args: ['class.mdc-toolbar__section--shrink-to-fit',] },],
    };
    return MdcToolbarSectionDirective;
}());
/**
 * This directive adds extra styling to toolbar text that represents the title of the toolbar.
The directive should be a child of an <code>MdcToolbarSectionDirective</code>.
 */
var MdcToolbarTitleDirective = (function () {
    /**
     * @param {?} _elm
     */
    function MdcToolbarTitleDirective(_elm) {
        this._elm = _elm;
        this._hostClass = true;
    }
    MdcToolbarTitleDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcToolbarTitle]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcToolbarTitleDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MdcToolbarTitleDirective.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.mdc-toolbar__title',] },],
    };
    return MdcToolbarTitleDirective;
}());
/**
 * This directive is typically used to style icons placed in the toolbar placed
on the right hands side. Use <code>MdcToolbarMenuIcon</code> for the 'main'
icon, usually placed to the left of the menu.
The directive should be a child of an <code>MdcToolbarSectionDirective</code>.
 */
var MdcToolbarIcon = (function () {
    /**
     * @param {?} _elm
     */
    function MdcToolbarIcon(_elm) {
        this._elm = _elm;
        this._hostClass = true;
    }
    MdcToolbarIcon.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcToolbarIcon]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcToolbarIcon.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MdcToolbarIcon.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.mdc-toolbar__icon',] },],
    };
    return MdcToolbarIcon;
}());
/**
 * This directive is typically used to style the main toolbar icon, usually placed to
the left of the toolbar title. For other icons in the toolbar, use
<code>MdcToolbarIcon</code> instead.
 */
var MdcToolbarMenuIcon = (function () {
    /**
     * @param {?} _elm
     */
    function MdcToolbarMenuIcon(_elm) {
        this._elm = _elm;
        this._hostClass = true;
    }
    MdcToolbarMenuIcon.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcToolbarMenuIcon]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcToolbarMenuIcon.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MdcToolbarMenuIcon.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.mdc-toolbar__menu-icon',] },],
    };
    return MdcToolbarMenuIcon;
}());
/**
 * For <code>isFixed</code> toolbars, this directive should be put on the page's
content wrapper element, and the exported directive should be assigned to the
<code>fixedAdjust</code> property of the <code>MdcToolbarDirective</code>.
This will make the toolbar aware of the content wrapper, so that the top marging
can be adjusted based on the style of the toolbar, and the scroll of the content.
 */
var MdcToolbarFixedAdjustDirective = (function () {
    /**
     * @param {?} _elm
     */
    function MdcToolbarFixedAdjustDirective(_elm) {
        this._elm = _elm;
        this._hostClass = true;
    }
    MdcToolbarFixedAdjustDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcToolbarFixedAdjust]',
                    exportAs: 'mdcFixedAdjust'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcToolbarFixedAdjustDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MdcToolbarFixedAdjustDirective.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.mdc-toolbar-fixed-adjust',] },],
    };
    return MdcToolbarFixedAdjustDirective;
}());
/**
 * A directive for creating toolbars. All content inside a toolbar should be
embedded inside <code>MdcToolbarRowDirective</code> elements.
 */
var MdcToolbarDirective = (function () {
    /**
     * @param {?} renderer
     * @param {?} root
     * @param {?} registry
     */
    function MdcToolbarDirective(renderer, root, registry) {
        var _this = this;
        this.renderer = renderer;
        this.root = root;
        this.registry = registry;
        this._hostClass = true;
        /**
         * A number between [0, 1] that represents the <em>ratio of flexible space
        that has already been collapsed divided by the total amount of flexible space</em>
        for flexible toolbars.
         */
        this.expansionRatio = new core.EventEmitter();
        this._initialized = false;
        this._fixed = false;
        this._waterfall = false;
        this._fixedLastRowOnly = false;
        this._flexible = false;
        this._flexibleDefaultBehavior = false;
        this.mdcAdapter = {
            hasClass: function (className) {
                return _this.root.nativeElement.classList.contains(className);
            },
            addClass: function (className) {
                _this.renderer.addClass(_this.root.nativeElement, className);
            },
            removeClass: function (className) {
                _this.renderer.removeClass(_this.root.nativeElement, className);
            },
            registerScrollHandler: function (handler) {
                if (_this._viewport)
                    _this._viewport.addEventListener('scroll', handler, toolbar.util.applyPassive());
                else
                    window.addEventListener('scroll', handler, toolbar.util.applyPassive());
            },
            deregisterScrollHandler: function (handler) {
                if (_this._viewport)
                    _this._viewport.removeEventListener('scroll', handler, toolbar.util.applyPassive());
                else
                    window.removeEventListener('scroll', handler, toolbar.util.applyPassive());
            },
            registerResizeHandler: function (handler) {
                window.addEventListener('resize', handler, toolbar.util.applyPassive());
            },
            deregisterResizeHandler: function (handler) {
                window.removeEventListener('resize', handler, toolbar.util.applyPassive());
            },
            getViewportWidth: function () { return _this._viewport ? _this._viewport.clientWidth : window.innerWidth; },
            getViewportScrollY: function () { return _this._viewport ? _this._viewport.scrollTop : window.pageYOffset; },
            getOffsetHeight: function () { return _this.root.nativeElement.offsetHeight; },
            getFirstRowElementOffsetHeight: function () { return _this._firstRow._elm.nativeElement.offsetHeight; },
            notifyChange: function (evtData) {
                _this.expansionRatio.emit(evtData.flexibleExpansionRatio);
            },
            setStyle: function (property, value) {
                _this.renderer.setStyle(_this.root.nativeElement, property, value);
            },
            setStyleForTitleElement: function (property, value) {
                if (_this._title)
                    _this.renderer.setStyle(_this._title._elm.nativeElement, property, value);
            },
            setStyleForFlexibleRowElement: function (property, value) {
                _this.renderer.setStyle(_this._firstRow._elm.nativeElement, property, value);
            },
            setStyleForFixedAdjustElement: function (property, value) {
                if (_this.fixedAdjust)
                    _this.renderer.setStyle(_this.fixedAdjust._elm.nativeElement, property, value);
            }
        };
        this.foundation = new toolbar.MDCToolbarFoundation(this.mdcAdapter);
    }
    /**
     * @return {?}
     */
    MdcToolbarDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Using ngAfterViewInit instead of ngAfterContentInit, because the MDCToolbarFoundation.init
        // uses MdcToolbarAdapter.hasClass on classes that we bind in this component. Those classes are only
        // available after the view is fully initialized.
        this._initialized = true;
        if (this._viewport) {
            this._mdcViewPortScrollListener = function () { _this._updateViewPort(); };
            this._viewport.addEventListener('scroll', this._mdcViewPortScrollListener, toolbar.util.applyPassive());
        }
        this._updateViewPort();
        this.foundation.init();
    };
    /**
     * @return {?}
     */
    MdcToolbarDirective.prototype.ngOnDestroy = function () {
        if (this._mdcViewPortScrollListener)
            this._viewport.removeEventListener('scroll', this._mdcViewPortScrollListener, toolbar.util.applyPassive());
        this.foundation.destroy();
    };
    /**
     * @return {?}
     */
    MdcToolbarDirective.prototype._updateViewPort = function () {
        if (this._initialized && this._viewport) {
            if (this._fixed) {
                // simulate 'fixed' relative to view position of parent:
                this.root.nativeElement.style.position = 'absolute';
                this.root.nativeElement.style.top = this._viewport.scrollTop + 'px';
            }
            else {
                // reset to position from mdc stylesheets:
                this.root.nativeElement.style.position = null;
                this.root.nativeElement.style.top = null;
            }
        }
    };
    Object.defineProperty(MdcToolbarDirective.prototype, "isFixed", {
        /**
         * If set to a value other than false, the toolbar will be fixed to the top of the
        screen (or viewport).
         * @return {?}
         */
        get: function () {
            return this._fixed;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            var /** @type {?} */ newValue = asBoolean(val);
            if (this._initialized && this._fixed !== newValue)
                throw new Error('isFixed directive should not be changed after the mdcToolbar is initialized');
            this._fixed = newValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcToolbarDirective.prototype, "isWaterfall", {
        /**
         * If set to a value other than false, and used in combination with <code>isFixed</code>
        the toolbar will become a waterfall toolbar.
        A waterfall toolbar is initially static and has no elevation, but when content scrolls under it,
        the toolbar becomes fixed and gains elevation.
         * @return {?}
         */
        get: function () {
            return this._waterfall;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._waterfall = asBoolean(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcToolbarDirective.prototype, "isFixedLastrowOnly", {
        /**
         * If set to a value other than false, fixed toolbars will anchor only the last row to the top.
         * @return {?}
         */
        get: function () {
            return this._fixedLastRowOnly;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            var /** @type {?} */ newValue = asBoolean(val);
            if (this._initialized && this._fixedLastRowOnly !== newValue)
                throw new Error('isFixedLastrowOnly directive should not be changed after the mdcToolbar is initialized');
            this._fixedLastRowOnly = newValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcToolbarDirective.prototype, "isFlexible", {
        /**
         * A flexible toolbar changes height when the user scrolls. Flexible behavior is highly customizable,
        quoted from the upstream <code>mdc-toolbar</code> documentation:
        <blockquote>
        We only define the change of flexible space size without making further assumptions.
        But we do recommend the height of flexible space should be an integral number of
        toolbar row height and provide a easier way for user to customize height.
        Users can adjust the height of flexible space through sass variable
        <code>$mdc-toolbar-ratio-to-extend-flexible</code> or css variable
        <code>--mdc-toolbar-ratio-to-extend-flexible</code>.
        </blockquote>
         * @return {?}
         */
        get: function () {
            return this._flexible;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            var /** @type {?} */ newValue = asBoolean(val);
            if (this._initialized && this._flexible !== newValue)
                throw new Error('isFlexible directive should not be changed after the mdcToolbar is initialized');
            this._flexible = newValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcToolbarDirective.prototype, "isFlexibleDefaultBehavior", {
        /**
         * A default behavior for flexible toolbars.
        For more information see:
        <a href="https://github.com/material-components/material-components-web/tree/v0.23.0/packages/mdc-toolbar#flexible-toolbar-requires-javascript">
        Flexible Toolbar documention
        </a>.
         * @return {?}
         */
        get: function () {
            return this._flexibleDefaultBehavior;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            var /** @type {?} */ newValue = asBoolean(val);
            if (this._initialized && this._flexibleDefaultBehavior !== newValue)
                throw new Error('isFlexibleDefaultBehavior directive should not be changed after the mdcToolbar is initialized');
            this._flexibleDefaultBehavior = newValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdcToolbarDirective.prototype, "viewport", {
        /**
         * Assign any <code>HTMLElement</code> to this property to place a flexible toolbar fixed to that element
        (usually the parent container), instead of to the browser window. This property is mainly added for creating nice
        demos of toolbars embedded inside oher pages (such as on this documentation page). It is not recommended to use
        this for a real application toolbar. The position is kept fixed to the container element by listening
        for scroll/resize events, and using javascript to recompute the position. This may influence the smoothness
        of the scrolling experience, especially on mobile devices.
        The viewport element should have css styling: <code>position: relative</code>, and should have a fixed
        height.
         * @return {?}
         */
        get: function () {
            return this._viewport;
        },
        /**
         * @param {?} elm
         * @return {?}
         */
        set: function (elm) {
            if (this._initialized && elm !== this._viewport)
                throw new Error('viewport directive should not be changed after the mdcToolbar is initialized');
            this._viewport = elm;
        },
        enumerable: true,
        configurable: true
    });
    MdcToolbarDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcToolbar]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcToolbarDirective.ctorParameters = function () { return [
        { type: core.Renderer2, },
        { type: core.ElementRef, },
        { type: MdcEventRegistry, },
    ]; };
    MdcToolbarDirective.propDecorators = {
        '_hostClass': [{ type: core.HostBinding, args: ['class.mdc-toolbar',] },],
        'fixedAdjust': [{ type: core.Input },],
        'expansionRatio': [{ type: core.Output },],
        '_title': [{ type: core.ContentChild, args: [MdcToolbarTitleDirective,] },],
        '_firstRow': [{ type: core.ContentChild, args: [MdcToolbarRowDirective,] },],
        '_updateViewPort': [{ type: core.HostListener, args: ['window:resize', ['$event'],] },],
        'isFixed': [{ type: core.Input }, { type: core.HostBinding, args: ['class.mdc-toolbar--fixed',] },],
        'isWaterfall': [{ type: core.Input }, { type: core.HostBinding, args: ['class.mdc-toolbar--waterfall',] },],
        'isFixedLastrowOnly': [{ type: core.Input }, { type: core.HostBinding, args: ['class.mdc-toolbar--fixed-lastrow-only',] },],
        'isFlexible': [{ type: core.Input }, { type: core.HostBinding, args: ['class.mdc-toolbar--flexible',] },],
        'isFlexibleDefaultBehavior': [{ type: core.Input }, { type: core.HostBinding, args: ['class.mdc-toolbar--flexible-default-behavior',] },],
        'viewport': [{ type: core.Input },],
    };
    return MdcToolbarDirective;
}());

var scrollbarResizeListenerId;
var scrollbarResizeDirectives = 0;
/**
 * @return {?}
 */
function initScrollbarResizeListener() {
    if (scrollbarResizeListenerId)
        return;
    // create an invisible iframe, covering the full width of the window:
    var /** @type {?} */ iframe = document.createElement('iframe');
    iframe.id = scrollbarResizeListenerId = 'scrollbarResizeListener_' + Math.random().toString(36).substr(2, 10);
    iframe.style.cssText = 'position:absolute;margin:0;padding:0;border-width:0;overflow:hidden;height:0;width:100%;background-color:transparent;';
    // make the iframe contentWindow listen to resize events (they will be triggered when the container adds or removes a
    // vertical scrollbar, since it changes the width):
    iframe.onload = function () {
        iframe.contentWindow.addEventListener('resize', function () {
            try {
                var /** @type {?} */ evt = document.createEvent('UIEvents');
                evt.initUIEvent('resize', true, false, window, 0);
                window.dispatchEvent(evt);
            }
            catch (e) { }
        });
    };
    // add to the page:
    document.body.appendChild(iframe);
}
/**
 * @return {?}
 */
function destroyScrollbarResizeListener() {
    if (scrollbarResizeListenerId != null) {
        var /** @type {?} */ iframe = document.getElementById(scrollbarResizeListenerId);
        if (iframe)
            iframe.parentElement.removeChild(iframe);
        scrollbarResizeListenerId = null;
    }
}
/**
 * Utility directive to trigger window 'resize' events not only when the browser window
is resized, but also when the browser window gets a vertical scrollbar.
This solves problems with directives that base their layout or position on the
width of the document body. When a scrollbar is added, the body width changes, but the browser
doesn't fire a 'resize' (or other) event. As long as at least one <code>mdcScrollbarResize</code>
directive is active on the page, 'resize' events will also be fired when the body width changes
as a consequence of the addition or removal of a vertical toolbar.
The directive adds a hidden iframe to the page, that contains the trickery to make this happen.
See this <a href="https://gist.github.com/OrganicPanda/8222636">hacky-scrollbar-resize-listener.js
github gist</a> for the original idea.
 */
var MdcScrollbarResizeDirective = (function () {
    function MdcScrollbarResizeDirective() {
        this._scrollbarResize = false;
    }
    /**
     * @return {?}
     */
    MdcScrollbarResizeDirective.prototype.ngOnDestroy = function () {
        if (this._scrollbarResize) {
            this._scrollbarResize = false;
            --scrollbarResizeDirectives;
            if (scrollbarResizeDirectives <= 0)
                destroyScrollbarResizeListener();
        }
    };
    Object.defineProperty(MdcScrollbarResizeDirective.prototype, "mdcScrollbarResize", {
        /**
         * Set to false to disable triggering resize events because of addition/deletion of a scrollbar.
        The <code>mdcScrollbarResize</code> behavior is removed after <strong>all</strong>
        <code>mdcScrollbarResize</code> directives on the page are removed or have the value false.
         * @return {?}
         */
        get: function () {
            return this._scrollbarResize;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            var /** @type {?} */ newValue = asBoolean(val);
            if (newValue !== this._scrollbarResize) {
                this._scrollbarResize = newValue;
                if (newValue) {
                    ++scrollbarResizeDirectives;
                    initScrollbarResizeListener();
                }
                else {
                    --scrollbarResizeDirectives;
                    if (scrollbarResizeDirectives <= 0)
                        destroyScrollbarResizeListener();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    MdcScrollbarResizeDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mdcScrollbarResize]'
                },] },
    ];
    /**
     * @nocollapse
     */
    MdcScrollbarResizeDirective.ctorParameters = function () { return []; };
    MdcScrollbarResizeDirective.propDecorators = {
        'mdcScrollbarResize': [{ type: core.Input },],
    };
    return MdcScrollbarResizeDirective;
}());

var MaterialModule = (function () {
    function MaterialModule() {
    }
    MaterialModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule
                    ],
                    providers: [
                        MDC_EVENT_REGISTRY_PROVIDER,
                        MDC_SNACKBAR_PROVIDER
                    ],
                    declarations: [
                        MdcButtonDirective,
                        MdcCardDirective, MdcCardHorizontalDirective, MdcCardPrimaryDirective, MdcCardTitleDirective, MdcCardSubtitleDirective,
                        MdcCardTextDirective, MdcCardMediaDirective, MdcCardMediaItemDirective, MdcCardActionsDirective,
                        MdcCheckboxDirective, MdcCheckboxInputDirective,
                        MdcElevationDirective,
                        MdcFabDirective, MdcFabIconDirective,
                        MdcFormFieldDirective, MdcFormFieldInputDirective, MdcFormFieldLabelDirective,
                        MdcIconToggleDirective, MdcIconToggleIconDirective, MdcFormsIconToggleDirective,
                        MdcLinearProgressDirective,
                        MdcListDividerDirective, MdcListItemDirective, MdcListItemTextDirective, MdcListItemTextSecondaryDirective,
                        MdcListItemStartDetailDirective, MdcListItemEndDetailDirective, MdcListDirective, MdcListGroupSubHeaderDirective, MdcListGroupDirective,
                        MdcMenuAnchorDirective, MdcSimpleMenuDirective,
                        MdcRadioDirective, MdcRadioInputDirective,
                        MdcRippleDirective,
                        MdcSelectDirective, MdcSelectTextDirective, MdcFormsSelectDirective,
                        MdcSelectNativeDirective, MdcSelectMultipleNativeDirective, MdcSelectGroupNativeDirective, MdcSelectOptionNativeDirective,
                        MdcSliderDirective, MdcFormsSliderDirective,
                        MdcSwitchInputDirective, MdcSwitchDirective,
                        MdcTabDirective, MdcTabIconDirective, MdcTabIconTextDirective,
                        MdcTabRouterDirective,
                        MdcTabBarDirective,
                        MdcTabBarScrollerDirective, MdcTabBarScrollerInnerDirective, MdcTabBarScrollerBackDirective, MdcTabBarScrollerForwardDirective, MdcTabBarScrollerFrameDirective,
                        MdcTextFieldDirective, MdcTextFieldInputDirective, MdcTextFieldIconDirective, MdcTextFieldLabelDirective, MdcTextFieldHelptextDirective,
                        MdcToolbarDirective, MdcToolbarRowDirective, MdcToolbarSectionDirective, MdcToolbarTitleDirective, MdcToolbarIcon, MdcToolbarMenuIcon, MdcToolbarFixedAdjustDirective,
                        MdcScrollbarResizeDirective
                    ],
                    exports: [
                        MdcButtonDirective,
                        MdcCardDirective, MdcCardHorizontalDirective, MdcCardPrimaryDirective, MdcCardTitleDirective, MdcCardSubtitleDirective,
                        MdcCardTextDirective, MdcCardMediaDirective, MdcCardMediaItemDirective, MdcCardActionsDirective,
                        MdcCheckboxDirective, MdcCheckboxInputDirective,
                        MdcElevationDirective,
                        MdcFabDirective, MdcFabIconDirective,
                        MdcFormFieldDirective, MdcFormFieldInputDirective, MdcFormFieldLabelDirective,
                        MdcIconToggleDirective, MdcIconToggleIconDirective, MdcFormsIconToggleDirective,
                        MdcLinearProgressDirective,
                        MdcListDividerDirective, MdcListItemDirective, MdcListItemTextDirective, MdcListItemTextSecondaryDirective,
                        MdcListItemStartDetailDirective, MdcListItemEndDetailDirective, MdcListDirective, MdcListGroupSubHeaderDirective, MdcListGroupDirective,
                        MdcMenuAnchorDirective, MdcSimpleMenuDirective,
                        MdcRadioDirective, MdcRadioInputDirective,
                        MdcRippleDirective,
                        MdcSelectDirective, MdcSelectTextDirective, MdcFormsSelectDirective,
                        MdcSelectNativeDirective, MdcSelectMultipleNativeDirective, MdcSelectGroupNativeDirective, MdcSelectOptionNativeDirective,
                        MdcSliderDirective, MdcFormsSliderDirective,
                        MdcSwitchInputDirective, MdcSwitchDirective,
                        MdcTabDirective, MdcTabIconDirective, MdcTabIconTextDirective,
                        MdcTabRouterDirective,
                        MdcTabBarDirective,
                        MdcTabBarScrollerDirective, MdcTabBarScrollerInnerDirective, MdcTabBarScrollerBackDirective, MdcTabBarScrollerForwardDirective, MdcTabBarScrollerFrameDirective,
                        MdcTextFieldDirective, MdcTextFieldInputDirective, MdcTextFieldIconDirective, MdcTextFieldLabelDirective, MdcTextFieldHelptextDirective,
                        MdcToolbarDirective, MdcToolbarRowDirective, MdcToolbarSectionDirective, MdcToolbarTitleDirective, MdcToolbarIcon, MdcToolbarMenuIcon, MdcToolbarFixedAdjustDirective,
                        MdcScrollbarResizeDirective
                    ]
                },] },
    ];
    /**
     * @nocollapse
     */
    MaterialModule.ctorParameters = function () { return []; };
    return MaterialModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

exports.MdcButtonDirective = MdcButtonDirective;
exports.MdcCardDirective = MdcCardDirective;
exports.MdcCardHorizontalDirective = MdcCardHorizontalDirective;
exports.MdcCardPrimaryDirective = MdcCardPrimaryDirective;
exports.MdcCardTitleDirective = MdcCardTitleDirective;
exports.MdcCardSubtitleDirective = MdcCardSubtitleDirective;
exports.MdcCardTextDirective = MdcCardTextDirective;
exports.MdcCardMediaDirective = MdcCardMediaDirective;
exports.MdcCardMediaItemDirective = MdcCardMediaItemDirective;
exports.MdcCardActionsDirective = MdcCardActionsDirective;
exports.MdcCheckboxDirective = MdcCheckboxDirective;
exports.MdcCheckboxInputDirective = MdcCheckboxInputDirective;
exports.MdcElevationDirective = MdcElevationDirective;
exports.MdcFabDirective = MdcFabDirective;
exports.MdcFabIconDirective = MdcFabIconDirective;
exports.MdcFormFieldDirective = MdcFormFieldDirective;
exports.MdcFormFieldInputDirective = MdcFormFieldInputDirective;
exports.MdcFormFieldLabelDirective = MdcFormFieldLabelDirective;
exports.MdcIconToggleDirective = MdcIconToggleDirective;
exports.MdcIconToggleIconDirective = MdcIconToggleIconDirective;
exports.MdcFormsIconToggleDirective = MdcFormsIconToggleDirective;
exports.MdcLinearProgressDirective = MdcLinearProgressDirective;
exports.MdcListDividerDirective = MdcListDividerDirective;
exports.MdcListItemDirective = MdcListItemDirective;
exports.MdcListItemTextDirective = MdcListItemTextDirective;
exports.MdcListItemTextSecondaryDirective = MdcListItemTextSecondaryDirective;
exports.MdcListItemStartDetailDirective = MdcListItemStartDetailDirective;
exports.MdcListItemEndDetailDirective = MdcListItemEndDetailDirective;
exports.MdcListDirective = MdcListDirective;
exports.MdcListGroupSubHeaderDirective = MdcListGroupSubHeaderDirective;
exports.MdcListGroupDirective = MdcListGroupDirective;
exports.MdcMenuAnchorDirective = MdcMenuAnchorDirective;
exports.MdcSimpleMenuDirective = MdcSimpleMenuDirective;
exports.MdcRadioDirective = MdcRadioDirective;
exports.MdcRadioInputDirective = MdcRadioInputDirective;
exports.MdcRippleDirective = MdcRippleDirective;
exports.MdcSelectDirective = MdcSelectDirective;
exports.MdcSelectTextDirective = MdcSelectTextDirective;
exports.MdcFormsSelectDirective = MdcFormsSelectDirective;
exports.MdcSelectNativeDirective = MdcSelectNativeDirective;
exports.MdcSelectMultipleNativeDirective = MdcSelectMultipleNativeDirective;
exports.MdcSelectGroupNativeDirective = MdcSelectGroupNativeDirective;
exports.MdcSelectOptionNativeDirective = MdcSelectOptionNativeDirective;
exports.MdcSliderDirective = MdcSliderDirective;
exports.MdcFormsSliderDirective = MdcFormsSliderDirective;
exports.MdcSnackbarService = MdcSnackbarService;
exports.MdcSwitchInputDirective = MdcSwitchInputDirective;
exports.MdcSwitchDirective = MdcSwitchDirective;
exports.AbstractMdcTabDirective = AbstractMdcTabDirective;
exports.MdcTabDirective = MdcTabDirective;
exports.MdcTabIconDirective = MdcTabIconDirective;
exports.MdcTabIconTextDirective = MdcTabIconTextDirective;
exports.MdcTabRouterDirective = MdcTabRouterDirective;
exports.MdcTabBarDirective = MdcTabBarDirective;
exports.MdcTabBarScrollerDirective = MdcTabBarScrollerDirective;
exports.MdcTabBarScrollerInnerDirective = MdcTabBarScrollerInnerDirective;
exports.MdcTabBarScrollerBackDirective = MdcTabBarScrollerBackDirective;
exports.MdcTabBarScrollerForwardDirective = MdcTabBarScrollerForwardDirective;
exports.MdcTabBarScrollerFrameDirective = MdcTabBarScrollerFrameDirective;
exports.MdcTextFieldDirective = MdcTextFieldDirective;
exports.MdcTextFieldInputDirective = MdcTextFieldInputDirective;
exports.MdcTextFieldIconDirective = MdcTextFieldIconDirective;
exports.MdcTextFieldLabelDirective = MdcTextFieldLabelDirective;
exports.MdcTextFieldHelptextDirective = MdcTextFieldHelptextDirective;
exports.MdcToolbarDirective = MdcToolbarDirective;
exports.MdcToolbarRowDirective = MdcToolbarRowDirective;
exports.MdcToolbarSectionDirective = MdcToolbarSectionDirective;
exports.MdcToolbarTitleDirective = MdcToolbarTitleDirective;
exports.MdcToolbarIcon = MdcToolbarIcon;
exports.MdcToolbarMenuIcon = MdcToolbarMenuIcon;
exports.MdcToolbarFixedAdjustDirective = MdcToolbarFixedAdjustDirective;
exports.MdcScrollbarResizeDirective = MdcScrollbarResizeDirective;
exports.MdcEventRegistry = MdcEventRegistry;
exports.MaterialModule = MaterialModule;
exports.ɵf = AbstractMdcInput;
exports.ɵg = AbstractMdcLabel;
exports.ɵe = AbstractMdcRipple;
exports.ɵb = MDC_SNACKBAR_PROVIDER;
exports.ɵa = MDC_SNACKBAR_PROVIDER_FACTORY;
exports.ɵd = MDC_EVENT_REGISTRY_PROVIDER;
exports.ɵc = MDC_EVENT_REGISTRY_PROVIDER_FACTORY;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material.umd.js.map
