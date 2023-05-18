import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { SingleNoteComponent } from './components/single-note/single-note.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


export const BaseUrl = new InjectionToken<string>('');

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    SingleNoteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: BaseUrl, useValue: "http://localhost:3000"},
    {provide: ApiService, useClass: ApiService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
