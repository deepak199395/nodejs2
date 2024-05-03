import express from "express"
import { deleteUserController, getuserdetailsControlller, userController, userUpdateController } from "../comtrollers/authControllers.js";

const router= express.Router()


// Routes of API

router.post("/register",userController)
router.get("/get-user/get-user-details",getuserdetailsControlller)
router.put('/user-update/:id',userUpdateController)
router.delete('/delete-user/:id',deleteUserController)

export default router;
