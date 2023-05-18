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

  // private allLocal!: any[];
  // private allLocalSubject$ = new BehaviorSubject(this.allLocal);
  // allLocal$ = this.noteListSubject$.asObservable();

  getAllNotes() {
    return this.http.get([this.baseUrl, 'notes'].join('/')).pipe(
      map((res: any) => {
        this.noteList = [...res];

        this.noteListSubject$.next(this.noteList);

        console.log('note Service: ', this.noteList);
      })
    );
  }

  //   allStorage() {
  //     //localStorage.setItem('first', "HELLOO");
  //     localStorage.removeItem('first');
  //     let values = [],
  //         keys = Object.keys(localStorage),
  //         i = keys.length;

  //     while ( i-- ) {
  //         values.push( localStorage.getItem(keys[i]) );
  //     }

  //     this.allLocal = values;
  //     console.log("VALUES: ", values);
  //     return this.allLocalSubject$.next(this.allLocal);
  // }

  postNote(newnote: any) {
    return this.http.post([this.baseUrl, 'notes'].join('/'), newnote).pipe(
      map((res)=> {
        console.log("NEW POST: ", res);

        this.noteList.push(res);

        this.noteListSubject$.next(this.noteList);

      })
    ) 
  }

  deleteNote(id: number){
    return this.http.delete([this.baseUrl, "notes", id].join("/")).pipe(
      map((res)=>{
        console.log("DEL: ", res);

        this.getAllNotes().subscribe();
      })
    )
  }

  setSelectedNote(id: number){
    this.selectedNote = this.noteList.find(note => note.id === id);
    console.log("Selected: ", this.selectedNote);

    this.selectedNoteSubject$.next(this.selectedNote)
  }
}
