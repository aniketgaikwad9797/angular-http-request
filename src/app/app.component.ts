import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get(
        'https://recipe-shopping-list-f535e-default-rtdb.firebaseio.com/posts.json'
      )
      .subscribe((posts) => {
        console.log(posts);
      });
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    //console.log(postData);
    //If the post observable is not subscribed the request won't even be sent
    this.http
      .post(
        'https://recipe-shopping-list-f535e-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.http
      .get(
        'https://recipe-shopping-list-f535e-default-rtdb.firebaseio.com/posts.json'
      )
      .subscribe((posts) => {
        console.log(posts);
      });
  }

  onClearPosts() {
    // Send Http request
  }
}
