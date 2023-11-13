import { Component, ViewChild } from '@angular/core';
import { NonReactiveNoteFormComponent } from './non-reactive-note-form/non-reactive-note-form.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteFormComponent } from './note-form/note-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  reactiveForms = false;
  nonReactiveForm = true;

  @ViewChild(NonReactiveNoteFormComponent)
  nonReactiveNoteForm!: NonReactiveNoteFormComponent;
  @ViewChild(NoteFormComponent) noteForm!: NoteFormComponent;
  @ViewChild(NoteListComponent) noteListComponent!: NoteListComponent;

  handleNoteSaved(savedFrom: 'nonReactiveNoteForm' | 'noteForm'): void {
    // Call selectNote function from NoteListComponent based on the saved form
    const lastIndex =
      savedFrom === 'nonReactiveNoteForm'
        ? this.nonReactiveNoteForm.noteService.getLastNoteIndex()
        : this.noteForm.noteService.getLastNoteIndex();

    if (lastIndex !== undefined) {
      this.noteListComponent.selectNote(lastIndex);
    }
  }

  handleNoteSelected(index: number): void {
    // Handle the note selected event, if needed
    console.log('note selected');
  }
}
