import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { interpolateRainbow } from 'd3';
//https://www.d3-graph-gallery.com/graph/treemap_basic.html
@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.scss']
})
export class TreemapComponent implements OnInit {
  private data = [
    {"Framework": "Javascript", "Stars": 0, "Parent": null},
    {"Framework": "React", "Stars": 50793, "Parent": "Javascript"},
    {"Framework": "Angular", "Stars": 62342, "Parent": "Javascript"},
    {"Framework": "Backbone", "Stars": 27647, "Parent": "Javascript"},
    {"Framework": "Ember", "Stars": 21471, "Parent": "Javascript"},
  ];
  private svg;
  private legendHolder;
  private margin = 0;
  private width = 300;
  private height = 170;
  
  private colors;

  ngOnInit(): void {
    this.createSvg();    
   
    this.drawChart();
  }

  private createSvg(): void {
    
    this.svg = d3.select("figure#treemap")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + (this.margin) + "," + (this.margin) + ")"
    );    
  }  

  private drawChart(): void {
    const color = d3.scaleSequential(interpolateRainbow).domain([0, this.data.length])
    .interpolator(d3.interpolateRainbow);
    console.log(this.data.map(d => color(d.Stars)),'treemap');
    var root = d3.stratify()    
      .id(function(d:any={}) { return  d.Framework })
      .parentId(function(d:any={}){return d.Parent})
      (this.data);

    root.sum(function(d:any={}){return d.Stars});

      d3.treemap()
        .size([this.width, this.height])
        .padding(3)
        (root);
        
      console.log(root.leaves());

      
      this.svg.selectAll('rect')
        .data(root.leaves())
        .enter()
        .append('rect')
          .attr('x', d => d.x0)
          .attr('y', d => d.y0)
          .attr('width', d=> d.x1 - d.x0 )
          .attr('height', d=> d.y1 - d.y0 )          
          .attr('fill', d => color(d.data.Stars));

      console.log('after rect');

      this.svg.selectAll('text')
        .data(root.leaves())
        .enter()
        .append('text')
          .attr('x', d => d.x0 + 15)
          .attr('y', d => d.y0 + 15)
          .text(d=> d.data.Framework)
          .attr('fill', '#000')
          .attr('font-size',9)
          .attr("font-weight", "bold");
  } 

}
