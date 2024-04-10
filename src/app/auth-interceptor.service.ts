import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log(req.url);
        const modifiedReq = req.clone({
            headers: req.headers.append('Auth', 'xyz'),
            params: req.params.append('interceptor', 'true')
        })
        console.log(modifiedReq.urlWithParams);
        console.log('request is on its way');
        return next.handle(modifiedReq).pipe(tap(event => {
            console.log(event);
            if(event.type === HttpEventType.Response){
                console.log(event.body);
                console.log(event.type);
                console.log('response received');
            }
        }))
    }
}