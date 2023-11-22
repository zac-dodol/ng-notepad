import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../note.model';
import { NoteService } from '../note.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnInit {
  @Output() noteSaved: EventEmitter<void> = new EventEmitter<void>();

  noteForm: FormGroup;
  showForm = false;

  constructor(private fb: FormBuilder, public noteService: NoteService) {
    this.noteForm = this.fb.group({
      id: null,
      title: ['', Validators.required],
      body: '',
      favorite: false,
      color: 'yellow',
    });
  }

  ngOnInit(): void {
    this.noteService.getNotes().subscribe((notes) => {
      this.noteService.getSelectedNoteIndex().subscribe((index) => {
        // Show selected note or empty form
        if (index !== null && index !== undefined) {
          const selectedNote = notes[index];
          this.noteForm.setValue(selectedNote);

          // Show the form when a note is selected
          this.showForm = true;
        } else {
          this.noteForm.reset();

          // Hide the form when no note is selected
          this.showForm = false;
        }
      });
    });
  }

  createNewNote(): void {
    // reset form
    this.noteForm.reset();

    // deselect if note was selected prior
    this.noteService.deselectNote();

    // Show the form when creating a new note
    this.showForm = true;
  }

  saveNote(): void {
    // Mark all controls as touched to trigger validation
    Object.values(this.noteForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    // save note if form input all valid
    if (this.noteForm.valid) {
      const note: Note = this.noteForm.value;

      // Check if the id is null or undefined, then generate a new id
      if (note.id === null || note.id === undefined) {
        note.id = this.generateUniqueId();
      }

      // update note if ID exist
      this.noteService.addOrUpdateNote(note);
      this.noteSaved.emit();

      // Show the form after saving
      this.showForm = true;
    }
  }

  private generateUniqueId(): number {
    // using timestamp
    return new Date().getTime();

    // returns string, need to change for both type of forms
    // Generate a Version 4 (random) UUID
    // return uuidv4();
  }
}
