const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('🚀 Your site is built successfully!');
console.log('📁 All files are ready in the ./out directory');
console.log('');

console.log('🌐 Next Steps to Deploy to IONOS:');
console.log('');
console.log('Option 1: FTP Upload (Recommended)');
console.log('1. Connect to IONOS FTP:');
console.log('   - Host: ftp.your-domain.com (or your IONOS FTP host)');
console.log('   - Username: Your IONOS FTP username');
console.log('   - Password: Your IONOS FTP password');
console.log('');
console.log('2. Upload all files from ./out to your web root');
console.log('');
console.log('Option 2: IONOS Web Space');
console.log('1. Log into IONOS Control Panel');
console.log('2. Go to Web Hosting → File Manager');
console.log('3. Upload all files from ./out directory');
console.log('');
console.log('📋 Files to upload:');
const outDir = path.join(__dirname, 'out');

function listFiles(dir, prefix = '') {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      console.log(`📁 ${prefix}${file}/`);
      listFiles(filePath, prefix + file + '/');
    } else {
      console.log(`📄 ${prefix}${file}`);
    }
  });
}

listFiles(outDir);

console.log('');
console.log('✨ Your site will be live at: https://overcomerglobalnetwork.com');
console.log('');
console.log('🔑 Admin Login:');
console.log('   URL: https://overcomerglobalnetwork.com/admin');
console.log('   Email: admin@overcomers.org');
console.log('   Password: OGN2026Admin!');
