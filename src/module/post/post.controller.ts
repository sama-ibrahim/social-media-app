import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.middleware";
 import postService from "./post.service";

const router = Router();
//create
router.post("/", isAuthenticated() , postService.create)

//reaction
router.patch("/:id", isAuthenticated(), postService.addReaction)

export default router;