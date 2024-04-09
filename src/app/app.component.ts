import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:Post[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchData();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.http.post('https://http-request-tutorial-udemy-default-rtdb.firebaseio.com/posts.json', postData)
      .subscribe(
        responseData => {
          console.log(responseData);
        });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchData();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchData() {
    this.http.get<{[key: string]: Post}>('https://http-request-tutorial-udemy-default-rtdb.firebaseio.com/posts.json')
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
      .subscribe(
        responseData => {
          console.log(responseData);
          this.loadedPosts = responseData;
        }
      )
  }
}
