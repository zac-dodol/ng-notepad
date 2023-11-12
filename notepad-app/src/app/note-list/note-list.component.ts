import {
  Component,
  DoCheck,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit, DoCheck {
  @Output() noteSelected: EventEmitter<number> = new EventEmitter<number>();

  notes: Note[] = [];
  selectedNoteIndex: number | null = null;

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe((notes) => (this.notes = notes));
    this.noteService
      .getSelectedNoteIndex()
      .subscribe((index) => (this.selectedNoteIndex = index));
  }

  ngDoCheck(): void {
    console.log(this.notes);
  }

  selectNote(index: number): void {
    this.noteService.selectNote(index);
    this.noteSelected.emit(index);
  }

  isFavorite(index: number): boolean {
    // Add logic to check if the note at the given index is marked as favorite
    return this.notes[index]?.favorite ?? false;
  }
}
