import { DialogModule } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  /**
   *
   */
  constructor( public dialogRef: MatDialogRef<ConfirmationDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
    
  }

  public deleteRecord(id:number){
    
  }

}
