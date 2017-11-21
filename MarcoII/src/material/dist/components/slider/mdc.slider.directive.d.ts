import { AfterContentInit, AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';
/**
 * Directive for creating a Material Design slider input.
 * (Modelled after the <code>&lt;input type="range"/&gt;</code> element).
 * The slider is fully accessible. The current implementation
 * will add and manage all DOM child elements that are required for the wrapped
 * <code>mdc-slider</code> component.
 * Future implementations will also support supplying (customized)
 * DOM children.
 */
export declare class MdcSliderDirective implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
    private _rndr;
    private _root;
    private _registry;
    _cls: boolean;
    _role: string;
    /**
     * Event emitted when the value changes. The value may change because of user input,
     * or as a side affect of setting new min, max, or step values.
     */
    valueChange: EventEmitter<number>;
    /**
     * Event emitted when the min range value changes. This may happen as a side effect
     * of setting a new max value (when the new max is smaller than the old min).
     */
    minValueChange: EventEmitter<number>;
    /**
     * Event emitted when the max range value changes. This may happen as a side effect
     * of setting a new min value (when the new min is larger than the old max).
     */
    maxValueChange: EventEmitter<number>;
    /**
     * Event emitted when the step value changes. This may happen as a side effect
     * of making the slider discrete.
     */
    stepValueChange: EventEmitter<number>;
    private _initialized;
    private _elmThumbCntr;
    private _elmSliderPin;
    private _elmValueMarker;
    private _elmTrack;
    private _elmTrackMarkerCntr;
    private _reinitTabIndex;
    private _onChange;
    private _onTouched;
    private _discrete;
    private _markers;
    private _disabled;
    private _value;
    private _min;
    private _max;
    private _step;
    private _lastWidth;
    private _interactionHandlers;
    private mdcAdapter;
    private foundation;
    constructor(_rndr: Renderer2, _root: ElementRef, _registry: MdcEventRegistry);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    _onChanges(changes: SimpleChanges, callValueAccessorOnValueChange?: boolean): void;
    private isChanged(name, changes);
    private initElements();
    private addElement(parent, element, classNames);
    private initDefaultAttributes();
    private updateValues(changes, callValueAccessorOnChange);
    private updateLayout();
    private notifyValueChanged(callValueAccessorOnChange);
    /** @docs-private */
    registerOnChange(onChange: (value: any) => void): void;
    /** @docs-private */
    registerOnTouched(onTouched: () => any): void;
    /**
     * Make the slider discrete. Note from the wrapped <code>mdc-slider</code>
     * component:
     * <blockquote>If a slider contains a step value it does not mean that the slider is a "discrete" slider.
     * "Discrete slider" is a UX treatment, while having a step value is behavioral.</blockquote>
     */
    isDiscrete: any;
    /**
     * Property to enable/disable the display of track markers. Display markers
     * are only supported for discrete sliders. Thus they are only shown when the values
     * of both hasMarkers and isDiscrete equal true.
     */
    hasMarkers: any;
    /**
     * The current value of the slider.
     */
    value: string | number;
    /**
     * The minumum allowed value of the slider.
     */
    minValue: string | number;
    /**
     * The maximum allowed value of the slider.
     */
    maxValue: string | number;
    /**
     * Set the step value (or set to 0 for no step value).
     * The step value can be a floating point value &gt;= 0.
     * The slider will quantize all values to match the step value, except for the minimum and
     * maximum, which can always be set.
     * Discrete sliders are required to have a step value other than 0.
     * Note from the wrapped <code>mdc-slider</code> component:
     * <blockquote>If a slider contains a step value it does not mean that the slider is a "discrete" slider.
     * "Discrete slider" is a UX treatment, while having a step value is behavioral.</blockquote>
     */
    stepValue: string | number;
    /**
     * A property to disable the slider.
     */
    disabled: any;
}
/**
 * Directive for adding Angular Forms (<code>ControlValueAccessor</code>) behavior to an
 * <code>MdcSliderDirective</code>. Allows the use of the Angular Forms API with
 * icon toggles, e.g. binding to <code>[(ngModel)]</code>, form validation, etc.
 */
export declare class MdcFormsSliderDirective implements ControlValueAccessor {
    private mdcSlider;
    constructor(mdcSlider: MdcSliderDirective);
    /** @docs-private */
    writeValue(obj: any): void;
    /** @docs-private */
    registerOnChange(onChange: (value: any) => void): void;
    /** @docs-private */
    registerOnTouched(onTouched: () => any): void;
    /** @docs-private */
    setDisabledState(disabled: boolean): void;
}
