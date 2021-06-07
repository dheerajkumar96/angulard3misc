import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectiondragComponent } from './selectiondrag.component';

describe('SelectiondragComponent', () => {
  let component: SelectiondragComponent;
  let fixture: ComponentFixture<SelectiondragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectiondragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectiondragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
