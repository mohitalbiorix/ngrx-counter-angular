import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/model/posts.model';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { getPostEntityById } from '../state/entity/postEntity.selector';
import { addPosts, updatePosts } from '../state/posts.actions';
import { getPostById } from '../state/posts.selector';

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
    private toasterSvc: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    /* 
    * Manage by ngrx router store 
    * use selector without entity

        this.store.select(getPostById).subscribe(
          (post) => {
            if (post) {
              this.post = post;
              console.log(this.post)
            }
          }
        )
    */

    /* use selector with entity */
    this.store.select(getPostEntityById).subscribe(
      (post) => {
        if (post) {
          this.post = post;
          console.log(this.post)
        }
      }
    )

    this.route.queryParams.subscribe(
      query => {
        // const postId = query['postId'];
        this.action = query['action'];
        /* 
          Manage by angular route not ngrx  
            this.store.select(getPostById, { postId }).subscribe(
              data => {
                this.post = data;
              }
            ) 
        */
      }
    )
    if(this.action === 'EDIT'){
      this.updatePostForm();
    }
  }

  updatePostForm(){
    this.postForm.get('title')?.setValue(this.post?.title);
    this.postForm.get('description')?.setValue(this.post?.description);
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
    this.store.dispatch(setLoadingSpinner({ status: true }));
    if (this.action === 'ADD') {
      const post: Post = {
        title: this.postForm.value.title,
        description: this.postForm.value.description
      }
      this.store.dispatch(addPosts({ post }))
      this.toasterSvc.success('Add Post Successfully!')
    }

    // for edit post
    if (this.action === 'EDIT') {
      const post: Post = {
        title: this.postForm.value.title,
        description: this.postForm.value.description,
        id: this.post.id
      }
      this.store.dispatch(updatePosts({ post }))
      this.toasterSvc.success('Edit Post Successfully!')
    }
  }

  onBackToPosts() {
    window.history.back();
  }

}
