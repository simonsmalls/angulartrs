import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivityService} from "../../service/activity.service";

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.css']
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: number,
    private activityService:ActivityService
  ) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(){
    this.activityService.deleteActivityById(this.data).subscribe((c)=>{

    })
    this.dialogRef.close();
  }


}
