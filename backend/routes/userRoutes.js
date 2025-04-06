const express = require("express");
const router = express.Router();
const {
  getTeachers,
  searchUsers,
  getAllUsers,
  deleteUser,
  updateUser // ✅ เพิ่มตรงนี้
} = require("../controllers/userController");

const { verifyToken } = require("../middleware/authMiddleware");

// ✅ route ปัจจุบัน
router.get("/teachers", verifyToken, getTeachers);
router.get("/search/users", verifyToken, searchUsers);
router.get("/users", verifyToken, getAllUsers);

const User = require('../models/User');
const Class = require('../models/Class');

router.get('/with-classes', async (req, res) => {
  try {
    const users = await User.find();
    const allClasses = await Class.find();

    const result = users.map(user => {
      let classesTaught = [];
      let classesEnrolled = [];

      if (user.role === 'teacher') {
        classesTaught = allClasses.filter(c => c.teacher?.toString() === user._id.toString());
      } else if (user.role === 'student') {
        classesEnrolled = allClasses.filter(c =>
          c.students?.some(s => s.toString() === user._id.toString())
        );
      }

      return {
        ...user.toObject(),
        classesTaught,
        classesEnrolled
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err.message });
  }
});
