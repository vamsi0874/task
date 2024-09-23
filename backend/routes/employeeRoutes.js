const express = require('express');

const {upload} = require('../multer')

const router = express.Router();
const { createEmployee, getEmployees,editEmployee,getEmployee,deleteEmployee } = require('../controllers/employeeController');
const requireAuth = require('../middleware/reqAuth');


router.use(requireAuth)

router.post('/createEmployee', upload.single('image') , createEmployee);
router.get('/employees', getEmployees);
router.get('/employees/:id',getEmployee)
router.post('/employees/:id', upload.single('image'), editEmployee)
router.delete('/employees/:id',deleteEmployee)

module.exports = router;