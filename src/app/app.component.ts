import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isFetching = false;
  loadedPosts: Post[] = [];
  @ViewChild('postForm') form:NgForm

  constructor(private http: HttpClient, private postService: PostsService) { }

  ngOnInit() {
    this.isFetching = true
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false
      this.loadedPosts = posts
    })
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.postService.createAndStorePost(postData.title, postData.content)
    this.form.reset()
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false
      this.loadedPosts = posts
    })
  }

  onClearPosts() {
    this.isFetching = true
    // Send Http request
    this.postService.deletePosts().subscribe(()=>{
      this.isFetching = false
      this.loadedPosts = []
    })
  }
}
