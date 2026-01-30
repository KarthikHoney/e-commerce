import { products } from '@/lib/data'
import ProductGrid from './ProductGrid'


export default function RelatedProducts() {
return (
<section className="col-span-2 mt-10">
<h2 className="text-xl font-bold mb-4">Related Products</h2>
<ProductGrid products={products.slice(0,4)} />
</section>
)
}