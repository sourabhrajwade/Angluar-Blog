import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from './../post.service';
import { Post } from './../posts.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  posts: Post[] = [];
  isLoading = false;
  totalLength = 10;
  totalPosts = 0;
  postPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userAuthenticated = false;
  userId: string;
  private postSub: Subscription;
  private authStatusSub: Subscription;
  constructor(private postService: PostsService, private authService: AuthService) { }

  ngOnInit(){
    this.isLoading = true;
    this.postService.getPosts(this.postPerPage, this.currentPage);
    this.userid = this.authService.getUserId();
    this.postSub = this.postService.getPostListener()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
    this.userAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userAuthenticated = isAuthenticated;
        this.userid = this.authService.getUserId();
      }
    )
  }
  onChangePage(pageData: PageEvent) {
    this.isLoading = false;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postService.getPosts(this.postPerPage, this.currentPage);
  }
  onDelete(id) {
    this.isLoading = true;
    console.log(id);
    this.postService.deletePost(id).subscribe(() => {
      this.postService.getPosts(this.postPerPage, this.currentPage);
    });

  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }


}
