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
        if (index !== null && index !== undefined) {
          this.note = { ...notes[index] };
          this.showForm = true;
        } else {
          this.note = {
            id: undefined,
            title: '',
            body: '',
            favorite: false,
            color: '',
          };
          this.showForm = false;
        }
      });
    });
  }

  createNewNote(): void {
    this.note = {
      id: undefined,
      title: '',
      body: '',
      favorite: false,
      color: '',
    };
    this.noteService.deselectNote();
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
