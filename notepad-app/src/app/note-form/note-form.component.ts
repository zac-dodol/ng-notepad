import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnInit {
  noteForm: FormGroup;

  constructor(private fb: FormBuilder, private noteService: NoteService) {
    this.noteForm = this.fb.group({
      id: null,
      title: ['', Validators.required],
      body: ['', Validators.required],
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
        } else {
          this.noteForm.reset();
        }
      });
    });
  }

  saveNote(): void {
    // Mark all controls as touched to trigger validation
    Object.values(this.noteForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.noteForm.valid) {
      const note: Note = this.noteForm.value;
      this.noteService.addOrUpdateNote(note);
    }
  }
}
