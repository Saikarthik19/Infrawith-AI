import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Statistics({ reports }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    calculateStats();
  }, [reports]);

  const calculateStats = () => {
    const issueTypes = {};
    
    reports.forEach(report => {
      issueTypes[report.detectedIssue] = (issueTypes[report.detectedIssue] || 0) + 1;
    });

    const totalPoints = reports.reduce((sum, r) => sum + r.contributorPoints, 0);
    const avgConfidence = reports.length > 0
      ? reports.reduce((sum, r) => sum + r.confidence, 0) / reports.length
      : 0;

    setStats({
      totalReports: reports.length,
      issueTypes,
      totalPoints,
      avgConfidence,
      uniqueLocations: new Set(reports.map(r => `${r.latitude},${r.longitude}`)).size
    });
  };

  if (!stats) return <div className="loading">⏳ Loading statistics...</div>;

  return (
    <div className="statistics">
      <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: '#667eea' }}>
        📈 Platform Statistics
      </h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalReports}</div>
          <div className="stat-label">Total Reports Submitted</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.uniqueLocations}</div>
          <div className="stat-label">Unique Locations</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.totalPoints}</div>
          <div className="stat-label">Community Points Earned</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{(stats.avgConfidence * 100).toFixed(1)}%</div>
          <div className="stat-label">Average AI Confidence</div>
        </div>
      </div>

      <div className="issue-types">
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>
          🔍 Issue Distribution
        </h3>

        {Object.keys(stats.issueTypes).length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>
            No data yet. Submit reports to see statistics.
          </p>
        ) : (
          <>
            {Object.entries(stats.issueTypes)
              .sort((a, b) => b[1] - a[1])
              .map(([issue, count]) => (
                <div key={issue} className="issue-item">
                  <div className="issue-name">{issue}</div>
                  <div className="issue-count">{count}</div>
                </div>
              ))}
          </>
        )}
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
        <h4 style={{ marginBottom: '1rem' }}>🎯 Impact Goals</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
              {Math.round((stats.totalReports / 500) * 100)}%
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Towards 500 Reports</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
              {Math.round((stats.uniqueLocations / 100) * 100)}%
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Towards 100 Locations</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
              {Math.round((stats.avgConfidence) * 100)}%
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>AI Detection Accuracy</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f0f0f0', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '1rem' }}>👥 Top Contributors Leaderboard</h4>
        <div style={{ textAlign: 'center', color: '#999' }}>
          <p>Coming soon: Real-time leaderboard system with contributor profiles and badges</p>
        </div>
      </div>
    </div>
  );
}
