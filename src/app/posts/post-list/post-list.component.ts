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
  private postSub: Subscription;
  constructor(private postService: PostsService) { }

  ngOnInit(){
    this.isLoading = true;
    this.postService.getPosts(this.postPerPage, this.currentPage);
    this.postSub = this.postService.getPostListener()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
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
  }


}
