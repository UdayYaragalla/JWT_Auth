const express = require('express')
const router = express.Router();
const courseController = require('../controller/courseController')

router.get('/', courseController.getCourses)
router.post('/', courseController.addCourse)
router.put('/:courseId', courseController.updateCourse)
router.delete('/:courseId', courseController.deleteCourse)

module.exports = router