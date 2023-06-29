const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Admin routes
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  const admin = {
    username: req.body.username,
    password: req.body.password,
    courses: [],
  };
  if (
    ADMINS.find(
      (user) =>
        user.username === admin.username && user.password === admin.password
    )
  ) {
    res.send("Already an admin");
  } else {
    ADMINS.push(admin);
    res.send("Admin created sucessfully");
  }
});

app.post("/admin/login", (req, res) => {
  // logic to log in admin
  const admin = {
    username: req.headers.username,
    password: req.headers.password,
  };
  if (
    ADMINS.find(
      (user) =>
        user.username === admin.username && user.password === admin.password
    )
  ) {
    res.send("Logged in sucessfully");
  } else {
    res.status(401).send("Unauthorized");
  }
});

const generateId = () => {
  return COURSES.length + 1;
};

app.post("/admin/courses", (req, res) => {
  // logic to create a course
  const admin = {
    username: req.headers.username,
    password: req.headers.password,
  };
  const findAdmin = ADMINS.find(
    (user) =>
      user.username === admin.username && user.password === admin.password
  );
  if (findAdmin) {
    const course = {
      courseID: generateId(),
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      imageLink: req.body.link,
      published: req.body.published,
    };
    COURSES.push(course);
    findAdmin.courses.push(course);
    res.json({
      message: "Course created successfully",
      courseId: course.courseID,
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.put("/admin/courses/:courseId", (req, res) => {
  // logic to edit a course
  const admin = {
    username: req.headers.username,
    password: req.headers.password,
  };
  const findAdmin = ADMINS.find(
    (user) =>
      user.username === admin.username && user.password === admin.password
  );
  if (findAdmin) {
    const course = findAdmin.courses.find(
      (course) => course.courseID === parseInt(req.params.courseId)
    );
    if (course) {
      const updatedCourse = {
        ...course,
        ...req.body,
      };
      findAdmin.courses[findAdmin.courses.indexOf(course)] = updatedCourse;
      COURSES[course.id - 1] = updatedCourse;
      res.send("Course updated sucessfully");
    } else {
      res.send("Course not found");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.get("/admin/courses", (req, res) => {
  // logic to get all courses
  const admin = {
    username: req.headers.username,
    password: req.headers.password,
  };
  const findAdmin = ADMINS.find(
    (user) =>
      user.username === admin.username && user.password === admin.password
  );
  if (findAdmin) {
    res.json(findAdmin.courses);
  }
});

// User routes
app.post("/users/signup", (req, res) => {
  // logic to sign up user
  const user = {
    username: req.body.username,
    password: req.body.password,
    purchasedCourses: [],
  };
  if (
    USERS.find(
      (user1) =>
        user1.username === user.username && user1.password === user.password
    )
  ) {
    res.send("Already an user");
  } else {
    USERS.push(user);
    res.send("User created sucessfully");
  }
});

app.post("/users/login", (req, res) => {
  // logic to log in user
  const user = {
    username: req.headers.username,
    password: req.headers.password,
  };
  if (
    USERS.find(
      (user1) =>
        user1.username === user.username && user1.password === user.password
    )
  ) {
    res.send("Logged in sucessfully");
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.get("/users/courses", (req, res) => {
  // logic to list all courses
  const user = {
    username: req.headers.username,
    password: req.headers.password,
  };
  let findUser = USERS.find(
    (user1) =>
      user1.username === user.username && user1.password === user.password
  );
  if (findUser) {
    res.json(COURSES);
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.post("/users/courses/:courseId", (req, res) => {
  // logic to purchase a course
  const user = {
    username: req.headers.username,
    password: req.headers.password,
  };
  let findUser = USERS.find(
    (user1) =>
      user1.username === user.username && user1.password === user.password
  );
  if (findUser) {
    const course = findUser.purchasedCourses.find(
      (course) => course.courseID === parseInt(req.params.courseId)
    );
    if (course) {
      res.send("Course already purchased");
    } else {
      findUser.purchasedCourses.push({ course });
      res.send("Course purchased sucessfully");
    }
  }
});

app.get("/users/purchasedCourses", (req, res) => {
  // logic to view purchased courses
  const user = {
    username: req.headers.username,
    password: req.headers.password,
  };
  let findUser = USERS.find(
    (user1) =>
      user1.username === user.username && user1.password === user.password
  );
  if (findUser) {
    res.json(findUser.purchasedCourses);
  }
  else {
    res.status(401).send("Unauthorized");
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
