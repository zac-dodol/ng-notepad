import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteFormComponent } from './note-form/note-form.component';
import { NoteService } from './note.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, NoteListComponent, NoteFormComponent],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule],
  providers: [NoteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
