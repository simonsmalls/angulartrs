import {Category} from "./category.model";

export class Activity {
  description:string;
  employeeId: number;
  employeeName:string;
  categoryName: string;
  startTime: Date;
  endTime: Date;
  timeSpent: number;
}
