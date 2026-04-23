const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      searchDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('usePortfolio()')) {
        if (!content.includes('import { usePortfolio }')) {
          console.log('MISSING IMPORT IN:', fullPath);
        }
      }
    }
  }
}

searchDir(path.join(__dirname, 'src'));
console.log('Check complete.');
