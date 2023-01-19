import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../model/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }

  // get all posts action
  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`https://vue-completecourse.firebaseio.com/posts.json`)
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  // add post action
  addPosts(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(`https://vue-completecourse.firebaseio.com/posts.json`, post);
  }

  // update post action
  updatePosts(post: any) {
    const postData = {
      [post.id]: { title: post.title, description: post.description },
    };
    return this.http.patch(
      `https://vue-completecourse.firebaseio.com/posts.json`,
      postData
    );
  }

  // delete post action
  deletePosts(id: string) {
    return this.http.delete(`https://vue-completecourse.firebaseio.com/posts/${id}.json`);
  }

  // get post based on id action
  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`https://vue-completecourse.firebaseio.com/posts/${id}.json`);
  }
}
