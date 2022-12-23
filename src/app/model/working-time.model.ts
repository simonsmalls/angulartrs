import {Time} from "@angular/common";

export class WorkingTime {
  id: number;
  date: Date;
  start: Time;
  end: Time;
  timeWorked: Time;
  consultantId: number;
  consultantName: string;
}
