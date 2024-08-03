import { Component, Inject, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';

 
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule,MatInputModule, RouterLink, FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {
  category:Category={
    CategoryId:0,
    CategoryName:"",
    Description:""
  }
  buttonText:string="Save";
    constructor(@Inject(MAT_DIALOG_DATA)  public data:any,
      private srv:CategoryService,
      private dialogRef: MatDialogRef<AddCategoryComponent>,
      private route:ActivatedRoute
    ){}
    ngOnInit(): void {
     var id= this.data;
     console.log(this.data)
     if(id>0)
      {
        this.getByID(id)
      }
    }
    getByID(id:number){
  this.srv.get(id).subscribe({
    next:(res)=>{
      this.category=res;
      console.log(this.category)
      this.buttonText="Update";
    }
  })
    }
    SaveData(){
      console.log(this.category)
      if(this.category.CategoryId>0)
        {
          this.srv.update(this.category)
          .subscribe({
            next:(data)=>{
              console.log(data)
              this.dialogRef.close();
            },
             error:(e)=>{
              console.log(e)
             } 
          })
        }
        else
        { 
          this.srv.create(this.category)
          .subscribe({
            next:(data)=>{
              console.log(data)
              this.dialogRef.close();
            },
             error:(e)=>{
              console.log(e)
             } 
          })}
     
    }
  }
  