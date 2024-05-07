const { where } = require('sequelize');
const { Course } = require('../../models')

async function getCourses() {
    try {
        const courses = await Course.findAll();
        return courses;
    } catch (error) {
        console.log('Error while fetching the course details', error);
    }
}

async function addCourse(courseDetails) {
    try {
        const course = await Course.create(courseDetails)
        if (course) {
            return `${courseDetails.courseName} is added successfully.`
        }
    } catch (error) {
        console.log('Error while adding the course details', error);
    }
}

async function updateCourse(courseId, courseDetails) {
    try {
        const [numRowsAffected, updatedRows] = await Course.update(courseDetails, {
            where: { courseId: courseId },
            returning: true, // Return the updated rows
            plain: true // Return only the updated row, not an array
        });
        if (numRowsAffected === 0) {
            throw new Error('User not found');
        }
        console.log("Course updated successfully:", updatedRows);
        return 'course updated successfully.'
    } catch (error) {
        console.log('Error while updating the course details', error);
    }
}

async function deleteCourse(courseId) {
    try {
        const deletedRow = await Course.destroy({
            where: {
                courseId: courseId
            }
        })
        if (!deletedRow > 0) {
            return 'Course details are not deletd.'
        }
        return 'Course details deleted successfully.'
    } catch (error) {
        console.log('Error while deleting the course details', error);
    }
}

module.exports = {
    getCourses,
    addCourse,
    updateCourse,
    deleteCourse
}