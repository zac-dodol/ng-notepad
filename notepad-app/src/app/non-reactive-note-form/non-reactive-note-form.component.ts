import { Component, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-non-reactive-note-form',
  templateUrl: './non-reactive-note-form.component.html',
  styleUrls: ['./non-reactive-note-form.component.scss'],
})
export class NonReactiveNoteFormComponent implements OnInit {
  note: Note = {
    id: undefined,
    title: '',
    body: '',
    favorite: false,
    color: '',
  };
  showForm = false;
  formSubmitted = false;

  constructor(private noteService: NoteService) {}

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
    this.showForm = true;
  }

  saveNote(): void {
    this.formSubmitted = true;
    if (this.note.id !== null && this.note.id !== undefined) {
      // Update existing note
      this.noteService.addOrUpdateNote(this.note);
    } else {
      // Add new note
      this.noteService.addOrUpdateNote({ ...this.note });
    }
    this.showForm = true; // Show the form after saving
  }
}
