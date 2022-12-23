import {Category} from "./category.model";

export class Activity {
  description:string;
  projectName:string  ;
  projectId:number;
  employeeId: number;
  employeeName:string;
  categoryName: string;
  startTime: Date;
  endTime: Date;
  timeSpent: number;
}
