import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes: Note[] = [
    {
      id: 1,
      title: 'Mock Title',
      body: 'mock body',
      favorite: true,
      color: '#ff0000',
    },
  ];

  private selectedNoteIndexSubject: BehaviorSubject<number | null> =
    new BehaviorSubject<number | null>(null);

  getNotes(): Observable<Note[]> {
    return new BehaviorSubject<Note[]>(this.notes).asObservable();
  }

  getSelectedNoteIndex(): Observable<number | null> {
    return this.selectedNoteIndexSubject.asObservable();
  }

  selectNote(index: number): void {
    this.selectedNoteIndexSubject.next(index);
  }

  deselectNote(): void {
    this.selectedNoteIndexSubject.next(null);
  }

  addOrUpdateNote(note: Note): void {
    const existingNoteIndex = this.selectedNoteIndexSubject.value;

    if (existingNoteIndex !== null && existingNoteIndex !== undefined) {
      // Update existing note
      this.notes[existingNoteIndex] = note;
    } else {
      // Add new note
      this.notes.push(note);
    }

    // Clear selection
    this.selectedNoteIndexSubject.next(null);
  }

  getLastNoteIndex(): number {
    return this.notes.length - 1;
  }
}
