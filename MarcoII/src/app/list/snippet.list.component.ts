import { Component } from '@angular/core';

@Component({
  selector: 'blox-snippet-list',
  templateUrl: './snippet.list.component.html',
  styleUrls: ['./snippet.list.component.scss']
})
export class SnippetListComponent {
  startDetail = true;
  endDetail = true;
  avatar = false;
  dense = false;
  ripple = false;
}
