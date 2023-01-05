import { Component } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Activity} from "../../../model/activity.model";
import {ActivityService} from "../../../service/activity.service";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {

  activity: Activity;
  edit: boolean = false;

  control: FormControl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private activityService:ActivityService
  ) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.edit=false;
    if(!isNaN(id))
    {
      this.edit = true;
      this.activityService.getById(id).subscribe((c)=>
      this.activity=c)

    }


    this.control = new FormControl(null, null);
  }

  formChange()
  {
    let cat = this.control.value as string;

  }

}
