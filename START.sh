#!/bin/bash

echo ""
echo "========================================"
echo "Smart Infrastructure Monitoring Demo"
echo "========================================"
echo ""

cd "$(dirname "$0")"

echo "Starting Backend Server..."
cd backend
npm install &
npm start &
BACKEND_PID=$!

sleep 3

echo "Starting Frontend..."
cd ../frontend
npm install &
npm start &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are starting!"
echo ""
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

wait $BACKEND_PID $FRONTEND_PID
