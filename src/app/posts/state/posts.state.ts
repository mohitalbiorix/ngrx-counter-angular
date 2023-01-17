import { Post } from "src/app/model/posts.model"

export interface PostState {
    posts: Post[];
}

export const initialState: PostState =  {
    posts : []
}