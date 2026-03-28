#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('\n');
console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║   INFRASTRUCTURE MONITOR - PROJECT VALIDATOR                ║');
console.log('║   Smart Infrastructure Monitoring Platform - Base Demo      ║');
console.log('╚══════════════════════════════════════════════════════════════╝');
console.log('\n');

const checks = [
  {
    name: 'Project Root',
    file: '.',
    type: 'dir'
  },
  {
    name: 'Backend Directory',
    file: './backend',
    type: 'dir'
  },
  {
    name: 'Frontend Directory',
    file: './frontend',
    type: 'dir'
  },
  {
    name: 'Backend Server',
    file: './backend/server.js',
    type: 'file'
  },
  {
    name: 'Backend Package.json',
    file: './backend/package.json',
    type: 'file'
  },
  {
    name: 'Frontend App.js',
    file: './frontend/App.js',
    type: 'file'
  },
  {
    name: 'Frontend Package.json',
    file: './frontend/package.json',
    type: 'file'
  },
  {
    name: 'ReportForm Component',
    file: './frontend/components/ReportForm.js',
    type: 'file'
  },
  {
    name: 'Dashboard Component',
    file: './frontend/components/Dashboard.js',
    type: 'file'
  },
  {
    name: 'Statistics Component',
    file: './frontend/components/Statistics.js',
    type: 'file'
  },
  {
    name: 'Frontend HTML',
    file: './frontend/public/index.html',
    type: 'file'
  },
  {
    name: 'README Documentation',
    file: './README.md',
    type: 'file'
  },
  {
    name: 'Quick Start Guide',
    file: './QUICK_START.md',
    type: 'file'
  },
  {
    name: 'Demo Guide',
    file: './DEMO_GUIDE.md',
    type: 'file'
  },
  {
    name: 'Windows Launcher',
    file: './START.bat',
    type: 'file'
  },
  {
    name: 'Unix Launcher',
    file: './START.sh',
    type: 'file'
  }
];

let passed = 0;
let failed = 0;

console.log('📋 Checking Project Files:\n');

checks.forEach((check) => {
  const filePath = path.join(__dirname, check.file);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  
  if (exists) {
    passed++;
  } else {
    failed++;
  }
  
  console.log(`${status} ${check.name.padEnd(30)} ${check.file}`);
});

console.log('\n');
console.log('═══════════════════════════════════════════════════════════════');
console.log(`✅ Passed: ${passed}/${checks.length}`);
console.log(`❌ Failed: ${failed}/${checks.length}`);
console.log('═══════════════════════════════════════════════════════════════\n');

if (failed === 0) {
  console.log('🎉 PROJECT STRUCTURE IS COMPLETE!\n');
  console.log('📖 Next Steps:\n');
  console.log('1. Read: QUICK_START.md (for 5-minute setup)');
  console.log('2. Read: DEMO_GUIDE.md (for demo script)');
  console.log('3. Run:  npm install in both backend/ and frontend/');
  console.log('4. Run:  backend: npm start (terminal 1)');
  console.log('5. Run:  frontend: npm start (terminal 2)');
  console.log('6. Open: http://localhost:3000\n');
  console.log('🚀 Good luck with your demo!\n');
} else {
  console.log('⚠️  Some files are missing. Please check the file list above.\n');
}

console.log('═══════════════════════════════════════════════════════════════\n');
