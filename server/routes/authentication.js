import express from "express";
const router = express.Router();

import {
  signin,
  Gsignin,
  signup,
  verify,
  checkPassword,
  forgot,
  resetPassword,
  updateProfileById,
  getProfileById,
  sendOtp,
  verifyOtp,
} from "../controller/authentication.js";

import requireLogin from "../middleware/loginRequired.js";

router.post("/signin", signin);
router.post("/signin/Gsignin", Gsignin);
router.post("/signup", signup);
router.post("/verify", verify);
router.post("/check-password", checkPassword);

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

router.put("/forgot", forgot);
router.put("/reset-password", resetPassword);

router.get("/get-profile-by-id/:id", requireLogin, getProfileById);
router.put("/update-profile-by-id/:id", requireLogin, updateProfileById);

export default router;
