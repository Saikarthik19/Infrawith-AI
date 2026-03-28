import React from 'react';

export default function Dashboard({ reports, loading, refreshReports }) {
  const getStatusColor = (status) => {
    return status === 'Verified' ? 'verified' : 'reported';
  };

  const getConfidenceClass = (confidence) => {
    if (confidence > 0.9) return 'high';
    if (confidence > 0.8) return 'medium';
    return 'low';
  };

  if (loading) {
    return <div className="loading">⏳ Loading reports...</div>;
  }

  return (
    <div className="dashboard">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'white', marginBottom: '1rem' }}>
          📊 All Infrastructure Reports ({reports.length})
        </h2>
        <button 
          className="button"
          onClick={refreshReports}
          style={{ marginBottom: '1rem' }}
        >
          🔄 Refresh
        </button>
      </div>

      {reports.length === 0 ? (
        <div className="form-section" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '1.2rem', color: '#999' }}>
            No reports yet. Be the first to report an issue! 🚀
          </p>
        </div>
      ) : (
        <div className="reports-grid">
          {reports.map((report) => (
            <div key={report.id} className="report-card">
              {report.imageUrl && (
                <img 
                  src={report.imageUrl} 
                  alt="Issue" 
                  className="report-image"
                />
              )}
              
              <div className="report-content">
                <span className="report-category">
                  {report.detectedIssue}
                </span>
                
                <h3 className="report-title">
                  {report.description || 'Infrastructure Issue'}
                </h3>

                <div className="report-meta">
                  <span>
                    📍 Lat: {report.latitude.toFixed(4)}, Lng: {report.longitude.toFixed(4)}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div className="confidence" style={{ flex: 1 }}>
                    <strong>AI Confidence</strong>
                    <div style={{ fontSize: '1.2rem', marginTop: '0.3rem' }}>
                      {(report.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', background: '#667eea', color: 'white', borderRadius: '6px', padding: '0.5rem' }}>
                    <strong>Points</strong>
                    <div style={{ fontSize: '1.2rem', marginTop: '0.3rem' }}>
                      +{report.contributorPoints}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#999' }}>
                    {new Date(report.timestamp).toLocaleDateString()}
                  </span>
                  <span className={`status-badge ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '3rem', padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h3>📋 How Reports Reach Authorities</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)', gap: '1.5rem', marginTop: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📸</div>
            <strong>1. Report Image</strong>
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
              Citizen uploads photo of issue
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤖</div>
            <strong>2. AI Analyzes</strong>
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
              Computer vision detects issue type
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📍</div>
            <strong>3. Location Tagged</strong>
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
              GPS coordinates attached
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏛️</div>
            <strong>4. Auto-Report</strong>
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
              Sent to municipal authorities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
