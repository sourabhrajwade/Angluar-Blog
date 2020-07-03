import { Component, OnInit } from '@angular/core';
import { PostsService } from './../post.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  newPost: string;
  enteredTitle: string;
  enteredContent: string;
  id;
  constructor(private postService: PostsService) { }

  ngOnInit(){
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postService.addPost(this.id, form.value.title, form.value.content);
    form.resetForm();
  }

}
