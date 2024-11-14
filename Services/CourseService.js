const Course = require("../Models/Course");

class CourseService {
  static async createCourse(title, description, createdBy) {
    try {
      const course = new Course({ title, description, createdBy });
      await course.save();
      return { status: 201, message: "Course created successfully", success: true, course };
    } catch (error) {
      console.error("Course creation error:", error);
      return { status: 500, message: "An error occurred during course creation", success: false };
    }
  }

  static async getCourses() {
    try {
      const courses = await Course.find().populate('createdBy', 'username');
      return { status: 200, courses };
    } catch (error) {
      console.error("Get courses error:", error);
      return { status: 500, message: "An error occurred while fetching courses", success: false };
    }
  }

  static async getCourseById(courseId) {
    try {
      const course = await Course.findById(courseId).populate('createdBy', 'username');
      if (!course) {
        return { status: 404, message: "Course not found", success: false };
      }
      return { status: 200, course };
    } catch (error) {
      console.error("Get course by ID error:", error);
      return { status: 500, message: "An error occurred while fetching the course", success: false };
    }
  }

  static async updateCourse(courseId, title, description, userId) {
    try {
      const course = await Course.findById(courseId);
      if (!course) {
        return { status: 404, message: "Course not found", success: false };
      }

      if (course.createdBy.toString() !== userId) {
        return { status: 403, message: "You do not have permission to update this course", success: false };
      }

      course.title = title;
      course.description = description;
      await course.save();

      return { status: 200, message: "Course updated successfully", success: true, course };
    } catch (error) {
      console.error("Update course error:", error);
      return { status: 500, message: "An error occurred while updating the course", success: false };
    }
  }

  static async deleteCourse(courseId, userId) {
    try {
      const course = await Course.findById(courseId);
      if (!course) {
        return { status: 404, message: "Course not found", success: false };
      }

      if (course.createdBy.toString() !== userId) {
        return { status: 403, message: "You do not have permission to delete this course", success: false };
      }

      await course.remove();
      return { status: 200, message: "Course deleted successfully", success: true };
    } catch (error) {
      console.error("Delete course error:", error);
      return { status: 500, message: "An error occurred while deleting the course", success: false };
    }
  }

  static async enrollCourse(courseId, userId) {
    try {
      const course = await Course.findById(courseId);
      if (!course) {
        return { status: 404, message: "Course not found", success: false };
      }

      const user = await User.findById(userId);
      if (!user) {
        return { status: 404, message: "User not found", success: false };
      }

      if (course.students.includes(userId)) {
        return { status: 400, message: "Already enrolled in the course", success: false };
      }

      course.students.push(userId);
      await course.save();

      return { status: 200, message: "Enrolled in course successfully", success: true };
    } catch (error) {
      console.error("Enroll course error:", error);
      return { status: 500, message: "An error occurred while enrolling in the course", success: false };
    }
  }
}

module.exports = CourseService;
