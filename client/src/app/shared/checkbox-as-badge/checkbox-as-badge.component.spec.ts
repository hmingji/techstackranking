import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxAsBadgeComponent } from './checkbox-as-badge.component';

describe('CheckboxAsBadgeComponent', () => {
  let component: CheckboxAsBadgeComponent;
  let fixture: ComponentFixture<CheckboxAsBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxAsBadgeComponent]
    });
    fixture = TestBed.createComponent(CheckboxAsBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
