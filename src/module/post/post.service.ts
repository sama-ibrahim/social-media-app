import { Response, Request } from "express";
import { CreatePostDTO } from "./post.dto";
import { PostFactoryService } from "./factory";
import { PostRepository } from "../../DB/model/post/post.repository";
import { NotFoundException } from "../../utils";

class postService {
  private readonly postFactoryService = new PostFactoryService();
  private readonly postRepository = new PostRepository();

  // create post
 public create = async (req: Request, res: Response) => {

    //get data from req
    const createPostDTo: CreatePostDTO = req.body;

    //factory >> prepare post data >> make it post entity >> to repository
    const post = this.postFactoryService.createPost(createPostDTo, req.user);

    //repository >> post entity >> to DB
    const createdPost = await this.postRepository.create(post);

    //send response
    return res
      .status(201)
      .json({
        message: "post created successfully",
        success: true,
        data: { createdPost },
      });
  };

  // make reaction 
 public addReaction =async(req:Request , res:Response) =>{

  //get data from request
  const {id} = req.params;
  const {reaction} = req.body;
  const userId = req.user._id;

  // check post existence
  const postExist=await this.postRepository.exist({_id :id})
  if(!postExist) throw new NotFoundException("post not found")
  
    //check userReaction
    let userReactedIndex =postExist.reactions.findIndex((reaction)=>{
   return reaction.userId.toString() == userId.toString();
    })

  //add reaction
    if(userReactedIndex ==-1)
  await this.postRepository.update(
    { _id: id },
    { $push: { reactions: { reaction, userId } } }
  );

  //user already reacted
  else
  {
    await this.postRepository.update ({_id :id ,"reactions.userId":userId} ,
      {
        "reactions.$.reaction" :reaction,
      }
    )
  }
 // send response
 return res.sendStatus(204)

 }
}

export default new postService();