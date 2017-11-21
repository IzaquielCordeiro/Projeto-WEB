import { AfterContentInit, ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MdcSimpleMenuDirective } from '../menu/mdc.simple.menu.directive';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';
/**
 * Directive for the text representation of an <code>mdcSelect</code> selection control.
 */
export declare class MdcSelectTextDirective {
    _elm: ElementRef;
    _cls: boolean;
    constructor(_elm: ElementRef);
}
/**
 * Directive for a spec aligned material design 'Select Control',
 * build on top of a simple menu.
 * This directive should wrap an <code>MdcSelectTextDirective</code>, and
 * an <code>MdcSimpleMenuDirective</code>
 */
export declare class MdcSelectDirective implements AfterContentInit, OnDestroy {
    private _elm;
    private _rndr;
    private _registry;
    private onDestroy$;
    _cls: boolean;
    _role: string;
    _menu: MdcSimpleMenuDirective;
    _text: MdcSelectTextDirective;
    private _onChange;
    private _onTouched;
    private _initialized;
    private _value;
    private _disabled;
    /**
     * Event emitted when the value of the select changes. Note that when an <code>mdcSelect</code> is used as a FormControl,
     * it's also possible to bind to <code>ngModelChange</code> instead of <code>valueChange</code>.
     */
    valueChange: EventEmitter<any>;
    private mdcAdapter;
    private foundation;
    constructor(_elm: ElementRef, _rndr: Renderer2, _registry: MdcEventRegistry);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private readonly _items;
    private readonly _menuEl;
    private updateIndexFromValue(emit?, onchanges?);
    private createEvent(type, details);
    /** @docs-private */
    writeValue(obj: any): void;
    /** @docs-private */
    registerOnChange(onChange: (value: any) => void): void;
    /** @docs-private */
    registerOnTouched(onTouched: () => any): void;
    /**
     * Property for the chosen value of the select control. The value that each option represents
     * can be set with the <code>value</code> option on the <code>MdcListItemDirective</code>
     * that represents that choice. Note that when an <code>mdcSelect</code> is used as a FormControl,
     * it's also possible to bind to <code>ngModel</code> instead of <code>value</code>.
     */
    value: any;
    /**
     * When this input is defined and does not have value false, the select control will be disabled.
     */
    disabled: any;
}
/**
 * Directive for adding Angular Forms (<code>ControlValueAccessor</code>) behavior to an
 * <code>MdcSelectDirective</code>. Allows the use of the Angular Forms API with
 * select inputs, e.g. binding to <code>[(ngModel)]</code>, form validation, etc.
 */
export declare class MdcFormsSelectDirective implements ControlValueAccessor {
    private mdcSelect;
    constructor(mdcSelect: MdcSelectDirective);
    /** @docs-private */
    writeValue(obj: any): void;
    /** @docs-private */
    registerOnChange(onChange: (value: any) => void): void;
    /** @docs-private */
    registerOnTouched(onTouched: () => any): void;
    /** @docs-private */
    setDisabledState(disabled: boolean): void;
}
/**
 * Directive for a 'Select Control' based on the native HTML <code>select</code>
 * element. This directive may provide better usability then the <code>MdcSelectDirective</code>
 * on mobile devices. For tablets and desktop, the standard <code>MdcSelectDirective</code>
 * is recommended.
 * When this directive is used, the standard HTML <code>option</code> and <code>optgroup</code>
 * elements must be used to define the choices. No additional directives are needed.
 */
export declare class MdcSelectNativeDirective {
    _cls: boolean;
}
/**
 * Directive for an option inside a mult-selection 'Select Control'
 * using <code>MdcSelectMultipleNativeDirective</code>.
 */
export declare class MdcSelectOptionNativeDirective {
    _cls: boolean;
}
/**
 * Directive for an optgroup inside a mult-selection 'Select Control'
 * using <code>MdcSelectMultipleNativeDirective</code>.
 */
export declare class MdcSelectGroupNativeDirective {
    _cls: boolean;
}
/**
 * Directive for a mult-selection 'Select Control' based on the native HTML <code>select[multiple]</code>
 * element.
 * When this directive is used, the standard HTML <code>option</code> and <code>optgroup</code>
 * elements must be used to define the choices. Each option should be annotated with an
 * <code>MdcSelectOptionNativeDirective</code>, and each <code>optgroup</code> with an
 * <code>MdcSelectGroupNativeDirective</code>.
 * Option dividers can be created as follows:
 * <code>&lt;option mdcListDivider&gt;&lt;/option&gt;</code>.
 */
export declare class MdcSelectMultipleNativeDirective implements AfterContentInit {
    _cls1: boolean;
    _cls2: boolean;
    private options;
    private groups;
    ngAfterContentInit(): void;
}
