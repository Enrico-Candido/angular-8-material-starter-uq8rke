import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import cytoscape from 'cytoscape';
import expandCollapse from 'cytoscape-expand-collapse';
import coseBilkent from 'cytoscape-cose-bilkent';
import cola from 'cytoscape-cola';
import { M } from '@angular/cdk/keycodes';

cytoscape.use(coseBilkent);
cytoscape.use(cola);
expandCollapse(cytoscape);

@Component({
  selector: 'app-network-colapse',
  templateUrl: './network-colapse.component.html',
  styleUrls: ['./network-colapse.component.css'],
})
export class NetworkColapseComponent implements AfterViewInit {
  @Input() initialPositions = {};
  @Input() initialState = {
    positions: {},
    collapse_edges: [],
  };
  @ViewChild('network', { static: false }) network: ElementRef;
  private cy: any;
  private api: any;

  constructor() {}

  add() {
    this.cy.nodes().lock();
    const nu =
      Math.max(
        ...this.cy
          .filter((element) => element.isNode())
          .map((element) => parseInt(element.id().slice(1)))
      ) + 1;
    const nId = 'n' + nu;
    this.cy.add({
      data: { id: nId, parent: 'nparent' },
      position: { x: 20, y: 20 },
    });
    const eu =
      Math.max(
        ...this.cy
          .filter((element) => element.isEdge())
          .map((element) => parseInt(element.id().slice(1)))
      ) + 1;
    const eId = 'e' + eu;
    const pnId = 'n' + (nu - 1);
    this.cy.add({
      data: { id: eId, source: pnId, target: nId, edgeType: 'type1' },
      selectable: true,
      unselectable: false,
    });
    //  const layout = this.cy.layout({name: 'cose-bilkent'});
    const layout = this.cy.layout({ name: 'cola' });
    layout.run();
    layout.stop();
    this.cy.nodes().unlock();
  }

  state() {
    let ret = {
      positions: this.positions(),
      collapse_edges: [],
    };
    this.cy.edges().forEach((edge) => {
      console.log(edge.id() + ' collapsed edges:');
      const collapsedEdges = edge.data('collapsedEdges');
      if (collapsedEdges) {
        if (collapsedEdges.length == 0) {
          return;
        }
        let curr = [];
        collapsedEdges.forEach((collapseEdge) => {
          curr.push(collapseEdge.id());
          //console.log('----<'+ collapseEdge.id() + '> S<' + edge.source().id() + '> T<' + edge.target().id() + '>');
        });
        ret.collapse_edges.push(curr);
      }
    });
    return ret;
  }

  positions() {
    const nodePositions = {};
    this.cy.nodes().forEach((node) => {
      nodePositions[node.id()] = node.position();
    });
    return nodePositions;
  }

  colapsed(): boolean {
    return this.api.collapsed;
  }

  data() {
    console.log(this.cy.elements().jsons());
  }

  ngAfterViewInit() {
    var styles = {
      type1: { color: '#CFA79D', arrowShape: 'triangle' },
      type2: { color: '#9DCFA7', arrowShape: 'triangle' },
      type3: { color: '#A79DCF', arrowShape: 'triangle' },
    };
    var elements = {
      nodes: [
        {
          data: {
            id: 'n0',
            name: 'n0',
          },
        },
        {
          data: {
            id: 'n1',
            name: 'n1',
          },
        },
        {
          data: {
            id: 'n2',
            name: 'n2',
          },
        },
        {
          data: {
            id: 'n3',
            name: 'n3',
          },
        },
        {
          data: {
            id: 'n4',
            name: 'n4',
          },
        },
        {
          data: {
            id: 'n5',
            name: 'n5',
          },
        },
      ],
      edges: [
        {
          data: { id: 'e0', source: 'n0', target: 'n1', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e1', source: 'n0', target: 'n1', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e3', source: 'n1', target: 'n0', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e4', source: 'n2', target: 'n3', edgeType: 'type2' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e5', source: 'n3', target: 'n2', edgeType: 'type2' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e6', source: 'n0', target: 'n3', edgeType: 'type2' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e7', source: 'n1', target: 'n0', edgeType: 'type2' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e8', source: 'n1', target: 'n0', edgeType: 'type2' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e9', source: 'n1', target: 'n0', edgeType: 'type2' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e10', source: 'n3', target: 'n4', edgeType: 'type3' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e11', source: 'n3', target: 'n4', edgeType: 'type1' },
          selectable: false,
          unselectable: false,
        },
        {
          data: { id: 'e12', source: 'n4', target: 'n3', edgeType: 'type3' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e13', source: 'n5', target: 'n1', edgeType: 'type3' },
          selectable: false,
          unselectable: false,
        },
        {
          data: { id: 'e14', source: 'n1', target: 'n5', edgeType: 'type3' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e15', source: 'n2', target: 'n5', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e16', source: 'n2', target: 'n5', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e17', source: 'n2', target: 'n5', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e18', source: 'n2', target: 'n5', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e19', source: 'n2', target: 'n5', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e20', source: 'n2', target: 'n5', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e21', source: 'n2', target: 'n5', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e22', source: 'n2', target: 'n5', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e23', source: 'n2', target: 'n5', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e16', source: 'n2', target: 'n5', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e24', source: 'n2', target: 'n5', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e25', source: 'n2', target: 'n5', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e26', source: 'n2', target: 'n5', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e27', source: 'n2', target: 'n5', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e28', source: 'n2', target: 'n5', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
        {
          data: { id: 'e29', source: 'n2', target: 'n5', edgeType: 'type1' },
          selectable: true,
          unselectable: false,
        },
      ],
    };
    const initial = Object.keys(this.initialState.positions).length == 0;
    if (!initial) {
      //console.log(JSON.stringify(this.initialState.positions));
      elements.nodes.forEach((node) => {
        console.log(
          'N <' +
            node.data.id +
            '> <' +
            (node.data.id in this.initialState.positions) +
            '>'
        );
        if (node.data.id in this.initialState.positions) {
          node['position'] = this.initialState.positions[node.data.id];
          console.log(
            '<' + node.data.id + '> <' + JSON.stringify(node['position']) + '>'
          );
        }
      });
    }

    cytoscape.use(coseBilkent);
    this.cy = cytoscape({
      container: this.network.nativeElement,
      layout: {
        //    name: initial ? 'cose-bilkent' : 'preset',
        name: initial ? 'cola' : 'preset',
        padding: 0,
      },
      //      ready: function() {
      //        var api = this.expandCollapse({
      //          layoutBy: {
      //            name: "cose-bilkent",
      //            animate: "end",
      //            randomize: false,
      //            fit: true
      //          },
      //          cueEnable: false,
      //          fisheye: true,
      //          animate: false,
      //          undoable: false
      //        });
      //        api.collapseAll();
      //			},

      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#dedede',
            label: 'data(id)',
            'text-halign': 'center',
            'text-valign': 'center',
          },
        },

        {
          selector: ':parent',
          style: {
            'background-opacity': 0.333,
          },
        },

        {
          selector: 'edge[edgeType="type1"]',
          style: {
            width: 1,
            'line-color': styles['type1'].color,
            'curve-style': 'bezier',
            'target-arrow-shape': styles['type1'].arrowShape,
            'target-arrow-color': styles['type1'].color,
          },
        },
        {
          selector: 'edge[edgeType="type2"]',
          style: {
            width: 1,
            'line-color': styles['type2'].color,
            'curve-style': 'bezier',
            'target-arrow-shape': styles['type2'].arrowShape,
            'target-arrow-color': styles['type2'].color,
          },
        },
        {
          selector: 'edge[edgeType="type3"]',
          style: {
            width: 1,
            'line-color': styles['type3'].color,
            'curve-style': 'bezier',
            'target-arrow-shape': styles['type3'].arrowShape,
            'target-arrow-color': styles['type3'].color,
          },
        },

        {
          selector: 'edge.cy-expand-collapse-collapsed-edge',
          style: {
            width: function (edge) {
              return (
                1 +
                Math.round(
                  (Math.log(edge.data('collapsedEdges').length) / Math.log(3) +
                    Number.EPSILON) *
                    100
                ) /
                  100
              );
            },
            'line-color': function (edge) {
              if (edge.data('edgeType') == 'unknown') {
                return '#b3b3b3';
              } else {
                return styles[edge.data('edgeType')].color; //edge.data("collapsedEdges")[0].css("line-color");
              }
            },
            'line-style': 'dashed',
            'target-arrow-shape': function (edge) {
              if (edge.data('edgeType') == 'unknown') {
                return 'chevron';
              } else {
                return styles[edge.data('edgeType')].arrowShape; //edge.data("collapsedEdges")[0].css("target-arrow-shape");
              }
            },

            'curve-style': 'bezier',

            'target-arrow-color': function (edge) {
              if (edge.data('edgeType') == 'unknown') {
                return '#b3b3b3';
              } else {
                return styles[edge.data('edgeType')].color;
              }
            },

            'source-arrow-shape': function (edge) {
              if (edge.data('directionType') == 'unidirection') return 'none';
              if (edge.data('edgeType') == 'unknown') {
                return 'chevron';
              } else {
                return styles[edge.data('edgeType')].arrowShape;
              }
            },
            'source-arrow-color': function (edge) {
              if (edge.data('directionType') == 'unidirection')
                return '#b3b3b3';
              if (edge.data('edgeType') == 'unknown') {
                return '#b3b3b3';
              } else {
                return styles[edge.data('edgeType')].color;
              }
            },
          },
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 1,
            'border-color': '#FF00FF',
          },
        },
        {
          selector: 'edge:selected',
          style: {
            width: 1,
            'line-color': '#FF00FF',
            'target-arrow-color': '#FF00FF',
            'source-arrow-color': '#FF00FF',
          },
        },
      ],
      elements: elements,
    });
    //this.cy.dblclick();
    //this.cy.on("dblclick", 'edge', (evt) => {
    //console.log(JSON.stringify(evt.type));
    //console.log("dblclick isE<" + this.api.isExpandable(evt.target) + "> isC<" + this.api.isCollapsible(evt.target) + ">");
    // this.api.expandEdges(evt.target);
    //});
    let clicked: any | null = null;
    let interval = 500;
    this.cy.on('tap', (evt) => {
      if (clicked && clicked === evt.target) {
        clicked = null;
        (evt as any).preventDefault();
        (evt as any).stopPropagation();
        evt.target.emit('dbltap', [evt]);
      } else {
        clicked = evt.target;
        setTimeout(() => {
          if (clicked && clicked === evt.target) {
            clicked = null;
            evt.target.emit('dbltap:timeout', [evt]);
          }
        }, interval);
      }
    });
    this.cy.on('cxttap', (evt) => {
      if (clicked && clicked === evt.target) {
        clicked = null;
        (evt as any).preventDefault();
        (evt as any).stopPropagation();
        evt.target.emit('dblcxttap', [evt]);
      } else {
        clicked = evt.target;
        setTimeout(() => {
          if (clicked && clicked === evt.target) {
            clicked = null;
            evt.target.emit('dblcxttap:timeout', [evt]);
          }
        }, interval);
      }
    });
    this.cy.on('dbltap', 'edge', (evt) => {
      //console.log(JSON.stringify(evt.type));
      //console.log("dblclick isE<" + this.api.isExpandable(evt.target) + "> isC<" + this.api.isCollapsible(evt.target) + ">");
      this.api.expandEdges(evt.target);
    });
    this.cy.on('dbltap', 'node', (evt) => {
      console.log(JSON.stringify(evt.target.data()));
      this.cy.add({
        group: 'nodes',
        data: {
          id: evt.target.data().id + '.1',
          parent: evt.target.data().id,
        },
      });
      //console.log("dblclick isE<" + this.api.isExpandable(evt.target) + "> isC<" + this.api.isCollapsible(evt.target) + ">");
      //this.api.expand([evt.target],{});
      this.api.expandRecursively(this.cy.$(':selected'), {});
    });
    this.cy.on('dblcxttap', 'edge', (evt) => {
      console.log(
        'dblcxttap <' +
          evt.target.data().source +
          '> <' +
          evt.target.data().target +
          '>'
      );
      let sourceNode = this.cy.getElementById(evt.target.data().source);
      let targetNode = this.cy.getElementById(evt.target.data().target);
      this.api.collapseEdgesBetweenNodes([sourceNode, targetNode]);
    });
    this.api = this.cy.expandCollapse({});
    this.api.disableCue();
    const to_collapse = [];
    this.initialState.collapse_edges.forEach((collapsedEdges) => {
      let edges = this.cy.filter((element, i) => {
        const v = element.isEdge() && collapsedEdges.includes(element.id());
        console.log(
          '<' +
            element.id() +
            '> <' +
            element.isEdge() +
            '> <' +
            v +
            '> <' +
            collapsedEdges +
            '>'
        );
        return v;
      });
      console.log(edges.length);
      edges.select();
      to_collapse.push(edges);
    });
    to_collapse.forEach((edges) => this.api.collapseEdges(edges));
  }

  collapseAll() {
    this.api.collapseAllEdges({
      options: {
        groupEdgesOfSameTypeOnCollapse: true,
        allowNestedEdgeCollapse: true,
      },
    });
    return 1;
  }

  expandAll() {
    this.api.expandAllEdges({
      options: {
        groupEdgesOfSameTypeOnCollapse: true,
        allowNestedEdgeCollapse: true,
      },
    });
  }
}
