import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Vendor } from '../../models/vendor.model';
import { VendorService } from '../../services/vendor.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';

@Component({
  selector: 'app-vendor-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.css'
})
export class VendorListComponent implements OnInit {
  dataList:Vendor[]=[]
  constructor(private srv:VendorService,
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
    const dialogRef = this.dialog.open(AddVendorComponent, 
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
