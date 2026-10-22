import express from 'express';
import { upload } from '../middleware/upload.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Upload image (requires admin auth)
router.post('/image', protectAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }

  // Normalize path for web
  const relativePath = `/uploads/images/${req.file.filename}`;

  res.status(200).json({
    success: true,
    message: 'Image uploaded successfully.',
    url: relativePath,
    filename: req.file.filename,
    size: req.file.size,
  });
});

// Upload resume/document (used by job applicants or admin)
router.post('/document', upload.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }

  const relativePath = `/uploads/documents/${req.file.filename}`;

  res.status(200).json({
    success: true,
    message: 'Document uploaded successfully.',
    url: relativePath,
    filename: req.file.filename,
    size: req.file.size,
  });
});

export default router;
