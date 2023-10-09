import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Posts } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchRequest();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    //console.log(postData);
    //If the post observable is not subscribed the request won't even be sent
    this.http
      .post<{name: string}>(
        'https://recipe-shopping-list-f535e-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchRequest();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchRequest() {
    this.http
      .get(
        'https://recipe-shopping-list-f535e-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((data) => {
          const postsData: Posts[] = [];
          for (const key in data) {
            if (data.hasOwnProperty(key))
              postsData.push({ ...data[key], id: key });
          }
          return postsData;
        })
      )
      .subscribe((posts) => {
        console.log(posts);
      });
  }
}
