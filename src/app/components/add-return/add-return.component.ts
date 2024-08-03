import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Return } from '../../models/return.model';
import { ReturnService } from '../../services/return.service';

@Component({
  selector: 'app-add-return',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule,MatInputModule, RouterLink, FormsModule],
  templateUrl: './add-return.component.html',
  styleUrl: './add-return.component.css'
})
export class AddReturnComponent implements OnInit {
  returns:Return={
    ReturnId:0,
    ProductId:0,
    CustomerId:0,
    ReturnReason:"",
    ReturnDate:new Date()
  }
  buttonText:string="Save";
    constructor(@Inject(MAT_DIALOG_DATA)  public data:any,
      private srv:ReturnService,
      private dialogRef: MatDialogRef<AddReturnComponent>,
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
      this.returns=res;
      console.log(this.returns)
      this.buttonText="Update";
    }
  })
    }
    SaveData(){
      console.log(this.returns)
      if(this.returns.ReturnId>0)
        {
          this.srv.update(this.returns)
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
          this.srv.create(this.returns)
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
  