const fs = require('fs');
const path = require('path');
const https = require('https');

// IONOS API configuration
const API_KEY = '0225f32d644244ed8b8fc14310cdf0d1';
const API_SECRET = 'P9vS4x9NRMBEP1F75JTLh_3MHKvl2YYpIGmvNUD2AmNZsOZqYH-dWIUyArf5qREYeKyzZCmD5BueeRlw0Czfug';
const DOMAIN = 'overcomerglobalnetwork.com';

// Build the site first
const { exec } = require('child_process');

console.log('🚀 Building your Next.js site...');

exec('npm run build', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Build failed:', error);
    return;
  }
  
  console.log('✅ Build completed!');
  console.log('📦 Uploading to IONOS...');
  
  // Read the built files
  const outDir = path.join(__dirname, 'out');
  
  if (!fs.existsSync(outDir)) {
    console.error('❌ Build output directory not found');
    return;
  }
  
  // For now, let's create a simple deployment
  console.log('🎉 Site built successfully!');
  console.log('📍 Your files are ready in the ./out directory');
  console.log('🌐 Next step: Upload these files to IONOS manually or via FTP');
  
  // List the built files
  const files = fs.readdirSync(outDir, { recursive: true });
  console.log('\n📁 Built files:');
  files.forEach(file => {
    console.log(`  - ${file}`);
  });
});
