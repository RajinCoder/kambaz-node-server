import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function createEnrollment(enrollment) {
    const newEnrollment = { ...enrollment, _id: uuidv4() };
    db.enrollments = [...(db.enrollments || []), newEnrollment];
    return newEnrollment;
  }

  function findEnrollmentsForCourse(courseId) {
    const { enrollments = [] } = db;
    return enrollments.filter((e) => e.course === courseId);
  }

  function findEnrollmentsForUser(userId) {
    const { enrollments = [] } = db;
    return enrollments.filter((e) => e.user === userId);
  }

  function deleteEnrollment(enrollmentId) {
    const { enrollments = [] } = db;
    const before = enrollments.length;
    db.enrollments = enrollments.filter((e) => e._id !== enrollmentId);
    const after = db.enrollments.length;
    return { deleted: after < before };
  }
    function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }


  return {
    createEnrollment,
    findEnrollmentsForCourse,
    findEnrollmentsForUser,
    deleteEnrollment,
    enrollUserInCourse
  };
}
