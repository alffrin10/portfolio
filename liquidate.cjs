const fs = require('fs');
const path = require('path');

const upgradesPath = path.join(__dirname, 'src', 'styles', 'upgrades.css');
const componentsPath = path.join(__dirname, 'src', 'styles', 'components.css');
const indexPath = path.join(__dirname, 'src', 'styles', 'index.css');

if (!fs.existsSync(upgradesPath)) {
  console.log('upgrades.css already deleted.');
  process.exit(0);
}

const upgradesContent = fs.readFileSync(upgradesPath, 'utf8');

// Strip all !important flags
const cleanedContent = upgradesContent.replace(/!important/g, '');

// Append to components.css
fs.appendFileSync(componentsPath, '\n\n/* --- MIGRATED FROM UPGRADES.CSS --- */\n\n' + cleanedContent);

// Remove file
fs.unlinkSync(upgradesPath);

// Remove import from index.css
let indexContent = fs.readFileSync(indexPath, 'utf8');
indexContent = indexContent.replace(/@import '\.\/upgrades\.css';\n?/, '');
fs.writeFileSync(indexPath, indexContent);

console.log('Successfully liquidated upgrades.css into components.css and removed !important flags.');
