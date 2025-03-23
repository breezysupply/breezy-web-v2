import type { APIRoute } from 'astro';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.S3_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.S3_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = 'brett-website-bucket';
const FOLDER_NAME = 'moments';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      throw new Error('No image provided');
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const timestamp = Date.now();
    const filename = `${timestamp}.jpg`;
    
    // Process image with sharp
    const processedImageBuffer = await sharp(buffer)
      .resize(800, 800, {
        fit: 'cover',
        withoutEnlargement: true
      })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Upload to S3
    const s3Key = `${FOLDER_NAME}/${filename}`;
    await s3Client.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: processedImageBuffer,
      ContentType: 'image/jpeg'
    }));

    // Generate S3 URL
    const s3Url = `https://${BUCKET_NAME}.s3.amazonaws.com/${s3Key}`;

    // Update images list
    const imagesFile = path.join(process.cwd(), 'src/data/images.json');
    let images = [];
    try {
      const fileContent = await fs.readFile(imagesFile, 'utf-8');
      images = JSON.parse(fileContent);
    } catch (error) {
      console.log('No existing images file or empty file');
    }

    images.unshift({
      src: s3Url,
      alt: `Moment ${images.length + 1}`,
      createdAt: new Date().toISOString()
    });

    await fs.writeFile(imagesFile, JSON.stringify(images, null, 2));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error handling image upload:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const GET: APIRoute = async () => {
  try {
    const imagesFile = path.join(process.cwd(), 'src/data/images.json');
    const fileContent = await fs.readFile(imagesFile, 'utf-8');
    const images = JSON.parse(fileContent);
    return new Response(JSON.stringify(images), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}; 