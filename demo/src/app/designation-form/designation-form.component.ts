import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Designation } from '../../Models/Designation.model';
import { DesignationService } from '../designation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from '../../Models/Response.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-designation-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './designation-form.component.html',
  styleUrl: './designation-form.component.css'
})
export class DesignationFormComponent implements OnInit{
  id = this.route.snapshot.paramMap.get('id') as number | null;
  title:string = "Add Designation"

  constructor(private desgServive: DesignationService, private router: Router, private route:ActivatedRoute, private location: Location) {
    if(this.id){
      this.title = "Edit Designation"
    }
  }

  designationForm!: FormGroup;

  ngOnInit(): void {
    if(this.id){
      this.desgServive.getDesignationById(this.id).subscribe(
      {
        next: (data:ResponseModel<Designation>)=>{
          this.designationForm.patchValue({
            id: data.data.designationId,
            name: data.data.name
          })
        },
        error:(err:HttpErrorResponse)=>{
          alert(err.message)
        }
      }
    );
    }

    this.designationForm = new FormGroup({
      'id': new FormControl(null),
      'name': new FormControl(null, Validators.required)
    })

  }

  goBack = ():void=>{
    this.location.back();
  }


  onSubmit = ():void => {
    this.designationForm.markAllAsTouched();
    if(this.designationForm.valid){
      if(this.id){  
        this.desgServive.editDesignation(this.designationForm.value).subscribe({
          next: ()=>{
            this.router.navigate(["/designations"])
          },
          error: (err: HttpErrorResponse)=>{
            alert(err.message)
          }
        });
      } else {
        this.desgServive.addDesignation(this.designationForm.value).subscribe({
          next: ()=>{
            this.router.navigate(["/designations"])
          },
          error: (err: HttpErrorResponse)=>{
            alert(err.message)
          }
        });
      }
    }
  }
}
