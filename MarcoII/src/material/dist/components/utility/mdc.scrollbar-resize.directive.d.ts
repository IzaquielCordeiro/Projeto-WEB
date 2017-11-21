import { OnDestroy } from '@angular/core';
/**
 * Utility directive to trigger window 'resize' events not only when the browser window
 * is resized, but also when the browser window gets a vertical scrollbar.
 * This solves problems with directives that base their layout or position on the
 * width of the document body. When a scrollbar is added, the body width changes, but the browser
 * doesn't fire a 'resize' (or other) event. As long as at least one <code>mdcScrollbarResize</code>
 * directive is active on the page, 'resize' events will also be fired when the body width changes
 * as a consequence of the addition or removal of a vertical toolbar.
 * The directive adds a hidden iframe to the page, that contains the trickery to make this happen.
 * See this <a href="https://gist.github.com/OrganicPanda/8222636">hacky-scrollbar-resize-listener.js
 * github gist</a> for the original idea.
 */
export declare class MdcScrollbarResizeDirective implements OnDestroy {
    private _scrollbarResize;
    constructor();
    ngOnDestroy(): void;
    /**
     * Set to false to disable triggering resize events because of addition/deletion of a scrollbar.
     * The <code>mdcScrollbarResize</code> behavior is removed after <strong>all</strong>
     * <code>mdcScrollbarResize</code> directives on the page are removed or have the value false.
     */
    mdcScrollbarResize: any;
}
