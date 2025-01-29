const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];

if (!projectName) {
    console.error('Please provide a project name.');
    process.exit(1);
}

const runCommand = (command) => {
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Error executing command: ${command}`);
        process.exit(1);
    }
};

// Create a new React project with Vite
console.log(`Creating a new React project with Vite: ${projectName}`);
runCommand(`npx create-vite@latest ${projectName} --template react`);

// Navigate into the project directory
process.chdir(projectName);
//Init Node Modules
console.log("Initialize Node Modules")
runCommand('npm install')

// Install necessary libraries
console.log('Installing necessary libraries...');
runCommand('npm install -D react-icon react-router-dom tailwindcss@3.4.17 postcss autoprefixer');

// Initialize Tailwind CSS
console.log('Initializing Tailwind CSS...');
runCommand('npx tailwindcss init -p');


// Update tailwind.config.js
console.log('Updating tailwind.config.js...');
const tailwindConfigPath = 'tailwind.config.js';
const tailwindConfigContent = `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary_1: "#F15641  ",
        secondary : "#001C32",
      },
      boxShadow: {
        '3xl': '#F1564175 0px 7px 29px -10px',
        '4xl':'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px'
      }
    },
  },
  plugins: [],
}
`;
fs.writeFileSync(tailwindConfigPath, tailwindConfigContent);

// Configure Tailwind CSS
console.log('Configuring Tailwind CSS...');
const indexCssPath = path.join('src', 'index.css');
const indexCssContent = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer base {
  html {
    font-family: 'Poppins', sans-serif;
    
  }
}
`;
fs.writeFileSync(indexCssPath, indexCssContent);
const appCssPath = path.join('src', 'app.css');
fs.writeFileSync(appCssPath, '');

// Set up App.jsx Project
console.log('Set up App.jsx File');
const appJsxPath = path.join('src', 'app.jsx');
const appJsxContent =`
import React from 'react'

const App = () => {
  return (
    <div className='text-blue-500 p-6 font-semibold text-2xl'>Welcome Raj Markana</div>
  )
}

export default App`;
fs.writeFileSync(appJsxPath, appJsxContent);

runCommand("color 0a")
console.log(`Project ${projectName} created and configured successfully!`);
runCommand("color 0f")