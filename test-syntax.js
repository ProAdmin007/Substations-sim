// Quick syntax check - just load and parse
const fs = require('fs');

try {
  const content = fs.readFileSync('substation (24).html', 'utf8');
  
  // Find the script sections
  const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/g);
  if (!scriptMatch) {
    console.log('No scripts found in HTML');
    process.exit(0);
  }
  
  console.log(`Found ${scriptMatch.length} script blocks`);
  
  for (let i = 0; i < scriptMatch.length; i++) {
    const script = scriptMatch[i].replace(/<script>/g, '').replace(/<\/script>/g, '');
    try {
      new Function(script);
      console.log(`✓ Script block ${i+1} is valid`);
    } catch (e) {
      console.log(`✗ Script block ${i+1} has syntax error:`, e.message);
      console.log('Line:', e.stack);
    }
  }
  
  // Check for specific functions
  const functions = ['calculateCurrents', 'formatCurrent', 'populateCB', 'populateDS'];
  for (const fn of functions) {
    if (content.includes(`function ${fn}`)) {
      console.log(`✓ Found function: ${fn}`);
    } else {
      console.log(`✗ Missing function: ${fn}`);
    }
  }
  
} catch (e) {
  console.error('Error reading file:', e);
  process.exit(1);
}
