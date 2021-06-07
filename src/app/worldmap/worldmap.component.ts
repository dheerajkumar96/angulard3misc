import { Component, OnInit } from '@angular/core';
import { geoNaturalEarth1, geoPath, geoGraticule, interpolateViridis } from 'd3';
import * as d3 from 'd3';
import * as topojson from 'topojson';

@Component({
  selector: 'app-worldmap',
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.scss']
})
export class WorldmapComponent implements OnInit {

  private projection;
  private path;
  private graticule;
  private svg;

  constructor() { }

  ngOnInit(): void {
    this.projection = geoNaturalEarth1();
    this.path = geoPath(this.projection);
    this.graticule  = geoGraticule();
    this.studentsworldmap();
  }

  async studentsworldmap(){
    let width = 400;
    let height = 250;
    //const parseDate = d3.timeParse('%m/%d/%Y');
   // console.log(parseDate('1/2/2020'));
      let data = Object.assign(await d3.csv(('assets/usecities.csv'),({date:date,name:name,lat:lat,lng:lng}) => ({date:date,name:name,lat:+lat,lng:+lng})));
      console.log(data,'studentworldmap');
      console.log(data.map(d=>d.lat));
      let world = Object.assign(await d3.json('https://unpkg.com/world-atlas@2.0.2/countries-110m.json'));
      console.log(world,'studentworldmap');
      const countries = topojson.feature(world, world.objects.countries);
      console.log(countries,'countries');
      const land = topojson.mesh(world,world.objects.land);
      const projection = d3.geoNaturalEarth1()
      .scale(width / 2 / Math.PI)
    .translate([width/2, height / 2]);
      const path = d3.geoPath(projection);
      const graticule = d3.geoGraticule();

      const colorValue = data.map(d => d.date);
      const colorExtent = d3.extent(data, data.name);
      const colorScale = d3.scaleSequential(interpolateViridis).domain(data);
  const color = d3.scaleOrdinal()
    .domain(data)
    .range(d3.quantize(t => d3.interpolateViridis(t * 0.8 + 0.1), data.length).reverse())
  console.log(data.map(d=>colorScale(d)));
    //   let svg = d3.select("figure#studentworldchart").append("svg")
    // .style("display", "block")
    // .style("height",400)
    // .style("width",550);
    //   svg.append("g")
    //   .selectAll("path")
    //   .data(countries.features)
    //   .enter().append("path")
    //       .attr("fill", "#69b3a2")
    //       .attr("d",path)
    //       .style("stroke", "#fff")

    
    //Add tooltip
    let tooltip = d3.select('.tooltip')
    .style('display', 'none')

    let size = 10;
    this.svg = d3.select("figure#studentworldchart").append("svg")
    .style("display", "block")
    .style("height",300)
    .style("width",450);

   this.svg
    .append('path')
    .attr('fill', '#ddd')
    .attr('d', path(countries));

  this.svg
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', '#fff')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('d', path(land));

    const stateCapitalElements = this.svg
    .selectAll('g')
    .data(data)
    .join('g')
    .attr("cursor","pointer")
    .on('mouseover', function(event,d) {
    console.log(event.x);
    console.log(d.name);
    tooltip
    .text(d.name)
    .style('display', 'inline-block')
    .style('position', 'absolute')
    .style('left', event.x + 10 + "px")
    .style('top', event.y + 10 + "px");
  })
  .on('mouseout', d => {
    tooltip.style('display', 'none')
  });

  const capitalGroups = stateCapitalElements
    .append('g')
    .attr('transform', ({lat,lng}) => `translate(${projection([lng, lat])})`)
    .attr('fill',({name}) => `${color(name)}`);

  capitalGroups.append('circle').attr('r', 2);

  capitalGroups
    .append('text')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .attr('text-anchor', 'middle')
    .attr('y', -6);
  }

}
