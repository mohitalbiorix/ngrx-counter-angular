import { Post } from "src/app/model/posts.model"

export interface PostState {
    posts: Post[];
}

export const initialState: PostState =  {
    posts :[
        {
            id :'1', title: 'Sample title 1', description: 'Sample Description 1'
        },
        {
            id :'2', title: 'Sample title 2', description: 'Sample Description 2'
        }
    ]
}