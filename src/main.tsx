
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add Google Fonts preconnect for performance
const linkPreconnect1 = document.createElement('link');
linkPreconnect1.rel = 'preconnect';
linkPreconnect1.href = 'https://fonts.googleapis.com';
document.head.appendChild(linkPreconnect1);

const linkPreconnect2 = document.createElement('link');
linkPreconnect2.rel = 'preconnect';
linkPreconnect2.href = 'https://fonts.gstatic.com';
linkPreconnect2.crossOrigin = '';
document.head.appendChild(linkPreconnect2);

// Add Google Font
const linkFont = document.createElement('link');
linkFont.rel = 'stylesheet';
linkFont.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
document.head.appendChild(linkFont);

createRoot(document.getElementById("root")!).render(<App />);
