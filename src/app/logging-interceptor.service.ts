import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs";

export class loggingInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log('outgoing request');
        console.log(req.url);
        console.log(req.headers);
        console.log(req.headers.get('Auth'));
        return next.handle(req).pipe(
            tap(event => {
                if(event.type === HttpEventType.Response){
                    console.log('incoming response');
                    console.log(event.body);
                }
            })
        )
    }
}