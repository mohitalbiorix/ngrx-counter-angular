import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/posts.model';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { getCount, getPostEntity } from '../state/entity/postEntity.selector';
import { deletePosts, loadPosts } from '../state/posts.actions';
import { getPosts } from '../state/posts.selector';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts!: Observable<Post[]>;
  count!: Observable<number>;

  constructor(
    private store: Store<AppState>,
    private router:Router,
    private toasterSvc: ToastrService
  ) { }

  ngOnInit(): void {
    /*
     * use selector without entity
       this.posts = this.store.select(getPosts);
     */
    
    // use selector with entity
    this.posts = this.store.select(getPostEntity);
    this.count = this.store.select(getCount);
    this.store.dispatch(loadPosts());
  }

  // go to add-post page with action 'ADD'
  onAddPage() {
    this.router.navigate(['post/add-post'], {
      queryParams: {
        action: 'ADD'
      }
    })
  }

  // go to add-post page with action 'EDIT'
  goEditPage(postId: any) {
    this.router.navigate(['post/add-post'], {
      queryParams: {
        postId: postId,
        action: 'EDIT'
      }
    })
  }

  // delete confirmation model 
  deleteConfirmation(postId: string) {
    var result = confirm("Are you sure you want to delete it?");
    if (result) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(deletePosts({ id: postId }));
      this.toasterSvc.success('Delete Post Successfully!');
    }
  }

  // delete post action
  deletePost(postId: any) {
    this.deleteConfirmation(postId);
  }

  // go to post-details page
  postDetails(postId: any) {
    this.router.navigate([`/post/post-details`], {
      queryParams: {
        postId: postId
      }
    })
  }

}
