import { AfterContentInit, ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { AbstractMdcRipple } from '../ripple/abstract.mdc.ripple';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';
/**
 * Directive for an icon nested inside a <code>MdcIconToggleDirective</code>.
 * This directive is only needed when the icon font uses CSS pseudo-elements in order
 * to provide the icon. This is how Font Awesome, and many other icon font libraries
 * provide the icons.
 * For icon fonts that don't use pseudo elements (such as the Material Design Icons from Google),
 * this directive is not necessary.
 */
export declare class MdcIconToggleIconDirective {
}
/**
 * Directive for creating a Material Design icon toggle button.
 * The icon toggle is fully accessible, and works with any icon font.
 * When the icon font uses CSS pseudo-elements in order to display the icon,
 * embed an <code>MdcIconToggleIconDirective</code> inside this directive for
 * the actual icon. (Otherwise the pseudo-elements used for showing the icon
 * will interfere with the pseudo-elements this directive uses for showing
 * ripple styles).
 */
export declare class MdcIconToggleDirective extends AbstractMdcRipple implements AfterContentInit {
    private elm;
    private renderer;
    private registry;
    _hostClass: boolean;
    _role: string;
    _innerIcon: ElementRef;
    /**
     * Event emitted when the state of the icon changes (for example when a user clicks
     * the icon).
     */
    isOnChange: EventEmitter<boolean>;
    private _onChange;
    private _onTouched;
    private _beforeInitQueu;
    private _initialized;
    private _labelOn;
    private _labelOff;
    private _iconOn;
    private _iconOff;
    private _iconIsClass;
    private mdcAdapter;
    private foundation;
    constructor(elm: ElementRef, renderer: Renderer2, registry: MdcEventRegistry);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private execAfterInit(fun);
    private refreshData();
    private initDefaultAttributes();
    private initializeData();
    private createDataAttrForToggle(label, icon, iconIsClass);
    /** @docs-private */
    writeValue(obj: any): void;
    /** @docs-private */
    registerOnChange(onChange: (value: any) => void): void;
    /** @docs-private */
    registerOnTouched(onTouched: () => any): void;
    /** @docs-private */
    setDisabledState(disabled: boolean): void;
    /** @docs-private */
    protected isRippleUnbounded(): boolean;
    /** @docs-private */
    protected isRippleSurfaceActive(): boolean;
    /** @docs-private */
    protected computeRippleBoundingRect(): {
        left: any;
        top: any;
        width: number;
        height: number;
        right: any;
        bottom: any;
    };
    /**
     * The current state of the icon (true for on/pressed, false for off/unpressed).
     */
    isOn: any;
    /**
     * The aria-label to use for the on/pressed state of the icon.
     */
    labelOn: string;
    /**
     * The aria-label to use for the off/unpressed state of the icon.
     */
    labelOff: string;
    /**
     * The icon to use for the on/pressed state of the icon.
     */
    iconOn: string;
    /**
     * The icon to use for the off/unpressed state of the icon.
     */
    iconOff: string;
    /**
     * Some icon fonst (such as Font Awesome) use CSS class names to select the icon to show.
     * Others, such as the Material Design Icons from Google use ligatures (allowing selection of
     * the icon by using their textual name). When <code>iconIsClass</code> is true, the directive
     * assumes <code>iconOn</code>, and <code>iconOff</code> represent class names. When
     * <code>iconIsClass</code> is false, the directive assumes the use of ligatures.
     * <p>
     * When <code>iconIsClass</code> is not assigned, the directive bases its decision on whether
     * or not an embedded <code>MdcIconToggleIconDirective</code> is used.
     * In most cases you won't need to set this input, as the default based on an embedded
     * <code>MdcIconToggleIconDirective</code> is typically what you need.
     * </p>
     */
    iconIsClass: any;
    /**
     * To disable the icon toggle, set this input to true.
     */
    disabled: any;
    _onBlur(): void;
}
/**
 * Directive for adding Angular Forms (<code>ControlValueAccessor</code>) behavior to an
 * <code>MdcIconToggleDirective</code>. Allows the use of the Angular Forms API with
 * icon toggles, e.g. binding to <code>[(ngModel)]</code>, form validation, etc.
 */
export declare class MdcFormsIconToggleDirective implements ControlValueAccessor {
    private mdcIconToggle;
    constructor(mdcIconToggle: MdcIconToggleDirective);
    /** @docs-private */
    writeValue(obj: any): void;
    /** @docs-private */
    registerOnChange(onChange: (value: any) => void): void;
    /** @docs-private */
    registerOnTouched(onTouched: () => any): void;
    /** @docs-private */
    setDisabledState(disabled: boolean): void;
}
