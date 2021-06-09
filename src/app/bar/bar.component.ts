import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import { interpolateBlues, interpolateRainbow } from 'd3';

// Adopted from Basic barplot example on D3 Graph Gallery:
// https://www.d3-graph-gallery.com/graph/barplot_basic.html
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  private data = [
    {"Framework": "Vue", "Stars": 166443, "Released": "2014"},
    {"Framework": "React", "Stars": 150793, "Released": "2013"},
    {"Framework": "Angular", "Stars": 62342, "Released": "2016"},
    {"Framework": "Backbone", "Stars": 27647, "Released": "2010"},
    {"Framework": "Ember", "Stars": 21471, "Released": "2011"}
  ];
 
  private margin1 = 50;
  private width = 800 - (this.margin1 * 2);
  private height = 600 - (this.margin1 * 2);
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  x: any;
  y: any;
  svg: any;
  g: any;

  ngOnInit(): void {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();

    // Parse data from a CSV
    // d3.csv("/assets/frameworks.csv").then(data => this.drawBars(data));

    // Fetch JSON from an external endpoint
    // d3.json('https://api.jsonbin.io/b/5eee6a5397cb753b4d149343').then(data => this.drawBars(data));
  }

  private initSvg(): void {
    this.svg = d3.select('figure#bar')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  initAxis() {
    this.x = d3Scale.scaleLinear().range([0, this.width]);
    this.y = d3Scale.scaleBand().range([0, this.height]).padding(0.5);
    this.x.domain([0, d3Array.max(this.data, (d) => d.Stars)]);
    this.y.domain(this.data.map((d) => d.Framework));
   //console.log(this.data.map((d) => d.Stars));
    //console.log(this.y.domain());
  }

  drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')');

    this.g.append('g')
      .attr('class', 'axis axis--y')
      
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 7)
      .attr('dy', '0.81em')
      .attr('text-anchor', 'end')
  }

  drawBars() {
    const color = d3.scaleSequential(interpolateRainbow).domain([0, d3.max(this.data, d => d.Stars)])
    .interpolator(d3.interpolateRainbow);
    let colors = this.data.map(d => color(d.Stars));
    console.log(this.data.map(d => color(d.Stars)));
    const barContainers = this.g.selectAll('.bar')
                          .data(this.data).enter().append('g');
    const total = d3.sum(this.data, d=> Number(d.Stars));
    barContainers.append('rect')
      .attr('class', 'background-bar')
      //.attr('x', (d) => this.x(d.Stars))
      .attr('y', (d) => this.y(d.Framework))
      .attr('width', '100%')
      .attr('fill', '#ccffff')
      .attr('height', this.y.bandwidth());

    barContainers.append('rect')
      .attr('class', 'bar')
      //.attr('x', (d) => this.x(d.Stars))
      .attr('y', (d) => this.y(d.Framework))
      //.attr('width', (d) => this.x(d.Stars))
      .attr('width', (d) => { return ((Number(d.Stars)/total)*100) + '%';})
      .attr('fill', (d) => { return color(d.Stars)})
      .attr('height', this.y.bandwidth());

    barContainers.append('text')
      .attr('class','text')
      .attr('y', (d) => this.y(d.Framework)-5)
      .text((d) => d.Framework)
      .attr('font-size',22)
      .attr("font-weight", "bold");

    //console.log(total);
    barContainers.append('text')
      .attr('class','text-percent')
      .attr('y', (d) => this.y(d.Framework)-5)
      .attr('x', this.width )
      .text((d) =>{ return d.Stars + '('+ ((Number(d.Stars)/total)*100).toFixed(2) +'%)';})
      .attr("font-weight", "bold");
  }
}
