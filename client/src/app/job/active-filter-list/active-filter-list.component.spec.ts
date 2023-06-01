import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveFilterListComponent } from './active-filter-list.component';

describe('ActiveFilterListComponent', () => {
  let component: ActiveFilterListComponent;
  let fixture: ComponentFixture<ActiveFilterListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveFilterListComponent]
    });
    fixture = TestBed.createComponent(ActiveFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
