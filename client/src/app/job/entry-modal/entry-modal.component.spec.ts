import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryModalComponent } from './entry-modal.component';

describe('EntryModalComponent', () => {
  let component: EntryModalComponent;
  let fixture: ComponentFixture<EntryModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntryModalComponent]
    });
    fixture = TestBed.createComponent(EntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
