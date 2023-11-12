import { Component, ViewChild } from '@angular/core';
import { NonReactiveNoteFormComponent } from './non-reactive-note-form/non-reactive-note-form.component';
import { NoteListComponent } from './note-list/note-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  reactiveForms = false;
  @ViewChild(NonReactiveNoteFormComponent)
  nonReactiveNoteForm!: NonReactiveNoteFormComponent;
  @ViewChild(NoteListComponent) noteListComponent!: NoteListComponent;

  handleNoteSaved(): void {
    // Call selectNote function from NoteListComponent
    const lastIndex = this.nonReactiveNoteForm.noteService.getLastNoteIndex();
    this.noteListComponent.selectNote(lastIndex);
  }

  handleNoteSelected(index: number): void {
    // Handle the note selected event, if needed
    console.log('note selected');
  }
}
