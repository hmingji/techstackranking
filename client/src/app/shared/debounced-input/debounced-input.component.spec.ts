import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebouncedInputComponent } from './debounced-input.component';

describe('DebouncedInputComponent', () => {
  let component: DebouncedInputComponent;
  let fixture: ComponentFixture<DebouncedInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebouncedInputComponent]
    });
    fixture = TestBed.createComponent(DebouncedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
