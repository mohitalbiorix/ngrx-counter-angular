import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/posts.selectors';

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
    this.post = this.store.select(getPostById)
  }

}
