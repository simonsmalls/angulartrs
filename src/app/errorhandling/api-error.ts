export class ApiError {
  title: string;
  status: number;
  description: string;
  type: string;
  instance: string;
  //list of validation errors

  toString(){
    return `Something went wrong! ${this.title} - ${this.description}`;
  }
}
