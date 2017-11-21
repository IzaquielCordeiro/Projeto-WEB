import { ChangeDetectorRef, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { AbstractMdcTabDirective } from './mdc.tab.directive';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';
export declare class MdcTabRouterDirective extends AbstractMdcTabDirective {
    private router;
    private cdr;
    private onDestroy$;
    _links: QueryList<RouterLink>;
    _linksWithHrefs: QueryList<RouterLinkWithHref>;
    constructor(rndr: Renderer2, root: ElementRef, registry: MdcEventRegistry, router: Router, cdr: ChangeDetectorRef);
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    readonly isActive: boolean;
    private update();
    private hasActiveLinks();
    private isLinkActive(router);
}
