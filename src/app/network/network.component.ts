import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import cytoscape from 'cytoscape';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css'],
})
export class NetworkComponent implements AfterViewInit {
  @ViewChild('network', { static: false }) network: ElementRef;
  cy: cytoscape.Core;

  constructor() {}

  ngAfterViewInit_old() {
    this.cy = cytoscape({
      container: this.network.nativeElement,
      elements: {
        nodes: [
          {
            data: { id: 'a' },
          },
          {
            data: { id: 'b' },
          },
        ],
        edges: [
          // {
          //   data: { id: 'ab', source: 'a', target: 'b' }
          // },
          {
            data: { source: 'a', target: 'a' },
          },
        ],
      },
      style: cytoscape
        .stylesheet()
        .selector('core')
        .css({
          'active-bg-size': 0,
        })
        .selector('node')
        .css({
          height: 80,
          width: 80,
          'background-fit': 'cover',
          'border-color': '#000',
          'border-width': 3,
          'border-opacity': 0.5,
        })
        .selector('edge')
        .css({
          'curve-style': 'bezier',
          width: 6,
          'target-arrow-shape': 'triangle',
          'line-color': '#ffaaaa',
          'target-arrow-color': '#ffaaaa',
          'control-point-step-size': 70,
          'loop-direction': '0deg',
          'loop-sweep': '-90deg',
        }),
      layout: {
        name: 'grid',
        rows: 1,
      },
    });
  }

  ngAfterViewInit() {
    this.cy = cytoscape({
      container: this.network.nativeElement,

      boxSelectionEnabled: false,

      style: [
        {
          selector: 'node',
          css: {
            content: 'data(id)',
            'text-valign': 'center',
            'text-halign': 'center',
          },
        },
        {
          selector: ':parent',
          css: {
            'text-valign': 'top',
            'text-halign': 'center',
          },
        },
        {
          selector: 'edge',
          css: {
            width: 'data(width)',
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
          },
        },
      ],

      elements: {
        nodes: [
          { data: { id: 'a', parent: 'b' }, position: { x: 215, y: 85 } },
          { data: { id: 'b' } },
          { data: { id: 'c', parent: 'b' }, position: { x: 300, y: 85 } },
          { data: { id: 'd' }, position: { x: 215, y: 175 } },
          { data: { id: 'e' } },
          { data: { id: 'f', parent: 'e' }, position: { x: 300, y: 175 } },
        ],
        edges: [
          { data: { id: 'ad', source: 'a', target: 'd', width: 1 } },
          { data: { id: 'eb', source: 'e', target: 'b', width: 3 } },
        ],
      },

      layout: {
        name: 'preset',
        padding: 5,
      },
    });
  }
}
