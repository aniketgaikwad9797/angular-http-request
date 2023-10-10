import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posts } from './post.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  createAndStorePosts(postData: { title: string; content: string }) {
    this.http
      .post<{ name: string }>(
        'https://recipe-shopping-list-f535e-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchPosts() {
    return this.http
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
      );
  }

  deletePosts() {
    return this.http
      .delete(
        'https://recipe-shopping-list-f535e-default-rtdb.firebaseio.com/posts.json'
      )
  }
}
