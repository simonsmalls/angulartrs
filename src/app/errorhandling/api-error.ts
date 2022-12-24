export class ApiError {
  title: string;
  status: number;
  description: string;
  type: string;
  instance: string;
  //list of validation errors

  toString(){
    return `Error: ${this.title}\nStatus: ${this.status}\nDescription: ${this.description}\n`;
  }
}
