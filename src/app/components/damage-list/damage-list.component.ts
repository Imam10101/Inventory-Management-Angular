import { Component, OnInit } from '@angular/core';
import { Damage } from '../../models/damage.model';
import { DamageService } from '../../services/damage.service';
import { AddDamageComponent } from '../add-damage/add-damage.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-damage-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './damage-list.component.html',
  styleUrl: './damage-list.component.css'
})
export class DamageListComponent implements OnInit {
  dataList:Damage[]=[]
  constructor(private srv:DamageService,
    public dialog: MatDialog
  ){}
  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.srv.getAll().subscribe({
      next:(result)=>{
        console.log(result)
        this.dataList=result
      },
      error:(er)=>{
        console.log(er)
      }
    })
  }
  openDialog(id?:number): void {
    const dialogConfig= new MatDialogConfig();
  dialogConfig.autoFocus=true;
  dialogConfig.disableClose=true;
  dialogConfig.width="60%",
  dialogConfig.data=id;
    const dialogRef = this.dialog.open(AddDamageComponent, 
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadData();
    });
  }
  delete(id:number){
      this.srv.delete(id).subscribe({
        next:(r)=>{
          console.log(r)
          this.loadData();
        },
        error:(err)=>{
  console.log(err)
        }
      })
  }
  }
