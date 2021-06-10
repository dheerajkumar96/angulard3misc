import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { D3chartsComponent } from './d3charts/d3charts.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  { path: '', redirectTo: '/portfolio', pathMatch: 'full' },
  { path: 'portfolio', component: PortfolioComponent},
  { path: 'd3charts', component: D3chartsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }