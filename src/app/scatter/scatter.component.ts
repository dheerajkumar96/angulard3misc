import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { interpolateRainbow, interpolateViridis } from 'd3';

// Adopted from Scatterplot example on D3 Graph Gallery:
// https://www.d3-graph-gallery.com/graph/scatter_tooltip.html
@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.scss']
})
export class ScatterComponent implements OnInit {
  private data = [
    {"Framework": "Vue", "Stars": 166443, "Released": "2014"},
    {"Framework": "React", "Stars": 150793, "Released": "2013"},
    {"Framework": "Angular", "Stars": 62342, "Released": "2016"},
    {"Framework": "Backbone", "Stars": 27647, "Released": "2010"},
    {"Framework": "Ember", "Stars": 21471, "Released": "2011"},
  ];
  private svg;
  private margin = 50;
  private width = 500 - (this.margin * 2);
  private height = 200 - (this.margin * 2);

  ngOnInit(): void {
    this.createSvg();
    this.drawPlot();
  }

  private createSvg(): void {

    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawPlot(): void {

    const color = d3.scaleSequential(interpolateRainbow).domain([0, d3.max(this.data, d => d.Stars)])
    .interpolator(d3.interpolateRainbow);
    // Add X axis
    const x = d3.scaleLinear()
    .domain([2009, 2017])
    .range([ 0, this.width ]);
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, 200000])
    .range([ this.height, 0]);
    this.svg.append("g")
    .call(d3.axisLeft(y));

    //Add tooltip
    // let tooltip = d3.select('figure#scatter')
    // .append('div')
    // .attr('class', 'tooltip')
    // .style('display', 'none')

    let tooltip = d3.select('.tooltip');
    // Add dots
    const dots = this.svg.append('g');

    dots.selectAll("dot")
    .data(this.data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.Released))
    .attr("cy", d => y(d.Stars))
    .attr("r", 7)
    .style("opacity", .5)
    .style("fill", (d) => { return color(d.Stars)})
    .attr("cursor","pointer")
    .on('mouseover', function(event,d) {
      tooltip
      .html('Framework : ' + d.Framework + '<br/>'+ 'Stars : '+d.Stars + '<br/>' + 'Released :' +d.Released)
      .style('display', 'inline-block')
      .style('position', 'absolute')
      .style('left', event.x + 10 + "px")
      .style('top', event.y + 10 + "px");
    })
    .on('mouseout', d => {
      tooltip.style('display', 'none')
    });

    // dots.selectAll("text")
    // .data(this.data)
    // .enter()
    // .append("text")
    // .text(d => d.Framework)
    // .attr("x", d => x(d.Released))
    // .attr("y", d => y(d.Stars))
  }
}
