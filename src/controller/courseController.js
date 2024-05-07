const courseDao = require('../dao/courseDao')

module.exports = {
    getCourses: async (request, response) => {
        const result = await courseDao.getCourses();
        response.send(result)
    },
    addCourse: async (request, response) => {
        const courseDetails = request.body;
        const result = await courseDao.addCourse(courseDetails);
        response.send(result)
    },
    updateCourse: async (request, response) => {
        const courseId = request.params.courseId
        const courseDetails = request.body;
        const result = await courseDao.updateCourse(courseId, courseDetails);
        response.send(result)
    },
    deleteCourse: async (request, response) => {
        const courseId = request.params.courseId
        const result = await courseDao.deleteCourse(courseId);
        response.send(result)
    }
}