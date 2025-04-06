const express = require("express");
const router = express.Router();

const {
  createClass,
  getAllClasses,
  deleteClass,
  getClassesByStudent,
  getClassesByTeacher,
  getClassById
} = require("../controllers/classController");

const { verifyToken } = require("../middleware/authMiddleware");

/**
 * ✅ สร้างหรืออัปเดตคลาสจาก .xlsx
 * Endpoint: POST /classes/create
 * Body: file (.xlsx), email, section
 */
router.post("/create", verifyToken, createClass);

/**
 * ✅ GET /classes/student/:id
 * อ่านคลาสทั้งหมดที่นักเรียนเคยเรียน
 */
router.get("/student/:id", verifyToken, getClassesByStudent);

/**
 * ✅ GET /classes/teacher
 * อ่านคลาสทั้งหมดของอาจารย์ที่ล็อกอิน
 */
router.get("/teacher", verifyToken, getClassesByTeacher);

/**
 * ✅ GET /classes/
 * อ่านคลาสทั้งหมด (admin)
 */
router.get("/", verifyToken, getAllClasses);

/**
 * ✅ DELETE /classes/:id
 * ลบคลาส
 */
router.delete("/:id", verifyToken, deleteClass);

/**
 * ✅ GET /classes/:id
 * อ่านข้อมูลคลาสจาก ID (ควรอยู่ล่างสุด)
 */
router.get("/:id", verifyToken, getClassById);

module.exports = router;
