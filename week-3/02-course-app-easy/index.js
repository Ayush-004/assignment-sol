const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const adminAuthentication=(req,res,next)=>{
  const {username,password}=req.headers;
  console.log("Control is here");
  console.log(username);
  console.log(password);
  const admin =ADMINS.find(a=>a.username && a.password===password);
  if(admin){
    next();
  }
  else{
    res.status(403).json({message:'Admin authentication failed'});
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  
  const admin = req.body;
  const {username,password}=req.body;
  const existingAdmin=ADMINS.find(a=>a.username === admin.username);
  if(existingAdmin){
    res.status(403).json({message:'Admin already exists'});
  }else{
    ADMINS.push(admin);
    res.json({message:'Admin created successfully'});
  }
});

app.post('/admin/login', adminAuthentication,(req, res) => {
  res.json({message: 'Logged in Successfully'});
  // logic to log in admin
});

app.post('/admin/courses', (req, res) => {
  const course=req.body;
  if (!course.title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  
  if (!course.description) {
    return res.status(400).json({ message: 'Description is required' });
  }
  
  if (!course.price || isNaN(course.price)) {
    return res.status(400).json({ message: 'Valid price is required' });
  }
  
  if (!course.imageLink) {
    return res.status(400).json({ message: 'Image link is required' });
  }
  
  if (typeof course.published !== 'boolean') {
    return res.status(400).json({ message: 'Published field must be a boolean' });
  }
  course.id=Date.now();
  COURSES.push(course);
  // If all validations pass and course is successfully added or updated
  res.json({ message: 'Course added successfully', courseID: course.id });
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course

  const courseID=parseInt(req.params.courseId);
  const course = COURSES.find(c => c.id === courseID);

  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  const updatedCourse = req.body;

  if (!updatedCourse.title || typeof updatedCourse.title !== 'string') {
    return res.status(400).json({ message: 'Valid title is required' });
  }

  if (!updatedCourse.description || typeof updatedCourse.description !== 'string') {
    return res.status(400).json({ message: 'Valid description is required' });
  }

  if (!updatedCourse.price || isNaN(updatedCourse.price)) {
    return res.status(400).json({ message: 'Valid price is required' });
  }

  // Update the course
  course.title = updatedCourse.title;
  course.description = updatedCourse.description;
  course.price = updatedCourse.price
  res.json(course);
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
