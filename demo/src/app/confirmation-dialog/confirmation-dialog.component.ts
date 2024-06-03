import { DialogModule } from '@angular/cdk/dialog';
import { Component, Inject, Output } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter } from 'stream';
import { forkJoin } from 'rxjs';
import { DesignationService } from '../designation.service';
import { ResponseModel } from '../../Models/Response.model';
@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {

  isDeleted!: boolean;

  constructor( public dialogRef: MatDialogRef<ConfirmationDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private empService: EmployeeService, private desgService: DesignationService) {
    
    }


  public deleteRecord(){
    var id = this.data.id;
    if(!this.data.isDesignation){

      this.empService.deleteEmployee(id).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: (err: HttpErrorResponse) => {
          alert("Error deleting employee");
        }
      });
    } else {
      this.desgService.delelteDesignation(id).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: (err: ResponseModel<null>) => {
          alert(err.message);
        }
      })
    }
  }

}
