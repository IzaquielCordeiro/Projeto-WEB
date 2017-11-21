import { AfterContentInit, ElementRef, OnDestroy, OnInit, QueryList, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { AbstractMdcInput } from '../abstract/abstract.mdc.input';
import { AbstractMdcLabel } from '../abstract/abstract.mdc.label';
import { AbstractMdcRipple } from '../ripple/abstract.mdc.ripple';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';
export declare class MdcTextFieldInputDirective extends AbstractMdcInput implements OnInit {
    _elm: ElementRef;
    private renderer;
    _cntr: NgControl;
    _onChange: (value: any) => void;
    private _id;
    private _type;
    private _disabled;
    private _required;
    private cachedId;
    _focused: boolean;
    _hostClass: boolean;
    constructor(_elm: ElementRef, renderer: Renderer2, _cntr: NgControl);
    ngOnInit(): void;
    id: string;
    disabled: any;
    required: any;
    type: string;
    /** @docs-private */
    /** @docs-private */
    value: string;
    /** @docs-private */
    focus(): void;
    _onFocus(): void;
    _onBlur(): void;
    _onInput(): void;
    /** @docs-private */
    readonly valid: boolean;
    _isBadInput(): boolean;
    _isTextarea(): boolean;
    _newId(): string;
}
export declare class MdcTextFieldIconDirective {
    _el: ElementRef;
    _cls: boolean;
    constructor(_el: ElementRef);
}
export declare class MdcTextFieldLabelDirective extends AbstractMdcLabel {
    _elm: ElementRef;
    /** @docs-private */
    for: string;
    _cls: boolean;
    constructor(_elm: ElementRef);
}
export declare class MdcTextFieldHelptextDirective {
    _elm: ElementRef;
    _cls: boolean;
    _isValidation: boolean;
    _isPersistent: boolean;
    forceShow: boolean;
    constructor(_elm: ElementRef);
    isValidation: boolean;
    isPersistent: boolean;
}
export declare class MdcTextFieldDirective extends AbstractMdcRipple implements AfterContentInit, OnDestroy {
    private renderer;
    private root;
    private registry;
    _cls: boolean;
    _icon: MdcTextFieldIconDirective;
    _input: MdcTextFieldInputDirective;
    _label: MdcTextFieldLabelDirective;
    _labels: QueryList<ElementRef>;
    helptext: MdcTextFieldHelptextDirective;
    private _initialized;
    private _box;
    private _dense;
    private _bottomLineElm;
    private valid;
    private mdcAdapter;
    private foundation;
    constructor(renderer: Renderer2, root: ElementRef, registry: MdcEventRegistry);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private initBox();
    /**
     * When binding to 'isValid', the value will determine the valid state of the input,
     * instead of it being managed by the underlying input element directly.
     * For most use cases this is not needed. When the input/textarea is an ngControl,
     * the mdcTextField is already aware of that, and is already using the 'valid'
     * property of that control.
     * <p>
     * However, in some specific cases, binding to isValid can help. Example:
     * When you want the mdcTextField to go to  'invalid' state only when the underlying
     * control is invalid AND that control is touched, you can bind as follows:
     * <code>isValid="myControl.valid || !myControl.touched"</code>.
     */
    isValid: boolean;
    readonly _textArea: boolean;
    boxed: any;
    readonly _leadingIcon: boolean;
    readonly _trailingIcon: boolean;
    dense: any;
}
