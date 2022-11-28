import { AfterContentInit, AfterViewInit, Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/features/models/category';

@Component({
  templateUrl: './add-book.modal.html',
  styleUrls: ['add-book.modal.scss'],

})
export class AddBookComponent implements OnInit {
  submitted: boolean = false;
  selected : Category[] = [];
 
  
  returnValue!: string;
  form = this.fb.group({
    ImageUrl: ['', Validators.required],
    Title: ['', Validators.required],
    Author: ['', Validators.required],
    Year: ['', Validators.required],
    Categories: [this.selected,Validators.required],
    ISBN: ['', Validators.required],
    Description: ['', Validators.required]

  });

  

  constructor( private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    }
  
  



  

  ngOnInit(): void {
    if(this.data.book != null)
    {
      this.selectedValues();
      this.form?.patchValue(this.data.book);
      this.form?.controls['Categories'].patchValue(this.selected);
    }

    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.onCancelClick();
      }
    });

    this.dialogRef.backdropClick().subscribe(() => {
      this.onCancelClick();
    });
    
  }

  selectedValues(){
    this.data.book.Categories.forEach((c) => {
      let index = this.data.categories.findIndex(x => x.id == c.id)
       if(index != null)
       {
        console.log(index)
        this.selected.push(this.data.categories[index])
       }
   });
  }


  onCancelClick(): void {
    this.dialogRef.close(this.data);
  }

  onSubmit(){
    const control=this.form.get('Categories');
    console.log(control)
    this.data.book = this.form.value;
    console.log(this.data.book)
    this.onCancelClick();
  }
}

