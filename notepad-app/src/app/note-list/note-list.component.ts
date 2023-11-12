import { Component, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  selectedNoteIndex: number | null = null;

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe((notes) => (this.notes = notes));
    this.noteService
      .getSelectedNoteIndex()
      .subscribe((index) => (this.selectedNoteIndex = index));
  }

  selectNote(index: number): void {
    this.noteService.selectNote(index);
  }

  isFavorite(index: number): boolean {
    // Add logic to check if the note at the given index is marked as favorite
    return this.notes[index]?.favorite ?? false;
  }
}
