import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionableBadgeComponent } from './actionable-badge.component';

describe('ActionableBadgeComponent', () => {
  let component: ActionableBadgeComponent;
  let fixture: ComponentFixture<ActionableBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionableBadgeComponent]
    });
    fixture = TestBed.createComponent(ActionableBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
