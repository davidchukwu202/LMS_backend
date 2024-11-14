const CourseService = require("../Services/CourseService");

class CourseController {
  static async createCourse(req, res) {
    try {
      const { title, description } = req.body;
      const { userId } = req.user;
      const result = await CourseService.createCourse(title, description, userId);
      return res.status(result.status).json({ message: result.message, success: result.success, course: result.course });
    } catch (error) {
      console.error("Create course error:", error);
      res.status(500).json({ message: "An error occurred during course creation" });
    }
  }

  static async getCourses(req, res) {
    try {
      const result = await CourseService.getCourses();
      return res.status(result.status).json(result.courses);
    } catch (error) {
      console.error("Get courses error:", error);
      res.status(500).json({ message: "An error occurred while fetching courses" });
    }
  }

  static async getCourseById(req, res) {
    try {
      const { courseId } = req.params;
      const result = await CourseService.getCourseById(courseId);
      return res.status(result.status).json(result.course);
    } catch (error) {
      console.error("Get course by ID error:", error);
      res.status(500).json({ message: "An error occurred while fetching the course" });
    }
  }

  static async updateCourse(req, res) {
    try {
      const { courseId } = req.params;
      const { title, description } = req.body;
      const { userId } = req.user;
      const result = await CourseService.updateCourse(courseId, title, description, userId);
      return res.status(result.status).json({ message: result.message, success: result.success, course: result.course });
    } catch (error) {
      console.error("Update course error:", error);
      res.status(500).json({ message: "An error occurred while updating the course" });
    }
  }

  static async deleteCourse(req, res) {
    try {
      const { courseId } = req.params;
      const { userId } = req.user;
      const result = await CourseService.deleteCourse(courseId, userId);
      return res.status(result.status).json({ message: result.message, success: result.success });
    } catch (error) {
      console.error("Delete course error:", error);
      res.status(500).json({ message: "An error occurred while deleting the course" });
    }
  }

  static async enrollCourse(req, res) {
    try {
      const { courseId } = req.params;
      const { userId } = req.user;
      const result = await CourseService.enrollCourse(courseId, userId);
      return res.status(result.status).json({ message: result.message, success: result.success });
    } catch (error) {
      console.error("Enroll course error:", error);
      res.status(500).json({ message: "An error occurred while enrolling in the course" });
    }
  }
}

module.exports = CourseController;
