import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from './../post.service';
import { Post } from './../posts.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  posts: Post[] = [];
  isLoading = false;
  private postSub: Subscription;
  constructor(private postService: PostsService) { }

  ngOnInit(){
    this.isLoading = true;
    this.postService.getPosts();
    this.postSub = this.postService.getPostListener()
    .subscribe((post: Post[]) => {
      this.isLoading = false;
      this.posts = post;
    });
  }
  onDelete(id) {
    console.log(id);
    this.postService.deletePost(id);

  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
