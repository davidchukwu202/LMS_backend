const { Router } = require("express");
const CourseController = require("../Controllers/CourseController");
const {userVerify}  = require("../Middlewares/AuthMiddleware");

const router = Router();

router.post("/course", userVerify,CourseController.createCourse);
router.get("/course", CourseController.getCourses);
router.get("/:courseId", CourseController.getCourseById);
router.put("/:courseId",userVerify , CourseController.updateCourse);
router.delete("/:courseId", userVerify, CourseController.deleteCourse);
router.post("/:courseId/enroll",userVerify , CourseController.enrollCourse);

module.exports = router;
