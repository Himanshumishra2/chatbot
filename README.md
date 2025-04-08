# Wedding Invitation Chatbot

A beautiful, mobile-friendly wedding invitation chatbot that allows guests to explore wedding details and RSVP through an interactive chat interface.

## Features

- 📱 Mobile-first design with desktop phone simulation
- 💬 Interactive chatbot interface
- 🖼️ Image gallery with zoom functionality
- 📝 RSVP collection
- 🗓️ Wedding details and information
- 🎨 Beautiful floral wedding design

## Quick Start

### Running Locally

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

### Building for Production

1. **Create an optimized build**
   ```bash
   npm run build
   ```

2. **Serve the production build locally**
   ```bash
   node server.js
   ```
   
   Visit [http://localhost:3000](http://localhost:3000)

## Deployment Options

### Option 1: Netlify (Recommended)

1. Create a `netlify.toml` file in the root:
   ```toml
   [build]
     command = "npm run build"
     publish = "build"
     
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. Deploy:
   - Create an account on [netlify.com](https://www.netlify.com/)
   - Connect your GitHub repository or drag/drop your build folder

### Option 2: Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Option 3: GitHub Pages

1. Install GitHub Pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/wedding-chatbot",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## Customization

### Changing Wedding Details

Edit the `initialOptions` array in `src/App.tsx` to update:
- Wedding date, time, and location
- Couple information and stories
- RSVP options and responses

### Changing Images

Replace the images in the `public/images/` directory:
- `bgscreen.jpg` - Main background
- `bgchat.jpg` - Chat background
- `welcome-banner.jpg` - Welcome banner
- ...and other images referenced in the IMAGES object

### Changing Colors and Fonts

Edit the theme settings in:
- `src/theme.ts` for Chakra UI theme
- CSS variables in styled components

## Project Structure

- `public/` - Static assets
- `src/` - React source code
  - `components/` - Reusable components
  - `App.tsx` - Main application
  - `theme.ts` - Theme configuration
- `server.js` - Simple Express server for production

## License

MIT
