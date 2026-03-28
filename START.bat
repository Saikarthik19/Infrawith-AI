@echo off
echo.
echo ========================================
echo Smart Infrastructure Monitoring Demo
echo ========================================
echo.
echo Starting Backend Server...
start "Backend - Infrastructure Monitor" cmd /k "cd backend && npm install && npm start"
timeout /t 3

echo Starting Frontend...
start "Frontend - Infrastructure Monitor" cmd /k "cd frontend && npm install && npm start"

echo.
echo ✅ Both servers are starting!
echo. 
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Wait 30 seconds for both to fully initialize...
echo.
pause
