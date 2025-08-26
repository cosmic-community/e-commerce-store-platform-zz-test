const fs = require('fs');
const path = require('path');

// Script to automatically inject console capture script into HTML files during build
function injectConsoleCapture() {
  const buildDir = path.join(process.cwd(), '.next');
  const outDir = path.join(process.cwd(), 'out');
  
  // Determine which directory to process
  let targetDir = buildDir;
  if (fs.existsSync(outDir)) {
    targetDir = outDir;
  }
  
  if (!fs.existsSync(targetDir)) {
    console.log('No build directory found. Skipping console capture injection.');
    return;
  }
  
  function processHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processHtmlFiles(filePath);
      } else if (file.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if script is already injected
        if (!content.includes('dashboard-console-capture.js')) {
          // Inject script into head
          content = content.replace(
            '<head>',
            '<head>\n    <script src="/dashboard-console-capture.js"></script>'
          );
          
          fs.writeFileSync(filePath, content);
          console.log(`Injected console capture into: ${filePath}`);
        }
      }
    });
  }
  
  try {
    processHtmlFiles(targetDir);
    console.log('Console capture script injection completed.');
  } catch (error) {
    console.error('Error injecting console capture script:', error);
  }
}

injectConsoleCapture();