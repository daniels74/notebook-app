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
  id!: number;

  titleVal!: string;
  noteVal!: string;
  idVal!: number;

  noteSelected: boolean = false;
  isDisabled: boolean = true;

  constructor(public fb: FormBuilder, public api: ApiService) {
    this.api.selectedNote$.subscribe((note) => {
      console.log('SIngle Note: ', note);
      if (note) {
        this.titleHolder = note.title;
        this.noteHolder = note.note;
        this.id = note.id;
        this.noteSelected = true;

        this.titleVal = note.title;
        this.noteVal = note.note;
        this.idVal = note.id;
      } else {
        this.titleHolder = 'Enter Title';
        this.noteHolder = 'Enter Note';
      }
    });

    this.form = this.fb.group({
      title: new FormControl(''),
      note: new FormControl(''),
    });
  }

  // $ FUNCTIONS
  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get note(): FormControl {
    return this.form.get('note') as FormControl;
  }

  revert() {
    this.api.selectedNote$.subscribe((note) => {
      console.log('Reverting: ', note);
      if (note) {
        this.titleHolder = note.title;
        this.noteHolder = note.note;
        this.id = note.id;
        this.noteSelected = true;

        this.titleVal = note.title;
        this.noteVal = note.note;
        this.idVal = note.id;
      }
    });
  }

  clearInputs() {
    // Reset(Blank) form values
    this.form.reset('title');
    this.form.reset('note');

    // Set placeholders for new note
    this.titleHolder = 'Enter Title';
    this.noteHolder = 'Enter Note';

    this.noteSelected = false;
  }

  onSubmit(data: any) {
    if (this.noteSelected) {
      data = {
        id: this.id,
        title: data.title,
        note: data.note,
      };

      this.api.updateNote(data, this.id).subscribe();
    } else {
      this.api.postNote(data).subscribe();
    }

    this.clearInputs();
  }

  toggleDisable() {
    this.isDisabled = !this.isDisabled;
  }
}
