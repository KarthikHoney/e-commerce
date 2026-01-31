import Link from "next/link";
import Rating from "./Rating";
import { Product } from "@/lib/types";
import Image from "next/image";


interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition hover:-translate-y-1">
        
        <Image
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-cover rounded-md"
          width={50}
          height={100}
        />

        <h3 className="mt-3 font-semibold text-lg">
          {product.title}
        </h3>

        <Rating value={product.rating} />

        <p className="text-accent font-bold text-xl mt-1">
          ₹{product.price}
        </p>

      </div>
    </Link>
  );
}
