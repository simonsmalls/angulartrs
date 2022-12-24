import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError} from "rxjs";
import { retry, catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Injectable} from "@angular/core";
import {ApiError} from "./api-error";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar){

  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ) : Observable<any> {
    return next.handle(request)
      .pipe(

        catchError((error:HttpErrorResponse) => {
          let errorMessage = "";
          if (error.error instanceof ErrorEvent){
            // client side error
            errorMessage =  `Error: ${error.error.message}`;
            this.snackBar.open(errorMessage, 'X', {panelClass: ['error']});

            return throwError(errorMessage);
          } else {
            // server side error
            //errorMessage =  `Error Code: ${error.status}\nMessage: ${error.message}`;
            //errorMessage += `\nBody: ${error.error.title}`;
            let apiError = new ApiError();
            apiError.title = error.error.title;
            apiError.status = error.error.status;
            apiError.description = error.error.description;
            this.snackBar.open(apiError.toString(), 'X', {panelClass: ['error']});

            return throwError(apiError.toString())
          }
        })
      )
  }
}
