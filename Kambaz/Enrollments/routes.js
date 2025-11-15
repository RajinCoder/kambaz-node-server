import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findEnrollmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const enrollments = dao.findEnrollmentsForCourse(courseId);
    res.send(enrollments);
  };

  const findEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.send(enrollments);
  };

  const createEnrollmentForCourse = (req, res) => {
    const { courseId } = req.params;
    const enrollment = { ...req.body, course: courseId };
    const created = dao.createEnrollment(enrollment);
    res.send(created);
  };

  const deleteEnrollment = (req, res) => {
    const { enrollmentId } = req.params;
    const status = dao.deleteEnrollment(enrollmentId);
    res.send(status);
  };

  app.post("/api/courses/:courseId/enrollments", createEnrollmentForCourse);
  app.get("/api/courses/:courseId/enrollments", findEnrollmentsForCourse);
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.delete("/api/enrollments/:enrollmentId", deleteEnrollment);
}
