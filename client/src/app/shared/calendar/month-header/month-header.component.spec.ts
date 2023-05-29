import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthHeaderComponent } from './month-header.component';

describe('MonthHeaderComponent', () => {
  let component: MonthHeaderComponent;
  let fixture: ComponentFixture<MonthHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthHeaderComponent]
    });
    fixture = TestBed.createComponent(MonthHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
