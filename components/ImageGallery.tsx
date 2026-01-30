interface ImageGalleryProps {
  images: string[];
}

import Image from "next/image";

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div>
      <Image
        src={images[0]}
        className="rounded-xl mb-4 w-full object-cover"
        alt="Product"
        width={50}
        height={100}
      />

      <div className="flex gap-2 mt-2">
        {images.map((img, i) => (
          <Image
            key={i}
            src={img}
            className="w-20 h-20 border rounded cursor-pointer hover:scale-105 transition"
            alt={`Thumbnail ₹{i + 1}`}
            width={50}
            height={100}
          />
        ))}
      </div>
    </div>
  );
}
