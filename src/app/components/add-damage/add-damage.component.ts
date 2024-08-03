import { Component, Inject, OnInit } from '@angular/core';
import { Damage } from '../../models/damage.model';
import { DamageService } from '../../services/damage.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-damage',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule,MatInputModule, RouterLink, FormsModule],
  templateUrl: './add-damage.component.html',
  styleUrl: './add-damage.component.css'
})
export class AddDamageComponent implements OnInit {
  damage:Damage={
    DamageId:0,
    ProductId:0,
    DamageDescription:""
  }
  buttonText:string="Save";
    constructor(@Inject(MAT_DIALOG_DATA)  public data:any,
      private srv:DamageService,
      private dialogRef: MatDialogRef<AddDamageComponent>,
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
      this.damage=res;
      console.log(this.damage)
      this.buttonText="Update";
    }
  })
    }
    SaveData(){
      console.log(this.damage)
      if(this.damage.DamageId>0)
        {
          this.srv.update(this.damage)
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
          this.srv.create(this.damage)
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
  