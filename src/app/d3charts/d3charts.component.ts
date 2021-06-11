import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-d3charts',
  templateUrl: './d3charts.component.html',
  styleUrls: ['./d3charts.component.scss']
})
export class D3chartsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
