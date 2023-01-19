import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './state/posts.reducer';
import { POST_STATE_NAME } from './state/posts.selector';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './state/posts.effects';
import { PostDetailsComponent } from './post-details/post-details.component';
import { POST_ENTITY_STATE_NAME } from './state/entity/postEntity.selector';
import { postEntityReducer } from './state/entity/postEntity.reducer';


@NgModule({
  declarations: [
    PostListComponent,
    AddPostComponent,
    PostDetailsComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    /*
     * register reducer without entity
     */
    // StoreModule.forFeature(POST_STATE_NAME, postReducer),
    
    /*
     * register reducer with entity
     */
    StoreModule.forFeature(POST_ENTITY_STATE_NAME, postEntityReducer),
    EffectsModule.forFeature([PostEffects])
  ]
})
export class PostsModule { }
