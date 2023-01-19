import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getPostEntityById } from '../state/entity/postEntity.selector';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post!: Observable<any>

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    /*  use selector without entity
       this.post = this.store.select(getPostById) 
    */

    // use selector with entity
    this.post = this.store.select(getPostEntityById);
  }

}
