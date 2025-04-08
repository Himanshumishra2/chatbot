import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = {
  'welcome-banner.jpg': 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
  'venue.jpg': 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
  'grand-plaza.jpg': 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
  'dress-code.jpg': 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=800',
  'location-map.jpg': 'https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?w=800',
  'couple.jpg': 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
  'travel.jpg': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
  'paris.jpg': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
  'rsvp.jpg': 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800',
  'celebration.jpg': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
  'plus-one.jpg': 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800',
  'thank-you.jpg': 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800',
  'miss-you.jpg': 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800'
};

const downloadImage = (url, filename) => {
  const filepath = path.join(__dirname, '../public/images', filename);
  
  // Create directory if it doesn't exist
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }

      const file = fs.createWriteStream(filepath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', reject);
  });
};

async function downloadAllImages() {
  console.log('Starting image downloads...');
  
  try {
    await Promise.all(
      Object.entries(images).map(([filename, url]) => 
        downloadImage(url, filename)
      )
    );
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

downloadAllImages(); 