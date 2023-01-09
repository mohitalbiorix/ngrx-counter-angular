import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/model/posts.model';
import { AppState } from 'src/app/store/app.state';
import { add_post } from '../state/posts.actions';
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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
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
    this.initForm();
  }

  initForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.action === 'EDIT' ? this.post.title : null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(this.action === 'EDIT' ? this.post.description : null, [
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
  

  onAddPost() {
    this.postForm.markAllAsTouched();
    if (!this.postForm.valid) {
      return;
    }
    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description
    }

    this.store.dispatch(add_post({ post }))
  }

}
