# 🎯 QUICK START - 5 Minute Setup

## 📋 Pre-Flight Checklist

- [x] Node.js installed? (check: `node --version`)
- [x] npm installed? (check: `npm --version`)
- [x] Ports 5000 & 3000 are free? (check below if unsure)

## 🚀 FASTEST WAY TO START

### Windows User (Easiest)
```
Double-click: START.bat
```
This automatically opens 2 terminals and starts both servers!

### Mac/Linux User
```
bash START.sh
```

### Manual Start (if scripts don't work)

**Terminal 1:**
```bash
cd infrastructure-monitor\backend
npm install
npm start
```
**Wait for: "🚀 Server running on http://localhost:5000"**

**Terminal 2:**
```bash
cd infrastructure-monitor\frontend
npm install
npm start
```
**Wait for: Browser opens at http://localhost:3000**

---

## ✅ TESTING THE DEMO

### Step 1: Verify Backend
Open browser → Go to: `http://localhost:5000/api/health`
Should see: `{"status":"Server is running"}`

### Step 2: Access Frontend
Auto-opens at: `http://localhost:3000`

### Step 3: Test Upload
1. Click "Report Issue"
2. Upload any image (JPG/PNG)
3. Select category: "Pothole"
4. Click "Use Current Location"
5. Hit "Submit Report"

### Step 4: Verify Success
1. Switch to "Dashboard" tab
2. Your report appears instantly ✓
3. Switch to "Statistics" tab
4. Numbers update ✓

---

## 🔧 TROUBLESHOOTING

### Error: "Port 5000/3000 already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <YOUR_PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Error: "npm not found"
- Install Node.js from nodejs.org
- Restart terminal/PowerShell
- Try again

### Backend starts but Frontend can't connect
- Make sure Backend is running first
- Check: http://localhost:5000/api/health in browser
- If it doesn't load, backend isn't running

### npm install is very slow
```bash
npm install --legacy-peer-deps
```

### Frontend shows blank screen
- Wait 30 seconds for React to compile
- Refresh browser (F5)
- Check browser console (F12) for errors

---

## 📊 WHAT YOU'LL SEE

```
Backend Terminal:
🚀 Server running on http://localhost:5000
📊 API available at http://localhost:5000/api
(listen for "POST /api/reports" when you submit)

Frontend:
✨ Beautiful gradient header
📸 Report Issue tab (selected)
📊 Dashboard tab
📈 Statistics tab
```

---

## 🎬 DEMO FLOW (Show your head this)

1. **Upload Photo** - Show image upload capability
2. **Auto-Detection** - System categorizes the issue
3. **GPS** - Location captured automatically
4. **Dashboard** - See report instantly
5. **Statistics** - Real-time metrics update
6. **Responsive** - Mobile-friendly UI

**Time each part:** ~1 minute per section = ~5 minute demo

---

## 📱 BONUS: Test on Phone

From phone on same WiFi:
```
http://<YOUR_COMPUTER_IP>:3000
```

Find YOUR_COMPUTER_IP:
```bash
# Windows PowerShell
ipconfig /all
# Look for "IPv4 Address: 192.168.x.x"

# Mac/Linux
ifconfig
# Look for "inet 192.168.x.x"
```

---

## 🎉 SUCCESS INDICATORS

✅ Backend runs without errors
✅ Frontend loads with beautiful UI
✅ Can upload images
✅ Reports appear in Dashboard
✅ Statistics update
✅ No console errors (F12)

**Everything working? You're ready for demo!** 🚀

---

## 📞 NEED HELP?

### Issue not resolved?
1. Check error messages carefully
2. Look in browser console (F12)
3. Check terminal output
4. Try: `Ctrl+C` both terminals, restart them

### Still stuck?
- Make sure you're in correct directory
- Check file paths are correct
- Verify Node.js version is 14+

---

**That's it! 5 minutes and you're showing the working prototype.** 🎯

Next: Make this impressive, get approval, then build the FULL APP! 💪
