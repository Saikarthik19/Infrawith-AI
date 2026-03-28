const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// In-memory database for demo
let reports = [];
let reportId = 1;

// Mock AI detection function
const detectIssue = (imagePath) => {
  const issues = [
    { type: 'Pothole', confidence: 0.92 },
    { type: 'Broken Road', confidence: 0.88 },
    { type: 'Construction', confidence: 0.85 },
    { type: 'Garbage Dump', confidence: 0.87 },
    { type: 'Landslide', confidence: 0.90 },
    { type: 'Blocked Sidewalk', confidence: 0.83 }
  ];
  
  // Randomly select an issue for demo
  return issues[Math.floor(Math.random() * issues.length)];
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Upload image and analyze
app.post('/api/reports', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const { latitude, longitude, description, category } = req.body;

    // Mock AI detection
    const detection = detectIssue(req.file.path);

    const report = {
      id: reportId++,
      imageUrl: `${req.protocol}://${req.get('host')}/${req.file.filename}`,
      imageFileName: req.file.filename,
      latitude: parseFloat(latitude) || 28.6139,
      longitude: parseFloat(longitude) || 77.2090,
      description: description || 'Infrastructure issue reported',
      category: category || detection.type,
      detectedIssue: detection.type,
      confidence: detection.confidence,
      timestamp: new Date().toISOString(),
      status: 'Reported',
      contributorPoints: 10
    };

    reports.push(report);

    res.status(201).json({
      success: true,
      message: 'Issue reported successfully',
      report
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error processing image' });
  }
});

// Get all reports
app.get('/api/reports', (req, res) => {
  res.json({
    success: true,
    total: reports.length,
    reports
  });
});

// Get specific report
app.get('/api/reports/:id', (req, res) => {
  const report = reports.find(r => r.id === parseInt(req.params.id));
  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }
  res.json(report);
});

// Get reports by location (nearby)
app.get('/api/reports/location/:latitude/:longitude', (req, res) => {
  const lat = parseFloat(req.params.latitude);
  const lng = parseFloat(req.params.longitude);
  const radius = 2; // km

  const nearby = reports.filter(report => {
    const distance = Math.sqrt(
      Math.pow(report.latitude - lat, 2) + Math.pow(report.longitude - lng, 2)
    );
    return distance < radius;
  });

  res.json({
    success: true,
    nearby: nearby.length,
    reports: nearby
  });
});

// Get statistics
app.get('/api/statistics', (req, res) => {
  const issueTypes = {};
  reports.forEach(report => {
    issueTypes[report.detectedIssue] = (issueTypes[report.detectedIssue] || 0) + 1;
  });

  res.json({
    totalReports: reports.length,
    issueTypes,
    avgConfidence: reports.length > 0
      ? (reports.reduce((sum, r) => sum + r.confidence, 0) / reports.length).toFixed(2)
      : 0
  });
});

// Update report status
app.patch('/api/reports/:id/status', (req, res) => {
  const report = reports.find(r => r.id === parseInt(req.params.id));
  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }
  
  report.status = req.body.status || report.status;
  res.json({ success: true, report });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});
