import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import img1 from '../images/img1.jpeg';
import img2 from '../images/img2.jpeg';
import img3 from '../images/img3.jpeg';
import img4 from '../images/img4.jpeg';
import img5 from '../images/img5.jpeg';
import img6 from '../images/img6.jpeg';
import img8 from '../images/img8.jpeg';
import img9 from '../images/img9.jpeg';
import img10 from '../images/img10.jpeg';
import img11 from '../images/img11.jpeg';
import img12 from '../images/img12.jpeg';
import img13 from '../images/img13.jpeg';
import img14 from '../images/img14.jpeg';
import img16 from '../images/img16.jpeg';
import img17 from '../images/img17.jpeg';
import img18 from '../images/img18.jpeg';
import img19 from '../images/img19.jpeg';
import img20 from '../images/img20.jpeg';
import img21 from '../images/img21.jpeg';
import img24 from '../images/img24.jpeg';
import img25 from '../images/img25.jpeg';
import img26 from '../images/img26.jpeg';
import img27 from '../images/img27.jpeg';
import img28 from '../images/img28.jpeg';
import img30 from '../images/img30.jpeg';
import img31 from '../images/img31.jpeg';
import img33 from '../images/img33.jpeg';
import img34 from '../images/img34.jpeg';
import img35 from '../images/img35.jpeg';
import img37 from '../images/img37.jpeg';
import img38 from '../images/img38.jpeg';
import img39 from '../images/img39.jpeg';

interface ImageItem {
    id: number;
    src: string;
    upvotes: number;
    aspectRatio: number;
}

export async function getImageData(): Promise<ImageItem[]> {
    const imageDir = path.join(process.cwd(), 'public', 'images');
    const files = await fs.readdir(imageDir);

    const predefinedUpvotes = [
        282, 156, 298, 145, 267, 134, 201, 178, 289, 142,
        234, 167, 254, 123, 265, 187, 213, 159, 245, 176,
        200, 190, 180, 170, 160, 150, 140, 130, 120, 110,
        100, 90, 80
    ];

    const imageArray = [
        img1, img2, img3, img4, img5, img6, img8, img9, img10, img11, img12, img13, img14, img16, img17, img18, img19, img20, img21, img24, img25, img26, img27, img28, img30, img31, img33, img34, img35, img37, img38, img39
    ];

    const imagePromises = files.map(async (file, index) => {
        const filePath = path.join(imageDir, file);
        const metadata = await sharp(filePath).metadata();
        
        return {
            id: index + 1,
            src: `/images/${file}`,
            upvotes: predefinedUpvotes[index] || 0,
            aspectRatio: metadata.width && metadata.height ? metadata.width / metadata.height : 1,
        };
    });

    return Promise.all(imagePromises);
}

