import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteFormComponent } from './note-form/note-form.component';
import { NoteService } from './note.service';
import { NonReactiveNoteFormComponent } from './non-reactive-note-form/non-reactive-note-form.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteFormComponent,
    NonReactiveNoteFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
  ],
  providers: [NoteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
