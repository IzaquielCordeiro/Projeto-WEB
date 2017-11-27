import { Component } from '@angular/core';

@Component({
  selector: 'blox-snippet-toolbar-flexible',
  templateUrl: './snippet.toolbar.flexible.component.html',
  styleUrls: ['./snippet.toolbar.flexible.component.scss']
})
export class SnippetToolbarFlexibleComponent {
  waterfall = true;
  expansionRatio: number;

  updateExpansionRatio(ratio: number) {
    this.expansionRatio = ratio;
  }
}
