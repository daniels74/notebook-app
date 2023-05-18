import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Note } from 'src/app/interfaces/note';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  constructor(public api: ApiService) {}

  notes$!: Observable<any[]>;
  notes!: any;

  ngOnInit() {
    this.api.getAllNotes().subscribe();

    this.notes$ = this.api.notes$;

    this.notes = this.notes$.pipe(
      map((a) => {return {...a}})
    )

    console.log("My note list: ", this.notes);
  
  }

  deleteNote(id: number){
    this.api.deleteNote(id).subscribe();

  }

  selectNote(id: number){
    this.api.setSelectedNote(id);
  }
}
