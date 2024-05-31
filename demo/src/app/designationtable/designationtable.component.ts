import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DesignationService } from '../designation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Designation } from '../../Models/Designation.model';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-designationtable',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatTableModule],
  templateUrl: './designationtable.component.html',
  styleUrl: './designationtable.component.css'
})
export class DesignationtableComponent implements OnInit {
  
  constructor(private desgService: DesignationService) {
  }
  designations!: Designation[]

   
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = this.designations;


  ngOnInit(): void {
    this.desgService.getDesignations().subscribe(data=> {
      this.designations = data.data
      console.log(data);
    });
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
}
