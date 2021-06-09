import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-selectiondrag',
  templateUrl: './selectiondrag.component.html',
  styleUrls: ['./selectiondrag.component.scss']
})
export class SelectiondragComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.rangeslider();
  }

  async rangeslider(){
    let data = [1960,2000];

  // set width and height of svg
  let w = 400
  let h = 300
  let margin = {top: 130,
                bottom: 135,
                left: 40,
                right: 40}

  // dimensions of slider bar
  let width = w - margin.left - margin.right;
  let height = h - margin.top - margin.bottom;

  // create x scale
  let x = d3.scaleLinear()
    .domain([d3.min(data), d3.max(data)])  // data space
    .range([0, width]);  // display space
  
  // create svg and translated g
  let svg = d3.select('figure#rangeslider').append('svg').attr('width', w).attr('height',h);
  const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`).call(d3.axisBottom(x));

  let labelL = g.append('text')
    .attr('id', 'labelleft')
    .attr('x', 0)
    .attr('y', height + 5)

  let labelR = g.append('text')
    .attr('id', 'labelright')
    .attr('x', 0)
    .attr('y', height + 5)

  // define brush
  let brush = d3.brushX()
    .extent([[0,0], [width, height]])
    .on('brush', function(event,d) {
      let s = event;
      // update and move labels
      labelL.attr('x', s[0])
        .text((x.invert(s[0]).toFixed(2)))
      labelR.attr('x', s[1])
        .text((x.invert(s[1]).toFixed(2)))
      // move brush handles      
      handle.attr("display", null).attr("transform", function(d, i) { return "translate(" + [ s[i], - height / 4] + ")"; });
      // update view
      // if the view should only be updated after brushing is over, 
      // move these two lines into the on('end') part below
      // value = s.map(function(d) {let temp = x.invert(d); return +temp.toFixed(2)});
      // svg.node().dispatchEvent(new CustomEvent("input"));
    })

  // append brush to g
  let gBrush = g.append("g")
      .attr("class", "brush")
      .call(brush)

  // add brush handles (from https://bl.ocks.org/Fil/2d43867ba1f36a05459c7113c7f6f98a)
  let brushResizePath = function(d) {
      let e = +(d.type == "e"),
          x = e ? 1 : -1,
          y = height / 2;
      return "M" + (.5 * x) + "," + y + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6) + "V" + (2 * y - 6) +
        "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y) + "Z" + "M" + (2.5 * x) + "," + (y + 8) + "V" + (2 * y - 8) +
        "M" + (4.5 * x) + "," + (y + 8) + "V" + (2 * y - 8);
  }

  let handle = gBrush.selectAll(".handle--custom")
    .data([{type: "w"}, {type: "e"}])
    .enter().append("path")
    .attr("class", "handle--custom")
    .attr("stroke", "#000")
    .attr("fill", '#eee')
    .attr("cursor", "ew-resize")
    .attr("d", brushResizePath);
    
  // override default behaviour - clicking outside of the selected area 
  // will select a small piece there rather than deselecting everything
  // https://bl.ocks.org/mbostock/6498000
  gBrush.selectAll(".overlay")
    .each(function(d) { d = "selection"; })
    .on("mousedown touchstart", brushcentered)
  
  function brushcentered(event) {
    let dx = x(1) - x(0), // Use a fixed width when recentering.
    cx = event(this)[0],
    x0 = cx - dx / 2,
    x1 = cx + dx / 2;
    d3.select(this.parentNode).call(brush.move, x1 > width ? [width - dx, width] : x0 < 0 ? [0, dx] : [x0, x1]);
  }
  
  // select entire range
  gBrush.call(brush.move, data.map(x))
  // let slider = g.select('#nRadius')
  // .on('onchange', d => {
  //   d3.select('p#value-simple').text('hello')})
  
  }
}
