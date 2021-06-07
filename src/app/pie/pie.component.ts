import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { selection } from 'd3';
import { element } from 'protractor';

// Adopted from Basic pie chart example on D3 Graph Gallery:
// https://www.d3-graph-gallery.com/graph/pie_basic.html
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];
  private svg;
  private tooltip;
  private legendHolder;
  private margin = 30;
  private width = 400;
  private height = 300;
  private legendPadding = 20;
  // The radius of the pie chart is half the smallest side
  private radius = (Math.min(this.width, this.height) * 0.3) - this.margin;
  private colors;

  ngOnInit(): void {
    console.log(this.radius)
    this.createSvg(); 
    this.createColors();
    this.drawChart();
    this.createLengend();
    this.createLegends();
  }
 

  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr('class','g-pie')
    .attr(
      "transform",
      "translate(" + (this.radius + this.margin) + "," + (this.height *0.5) + ")"
    );
  }

  private createLengend():void{
        
    this.legendHolder = d3.select("figure#pie svg")
      .append("g")
      .attr("width", this.width/2)
      .attr("height", this.height)
      .attr(
        "transform",
        "translate(" + ((this.radius * 2) + this.margin + this.legendPadding) + "," + (this.height * 0.2) + ")"
      );
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
    .domain(this.data.map(d => d.Stars.toString()))
    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), this.data.length).reverse());
  }

  private drawChart(): void {

    //add tooltips
    // let tooltip = d3.select('figure#pie')
    // .append('div')
    // .attr('class', 'tooltip')
    // .style('display', 'none')

    let tooltip = d3.select('.tooltip')
    .style('display', 'none');

    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.Stars));

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius((this.radius*60)/100)
      .outerRadius(this.radius)
    )
    .attr("cursor","pointer")
    .on('mouseover', function(event,d) {
      tooltip
      .text(d.data.Framework)
      .style('display', 'inline-block')
      .style('position', 'absolute')
      .style('left', event.x + 10 + "px")
      .style('top', event.y + 10 + "px");
      // .style('background-color', 'black')
      // .style('color', 'white')
      // .style('font-family', 'sans-serif')
      // .style('box-shadow', '0 0 5px #999999');
    })
    .on("mousemove", function(event, d) {
      tooltip
      .style('display', 'inline-block')
      .style('position', 'absolute')
     })
    .on('mouseout', d => {
      tooltip.style('display', 'none')
    })
    .attr('fill', (d, i) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "0px");

    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    //add tooltips
   const createtooltip = (d) =>{
      console.log(d.path[0].__data__.data.Framework);
      this.tooltip
      .style('display', 'inline-block')
      .style('position', 'absolute');

    }
    
  }

  private createLegends() : void {
    this.data.forEach((d,i)=> {
      console.log(d);      
      this.legendHolder.append("rect")
      // .attr('class', 'bar')
      .attr('y', (d) => (i+1) * 16)
      .attr('width', 7)
      .attr('fill', this.colors(i))
      .attr('height', 7);

       this.legendHolder.append("text").text(d.Framework)
      // .value(d.Framework)
      // .text('class', 'text')
       .attr('y', (d) => ((i+1) * 16) + 7)
       .attr('x', 15)
       .attr('width', 4)
       .attr('fill', '#3d3938')
       .attr('height', 10)
       .attr('font-size',10)
       .attr("font-weight", "bold");

    });
  }


}
