import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysOfWeekComponent } from './days-of-week.component';

describe('DaysOfWeekComponent', () => {
  let component: DaysOfWeekComponent;
  let fixture: ComponentFixture<DaysOfWeekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DaysOfWeekComponent]
    });
    fixture = TestBed.createComponent(DaysOfWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
