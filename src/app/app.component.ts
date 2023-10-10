import { Component, OnDestroy, OnInit } from '@angular/core';
import { Posts } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = false;
  error = null;
  errorSubscription: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.errorSubscription = this.postsService.errorSubject.subscribe(
      (errorMssg) => {
        this.error = errorMssg;
      }
    );
    this.onFetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    //console.log(postData);
    //If the post observable is not subscribed the request won't even be sent
    this.postsService.createAndStorePosts(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (error) => {
        this.error = error.message;
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
