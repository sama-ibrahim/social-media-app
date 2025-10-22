 import { IUser } from "../../../utils";
import { Post } from "../entity";
import { CreatePostDTO } from "../post.dto";

export class PostFactoryService{
    createPost(createPostDTO:CreatePostDTO , user:IUser){
        const newPost = new Post();

        newPost.content= createPostDTO.content;
        newPost.userId= user._id;
        newPost.reactions =[];
        newPost.attachments =[]; //to do

        return newPost;
    }


   

    updatePost(){

    }
}