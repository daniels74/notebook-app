import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseUrl } from '../app.module';
import { BehaviorSubject, map } from 'rxjs';
import { Note } from '../interfaces/note';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    @Inject(BaseUrl) private baseUrl: string
  ) {}

  // notelist
  private noteList!: any[];
  private noteListSubject$ = new BehaviorSubject(this.noteList);
  notes$ = this.noteListSubject$.asObservable();

  // $ Selected Note
  private selectedNote!: Note;
  private selectedNoteSubject$ = new BehaviorSubject(this.selectedNote);
  selectedNote$ = this.selectedNoteSubject$.asObservable();

  getAllNotes() {
    return this.http.get([this.baseUrl, 'notes'].join('/')).pipe(
      map((res: any) => {
        this.noteList = [...res];

        this.noteListSubject$.next(this.noteList);

        console.log('note Service: ', this.noteList);
      })
    );
  }

  postNote(newnote: any) {
    console.log('POSTING: ', newnote);
    return this.http.post([this.baseUrl, 'notes'].join('/'), newnote).pipe(
      map((res) => {
        console.log('NEW POST: ', res);

        this.noteList.push(res);

        this.noteListSubject$.next(this.noteList);
      })
    );
  }

  updateNote(data: any, id: number) {
    return this.http.put([this.baseUrl, 'notes', id].join('/'), data).pipe(
      map((res) => {
        console.log('UPDATED?: ', res);

        this.getAllNotes().subscribe();
      })
    );
  }

  deleteNote(id: number) {
    return this.http.delete([this.baseUrl, 'notes', id].join('/')).pipe(
      map((res) => {
        console.log('DEL: ', res);

        this.getAllNotes().subscribe();
      })
    );
  }

  setSelectedNote(id: number) {
    this.selectedNote = this.noteList.find((note) => note.id === id);
    console.log('Selected: ', this.selectedNote);

    this.selectedNoteSubject$.next(this.selectedNote);
  }

}
