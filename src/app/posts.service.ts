import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";

import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content };
        this.http.post('https://http-request-tutorial-udemy-default-rtdb.firebaseio.com/posts.json',
            postData,
            {
                // observe: 'body' // default
                observe: 'response'
            })
            .subscribe(
                responseData => {
                    console.log(responseData);
                });
    }

    fetchPosts() {
        let queryParams = new HttpParams()
        queryParams = queryParams.append('print', 'pretty')
        queryParams = queryParams.append('custom', 'key')

        return this.http.get<{ [key: string]: Post }>('https://http-request-tutorial-udemy-default-rtdb.firebaseio.com/posts.json', {
            headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
            params: queryParams,
            // responseType: 'json' // default
            // responseType:'text'
            // params: new HttpParams().set('print', 'pretty')
        })
            .pipe(map(
                responseData => {
                    const postArray: Post[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return postArray;
                }
            ))
    }

    deletePosts() {
        return this.http.delete('https://http-request-tutorial-udemy-default-rtdb.firebaseio.com/posts.json',
            {
                observe:'events'
            }
        ).pipe(tap(
            event=>{
                console.log(event);
                if(event.type === HttpEventType.Sent){
                    console.log(event);
                    console.log(event.type);
                }
                if(event.type === HttpEventType.Response){
                    console.log(event);
                    console.log(event.type);
                }
            }
        ))
    }
}