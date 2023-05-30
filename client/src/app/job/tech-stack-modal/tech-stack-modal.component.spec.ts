import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechStackModalComponent } from './tech-stack-modal.component';

describe('TechStackModalComponent', () => {
  let component: TechStackModalComponent;
  let fixture: ComponentFixture<TechStackModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechStackModalComponent]
    });
    fixture = TestBed.createComponent(TechStackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
