import { Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MdcSnackbarMessage } from './mdc.snackbar.message';
/**
 * This class provides information about a posted snackbar message.
 * It can also be used to subscribe to action clicks.
 */
export declare class MdcSnackbarRef {
    private _action;
    constructor(_action: Subject<void>);
    /**
     * Subscribe to this observable to be informed when a user clicks the action
     * for the shown snackbar. Note that the observable will complete when the snackbar
     * disappears from screen, so there is no need to unsubscribe.
     */
    action(): Observable<void>;
}
/**
 * A service for showing spec-aligned material design snackbar/toast messages.
 */
export declare class MdcSnackbarService {
    private snackbar;
    private root;
    private isActive;
    private postedMessages;
    private lastActivated;
    private lastDismissed;
    private closeMessage;
    constructor();
    private initHtml();
    private getFoundation(root);
    private activateNext();
    private deactivateLast();
    /**
     * Show a snackbar/toast message. If a snackbar message is already showing, the new
     * message will be queued to show after earlier message have been shown.
     * The returned <code>MdcSnackbarRef</code> provides methods to subscribe to action clicks.
     *
     * @param message Queue a snackbar message to show.
     */
    show(message: MdcSnackbarMessage): MdcSnackbarRef;
    /**
     * Set this property to true to show snackbars start-aligned instead of center-aligned. Desktop and tablet only.
     */
    startAligned: boolean;
    /**
     * By default the snackbar will be dimissed when the user presses the action button.
     * If you want the snackbar to remain visible until the timeout is reached (regardless of
     * whether the user pressed the action button or not) you can set the dismissesOnAction
     * property to false.
     */
    dismissesOnAction: boolean;
}
/** @docs-private */
export declare function MDC_SNACKBAR_PROVIDER_FACTORY(parent: MdcSnackbarService): MdcSnackbarService;
/** @docs-private */
export declare const MDC_SNACKBAR_PROVIDER: {
    provide: typeof MdcSnackbarService;
    deps: Optional[][];
    useFactory: (parent: MdcSnackbarService) => MdcSnackbarService;
};
