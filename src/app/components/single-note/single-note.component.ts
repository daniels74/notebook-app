import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Note } from 'src/app/interfaces/note';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss'],
})
export class SingleNoteComponent {
  form: FormGroup;
  titleHolder!: string;
  noteHolder!: string;

  constructor(public fb: FormBuilder, public api: ApiService) {
    this.form = this.fb.group({
      title: new FormControl(''),
      note: new FormControl(''),
    })

    this.api.selectedNote$.subscribe((note)=>{
      console.log("SIngle Note: ", note);
      if(this.noteHolder){
        this.titleHolder = note.title;
        this.noteHolder = note.note;
      } else {
        this.titleHolder = "Enter Title";
        this.noteHolder = "Enter Note";
      }
      
    })
  }

  // $ FUNCTIONS
  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get note(): FormControl {
    return this.form.get('note') as FormControl;
  }


  onSubmit(data: any) {
    console.log(data);

    this.api.postNote(data).subscribe();
  }
}
