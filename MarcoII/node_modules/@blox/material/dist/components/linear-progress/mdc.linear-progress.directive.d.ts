import { AfterContentInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';
/**
 * Directive for creating a Material Design linear progress indicator.
 * The current implementation will add and manage all DOM child elements that
 * are required for the wrapped <code>mdc-linear-progress</code> component.
 * Future implementations will also support supplying (customized)
 * DOM children.
 */
export declare class MdcLinearProgressDirective implements AfterContentInit, OnDestroy {
    private _rndr;
    private _root;
    private _registry;
    _cls: boolean;
    _role: string;
    private _initialized;
    _indeterminate: boolean;
    _reverse: boolean;
    private _progress;
    private _buffer;
    private _closed;
    private _elmBuffer;
    private _elmPrimaryBar;
    private mdcAdapter;
    private foundation;
    constructor(_rndr: Renderer2, _root: ElementRef, _registry: MdcEventRegistry);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private initElements();
    private addElement(parent, element, classNames);
    /**
     * Puts the progress indicator in 'indeterminate' state, signaling
     * that the exact progress on a measured task is not known.
     */
    isIndeterminate: any;
    /**
     * Reverses the direction of the linear progress indicator.
     */
    isReversed: any;
    /**
     * Set the progress, the value should be between [0, 1].
     */
    progressValue: number | string;
    /**
     * Set the buffer progress, the value should be between [0, 1].
     */
    bufferValue: number | string;
    /**
     * When set to true this closes (animates away) the progress bar,
     * when set to false this opens (animates into view) the progress bar.
     */
    isClosed: any;
}
