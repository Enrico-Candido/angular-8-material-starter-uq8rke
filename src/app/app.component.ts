import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTab } from '@angular/material';
import { NetworkColapseComponent } from './network-colapse/network-colapse.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';
  netValue?: string;
  previous: MatTab = undefined;
  storedPositions = {};
  storedState = {
    positions: {},
    collapse_edges: [],
  };
  storedExpanded = false;
  @ViewChild('graph', { static: false }) graph: NetworkColapseComponent;

  tabChange(event: MatTabChangeEvent) {
    console.log(event.index);
    console.log(event.tab.textLabel);
    if (this.previous != undefined && this.previous.textLabel == 'Graph') {
      this.storedPositions = this.graph.positions();
      this.storedState = this.graph.state();
      console.log('STORE STATE <' + JSON.stringify(this.storedState) + '>');
    }
    this.previous = event.tab;
  }
}
