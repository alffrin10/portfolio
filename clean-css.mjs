import fs from 'fs';
import path from 'path';

const filesToClean = [
  'c:/Users/Bubsey/Documents/Portfolio/app/src/styles/components.css',
  'c:/Users/Bubsey/Documents/Portfolio/app/src/styles/upgrades.css',
  'c:/Users/Bubsey/Documents/Portfolio/app/src/styles/index.css'
];

function cleanCSS(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Regex to find CSS rules containing [data-theme="hyprland"]
  // It handles nested braces and multiline strings naively by matching up to the first closing brace.
  // Wait, standard regex [^{]*\{[^}]*\} works for simple rules.
  // Let's use a slightly more robust regex or just manual parsing.
  
  // Manual parsing:
  let result = '';
  let i = 0;
  while (i < content.length) {
    let braceIndex = content.indexOf('{', i);
    if (braceIndex === -1) {
      result += content.slice(i);
      break;
    }
    
    // Find the end of this block
    let endBraceIndex = content.indexOf('}', braceIndex);
    if (endBraceIndex === -1) {
      result += content.slice(i);
      break;
    }
    
    let selector = content.slice(i, braceIndex);
    let block = content.slice(braceIndex, endBraceIndex + 1);
    
    // Does the selector contain hyprland?
    if (selector.includes('[data-theme="hyprland"]') || selector.includes("[data-theme='hyprland']")) {
      // skip adding this to result
      // But we should also strip the comment right before it if it's there
    } else {
      result += selector + block;
    }
    
    i = endBraceIndex + 1;
  }

  // Clean up any double empty lines
  result = result.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  fs.writeFileSync(filePath, result, 'utf8');
  console.log(`Cleaned ${filePath}`);
}

filesToClean.forEach(cleanCSS);
