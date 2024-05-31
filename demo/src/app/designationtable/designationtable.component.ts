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


@Component({
  selector: 'app-designationtable',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule],
  templateUrl: './designationtable.component.html',
  styleUrl: './designationtable.component.css'
})
export class DesignationtableComponent implements OnInit {
  
  constructor(private desgService: DesignationService) {
  }
  designations!: Designation[]
  dataSource = new MatTableDataSource<Designation>();

   
  displayedColumns: string[] = ['id', 'name', 'actions'];
  // dataSource = this.designations;

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  ngOnInit(): void {
    this.desgService.getDesignations().subscribe(data=> {
      this.designations = data.data
      this.dataSource.data = data.data;
      console.log(data);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteDesignation = (id:number | undefined): void => {
    if(confirm("Are you sure?") && id){
      this.desgService.delelteDesignation(id).subscribe({
        next: () => {
          this.designations = this.designations.filter(x=> x.designationId !== id);
        },
        error: (err: HttpErrorResponse) => {
          alert(err.error);
        }
      })
    } 
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
