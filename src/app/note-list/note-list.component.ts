import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  @Output() noteSelected: EventEmitter<number> = new EventEmitter<number>();

  notes: Note[] = [];
  selectedNoteIndex: number | null = null;

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    // subscribe to note service for access to the array and functions
    this.noteService.getNotes().subscribe((notes) => (this.notes = notes));
    this.noteService
      .getSelectedNoteIndex()
      .subscribe((index) => (this.selectedNoteIndex = index));
  }

  selectNote(index: number): void {
    this.noteService.selectNote(index);

    // inform parent is a note is selected
    this.noteSelected.emit(index);
  }

  isFavorite(index: number): boolean {
    // check if marked as favorite
    return this.notes[index]?.favorite ?? false;
  }
}
