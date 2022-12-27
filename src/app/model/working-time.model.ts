import {Time} from "@angular/common";

export class WorkingTime {
  id: number;
  date: Date;
  start: Time;
  end: Time;
  timeWorkedMin: number;
  consultantId: number;
  consultantName: string;
}
