import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonReactiveNoteFormComponent } from './non-reactive-note-form.component';

describe('NonReactiveNoteFormComponent', () => {
  let component: NonReactiveNoteFormComponent;
  let fixture: ComponentFixture<NonReactiveNoteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonReactiveNoteFormComponent]
    });
    fixture = TestBed.createComponent(NonReactiveNoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
