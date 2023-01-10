import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivityService} from "../../../service/activity.service";
import {ConsultantService} from "../../../service/consultant.service";
import {WorkingTime} from "../../../model/working-time.model";


@Component({
  selector: 'app-popup-delete',
  templateUrl: './popup-delete.component.html',
  styleUrls: ['./popup-delete.component.css']
})
export class PopupDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupDeleteComponent>,
  @Inject(MAT_DIALOG_DATA)
  public data: WorkingTime,
  private consultantService:ConsultantService,
) {

}

onNoClick(): void {
  this.dialogRef.close();
}

delete(){
  this.consultantService.deleteWorkingTime(this.data)
    .subscribe(() => {

    });
  this.dialogRef.close();
}

}
