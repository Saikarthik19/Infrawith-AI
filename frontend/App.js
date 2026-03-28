import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ReportForm from './components/ReportForm';
import Dashboard from './components/Dashboard';
import Statistics from './components/Statistics';

function App() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/reports`);
      setReports(res.data.reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewReport = (newReport) => {
    setReports([newReport, ...reports]);
    setCurrentPage('dashboard');
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <div className="logo">
            <h1>🏗️ Smart Infrastructure Monitor</h1>
            <p>AI-Powered Community Infrastructure Reporting</p>
          </div>
          <nav className="nav">
            <button 
              className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              Report Issue
            </button>
            <button 
              className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentPage('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`nav-btn ${currentPage === 'stats' ? 'active' : ''}`}
              onClick={() => setCurrentPage('stats')}
            >
              Statistics
            </button>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="container">
          {currentPage === 'home' && (
            <ReportForm 
              onSubmit={handleNewReport}
              apiBase={API_BASE}
            />
          )}
          {currentPage === 'dashboard' && (
            <Dashboard 
              reports={reports}
              loading={loading}
              refreshReports={fetchReports}
            />
          )}
          {currentPage === 'stats' && (
            <Statistics reports={reports} />
          )}
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 INFRA WITH AI. Empowering communities for better infrastructure.</p>
      </footer>
    </div>
  );
}

export default App;
