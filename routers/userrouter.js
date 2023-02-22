import express from 'express'
const router=express.Router();

import {saveUser,getUser} from "../controllers/usercontroller.js";
router.route("/signup").post(saveUser);
router.route("/login").post(getUser);
export default router;