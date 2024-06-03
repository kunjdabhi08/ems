import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DesignationService } from '../designation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Designation } from '../../Models/Designation.model';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-designationtable',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule],
  templateUrl: './designationtable.component.html',
  styleUrl: './designationtable.component.css'
})
export class DesignationtableComponent implements OnInit {
  
  constructor(private desgService: DesignationService, public dialog: MatDialog) {
  }
  designations!: Designation[]
  dataSource = new MatTableDataSource<Designation>();

   
  displayedColumns: string[] = ['id', 'name', 'actions'];
  // dataSource = this.designations;

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  fetchData = ()=> {
    this.desgService.getDesignations().subscribe(data=> {
      this.designations = data.data
      this.dataSource.data = data.data;
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.fetchData()
  }

  public openDialog = (e: number) => {
    const confirmationDialog = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { id: e, isDesignation:true }
    });

    confirmationDialog.afterClosed().subscribe(() => {
      this.fetchData();
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  

  searchRecord = (event) => {
    let search:string = event.target.value;
    if(search.trim().length > 3){
      this.dataSource.data = this.designations.filter((x)=>x.name.toLowerCase().includes(search.trim().toLowerCase()))
    } else {
      this.dataSource.data = this.designations;
    }
  }
}
