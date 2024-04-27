// prisma-seed.js

const fs = require('fs');
const { execSync } = require('child_process');

// Mendapatkan daftar file seeder dalam folder 'seeder'
const seederFiles = fs.readdirSync('./prisma/seeder').filter(file => file.endsWith('.ts'));

// Menjalankan setiap file seeder
for (const file of seederFiles) {
  console.log(`Running seeder: ${file}`);
  execSync(`ts-node --compiler-options '{"module":"CommonJS"}' ./prisma/seeder/${file}`, { stdio: 'inherit' });
}
