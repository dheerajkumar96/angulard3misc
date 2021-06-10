import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';
import { ScatterComponent } from './scatter/scatter.component';
import { TreemapComponent } from './treemap/treemap.component';
import { WorldmapComponent } from './worldmap/worldmap.component';
import { SelectiondragComponent } from './selectiondrag/selectiondrag.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { D3chartsComponent } from './d3charts/d3charts.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    PieComponent,
    ScatterComponent,
    TreemapComponent,
    WorldmapComponent,
    SelectiondragComponent,
    PortfolioComponent,
    D3chartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
