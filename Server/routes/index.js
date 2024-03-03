import express from "express";
import userRoute from "./user.routes.js";
import formatImage from "./format.image.routes.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/formatimage", formatImage);

export default router;
