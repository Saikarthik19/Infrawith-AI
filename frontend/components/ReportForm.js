import React, { useState } from 'react';
import axios from 'axios';

export default function ReportForm({ onSubmit, apiBase }) {
  const [formData, setFormData] = useState({
    description: '',
    category: 'Pothole',
    latitude: 28.6139,
    longitude: 77.2090
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setMessage('✅ Location captured');
        },
        () => setMessage('❌ Could not get location')
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!image) {
      setMessage('❌ Please select an image');
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('image', image);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('latitude', formData.latitude);
      formDataToSend.append('longitude', formData.longitude);

      const res = await axios.post(`${apiBase}/reports`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage('✅ Issue reported successfully! Points earned: +10');
      setFormData({
        description: '',
        category: 'Pothole',
        latitude: 28.6139,
        longitude: 77.2090
      });
      setImage(null);
      setTimeout(() => {
        onSubmit(res.data.report);
      }, 1000);
    } catch (error) {
      setMessage('❌ Error uploading report');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-section">
      <h2 className="form-title">📸 Report Infrastructure Issue</h2>
      
      {message && (
        <div className={message.includes('✅') ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Upload Issue Photo *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Issue Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Pothole">🕳️ Pothole</option>
            <option value="Broken Road">🛣️ Broken Road</option>
            <option value="Construction">🏗️ Construction</option>
            <option value="Garbage Dump">♻️ Garbage Dump</option>
            <option value="Landslide">⛰️ Landslide</option>
            <option value="Blocked Sidewalk">🚫 Blocked Sidewalk</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the issue in detail..."
          />
        </div>

        <div className="form-group">
          <label>Location Coordinates</label>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <input
              type="number"
              step="0.00001"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
              style={{ flex: 1 }}
            />
            <input
              type="number"
              step="0.00001"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
              style={{ flex: 1 }}
            />
          </div>
          <button
            type="button"
            className="button"
            onClick={handleGetLocation}
            style={{ marginBottom: '1rem' }}
          >
            📍 Use Current Location
          </button>
        </div>

        <button
          type="submit"
          className="button"
          disabled={loading}
        >
          {loading ? '⏳ Uploading...' : '✈️ Submit Report'}
        </button>
      </form>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
        <h4>💡 How it works:</h4>
        <ol>
          <li>Upload a photo of the infrastructure issue</li>
          <li>Our AI automatically detects the issue type</li>
          <li>Location is captured and sent to authorities</li>
          <li>You earn community contribution points!</li>
        </ol>
      </div>
    </div>
  );
}
