import { Response, Request } from "express";
import { CreatePostDTO } from "./post.dto";
import { PostFactoryService } from "./factory";
import { PostRepository } from "../../DB/model/post/post.repository";

class postService {
  private readonly postFactoryService = new PostFactoryService();
  private readonly postRepository = new PostRepository();
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
}

export default new postService();