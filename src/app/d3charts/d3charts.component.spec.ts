import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3chartsComponent } from './d3charts.component';

describe('D3chartsComponent', () => {
  let component: D3chartsComponent;
  let fixture: ComponentFixture<D3chartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3chartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3chartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
