import { Router } from "express";
import { upload } from "../middlewares/multter.midelware.js";
import { registerUser } from "../controllers/user.controler.js";

const router = Router();
router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
);

export default router;
