import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-non-reactive-note-form',
  templateUrl: './non-reactive-note-form.component.html',
  styleUrls: ['./non-reactive-note-form.component.scss'],
})
export class NonReactiveNoteFormComponent implements OnInit {
  @Output() noteSaved: EventEmitter<void> = new EventEmitter<void>();

  note: Note = {
    id: undefined,
    title: '',
    body: '',
    favorite: false,
    color: '',
  };

  showForm = false;

  constructor(public noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe((notes) => {
      this.noteService.getSelectedNoteIndex().subscribe((index) => {
        // Show selected note or empty form
        if (index !== null && index !== undefined) {
          this.note = { ...notes[index] };

          // Show the form when a note is selected
          this.showForm = true;
        } else {
          this.note = {
            id: undefined,
            title: '',
            body: '',
            favorite: false,
            color: '',
          };

          // Hide the form when no note is selected
          this.showForm = false;
        }
      });
    });
  }

  createNewNote(): void {
    // reset form
    this.note = {
      id: undefined,
      title: '',
      body: '',
      favorite: false,
      color: '',
    };

    // deselect if note was selected prior
    this.noteService.deselectNote();

    // Show the form when creating a new note
    this.showForm = true;
  }

  saveNote(): void {
    if (this.note.id !== null && this.note.id !== undefined) {
      // Update existing note
      this.noteService.addOrUpdateNote(this.note);
    } else {
      // Generate a unique id for a new note
      this.note.id = this.generateUniqueId();

      // Add new note
      this.noteService.addOrUpdateNote({ ...this.note });
    }

    // Show the form after saving
    this.showForm = true;
    this.noteSaved.emit();
  }

  private generateUniqueId(): number {
    // using timestamp
    return new Date().getTime();
  }
}
