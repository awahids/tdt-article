const fs = require('fs');
const { execSync } = require('child_process');

const seederFiles = fs.readdirSync('./prisma/seeder').filter(file => file.endsWith('.ts'));

for (const file of seederFiles) {
  console.log(`Running seeder: ${file}`);
  execSync(`ts-node --compiler-options '{"module":"CommonJS"}' ./prisma/seeder/${file}`, { stdio: 'inherit' });
}
