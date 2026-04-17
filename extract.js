const fs = require('fs');
const content = fs.readFileSync('index.js', 'utf8');

// The bundle is likely using React.createElement or JSX transforms.
// We are looking for strings that could be text content of the portfolio.
const strings = content.match(/"([^"\\]*(\\.[^"\\]*)*)"/g) || [];
const texts = strings.map(s => s.slice(1, -1)).filter(s => s.length > 20 && !s.includes('.js') && !s.includes('.css') && !s.startsWith('<') && !s.includes('function') && !s.includes('return'));

fs.writeFileSync('strings.txt', Array.from(new Set(texts)).join('\n'));
