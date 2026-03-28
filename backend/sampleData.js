const sampleReports = [
  {
    id: 1,
    imageUrl: "https://via.placeholder.com/300x200?text=Pothole",
    imageFileName: "sample1.jpg",
    latitude: 28.6139,
    longitude: 77.2090,
    description: "Large pothole on Main Street near Market",
    category: "Pothole",
    detectedIssue: "Pothole",
    confidence: 0.95,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    status: "Verified",
    contributorPoints: 10
  },
  {
    id: 2,
    imageUrl: "https://via.placeholder.com/300x200?text=Broken+Road",
    imageFileName: "sample2.jpg",
    latitude: 28.5244,
    longitude: 77.1855,
    description: "Road completely cracked on Highway 8",
    category: "Broken Road",
    detectedIssue: "Broken Road",
    confidence: 0.92,
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    status: "Reported",
    contributorPoints: 10
  },
  {
    id: 3,
    imageUrl: "https://via.placeholder.com/300x200?text=Construction",
    imageFileName: "sample3.jpg",
    latitude: 28.6408,
    longitude: 77.2273,
    description: "Unfinished construction blocking pedestrian path",
    category: "Construction",
    detectedIssue: "Construction",
    confidence: 0.88,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: "Reported",
    contributorPoints: 10
  }
];

module.exports = sampleReports;
