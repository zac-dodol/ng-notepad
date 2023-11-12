import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnInit {
  @Output() noteSaved: EventEmitter<void> = new EventEmitter<void>();

  noteForm: FormGroup;
  showForm = false;

  constructor(private fb: FormBuilder, private noteService: NoteService) {
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
        if (index !== null && index !== undefined) {
          const selectedNote = notes[index];
          this.noteForm.setValue(selectedNote);
          this.showForm = true; // Show the form when a note is selected
        } else {
          this.noteForm.reset();
          this.showForm = false; // Hide the form when no note is selected
        }
      });
    });
  }

  createNewNote(): void {
    this.noteForm.reset();
    this.showForm = true; // Show the form when creating a new note
  }

  saveNote(): void {
    // Mark all controls as touched to trigger validation
    Object.values(this.noteForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.noteForm.valid) {
      const note: Note = this.noteForm.value;

      // Check if the id is null or undefined, then generate a new id
      if (note.id === null || note.id === undefined) {
        note.id = this.generateUniqueId();
      }

      this.noteService.addOrUpdateNote(note);
      this.noteSaved.emit();
      this.showForm = true; // Show the form after saving
    }
  }

  private generateUniqueId(): number {
    // For simplicity, using a timestamp as an example here
    return new Date().getTime();
  }
}
