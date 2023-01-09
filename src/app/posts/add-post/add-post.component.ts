import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/model/posts.model';
import { AppState } from 'src/app/store/app.state';
import { ADD_POST, EDIT_POST } from '../state/posts.actions';
import { getPostById } from '../state/posts.selectors';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  postForm!: FormGroup;
  post!: Post
  action: string ='ADD'

  constructor(
    private store:Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe(
      query => {
        const postId = query['postId'];
        this.action = query['action'];
        this.store.select(getPostById, { postId }).subscribe(
          data => {
            this.post = data;
          }
        )
      }
    )
    if(this.action === 'EDIT'){
      this.updatePostForm();
    }
  
  }

  updatePostForm(){
    this.postForm.get('title')?.setValue(this.post.title);
    this.postForm.get('description')?.setValue(this.post.description);
    console.log(this.postForm.value)
  }

  initForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    })
  }

  showDescriptionErrors() {
    const descriptionForm = this.postForm.get('description');
    if (descriptionForm?.touched && !descriptionForm.valid) {
      if (descriptionForm?.errors?.['required']) {
        return '* Description is required';
      }
      if (descriptionForm?.errors?.['minlength']) {
        return '* Description should be of minimum 10 characters length';
      }
    }
    return;
  }
  

  onSavePost() {
    this.postForm.markAllAsTouched();
    if (!this.postForm.valid) {
      return;
    }
    // for add post
    if (this.action === 'ADD') {
      const post: Post = {
        title: this.postForm.value.title,
        description: this.postForm.value.description
      }
      this.store.dispatch(ADD_POST({ post }))
    }

    // for edit post
    if (this.action === 'EDIT') {
      const post: Post = {
        title: this.postForm.value.title,
        description: this.postForm.value.description,
        id: this.post.id
      }
      this.store.dispatch(EDIT_POST({ post }))
    }
    this.router.navigate(['/post/post-list']);
  }

}
