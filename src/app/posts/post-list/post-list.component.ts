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
  private postSub: Subscription;
  constructor(private postService: PostsService) { }

  ngOnInit(){
    this.postService.getPosts();
    this.postSub = this.postService.getPostListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
  onDelete(id) {
    this.postService.deletePost(id);
    console.log(id);
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
