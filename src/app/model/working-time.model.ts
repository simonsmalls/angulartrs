import {Time} from "@angular/common";

export class WorkingTime {
  id: number;
  date: Date;
  startTime: Time;
  endTime: Time;
  timeWorkedMin: number;
  consultantId: number;
  consultantName: string;
}
