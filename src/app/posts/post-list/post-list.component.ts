import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/posts.model';
import { AppState } from 'src/app/store/app.state';
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
    private router:Router
  ) { }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
  }

  goEditPage(postId: any) {
    this.router.navigate(['post-list/add'], {
      queryParams: {
        postId: postId,
        action: 'EDIT'
      }
    })
  }

}
