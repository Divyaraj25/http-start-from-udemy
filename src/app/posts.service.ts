import { HttpClient } from "@angular/common/http";

import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content };
        this.http.post('https://http-request-tutorial-udemy-default-rtdb.firebaseio.com/posts.json', postData)
            .subscribe(
                responseData => {
                    console.log(responseData);
                });
    }

    fetchPosts() {
        return this.http.get<{ [key: string]: Post }>('https://http-request-tutorial-udemy-default-rtdb.firebaseio.com/posts.json')
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
        return this.http.delete('https://http-request-tutorial-udemy-default-rtdb.firebaseio.com/posts.json');
    }
}