import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/posts.model';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { deletePosts, loadPosts } from '../state/posts.actions';
import { getPosts } from '../state/posts.selectors';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts! :Observable<Post[]>;

  constructor(
    private store: Store<AppState>,
    private router:Router,
    private toasterSvc: ToastrService
  ) { }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }

  onAddPage() {
    this.router.navigate(['post/add-post'], {
      queryParams: {
        action: 'ADD'
      }
    })
  }

  goEditPage(postId: any) {
    this.router.navigate(['post/add-post'], {
      queryParams: {
        postId: postId,
        action: 'EDIT'
      }
    })
  }

  deleteConfirmation(postId: any) {
    var result = confirm("Are you sure you want to delete it?");
    if (result) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(deletePosts({ id: postId }));
      this.toasterSvc.success('Delete Post Successfully!');
    }
  }

  deletePost(postId: any) {
    this.deleteConfirmation(postId);
  }

}
