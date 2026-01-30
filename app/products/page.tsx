import ProductGrid from '@/components/ProductGrid'
import { products } from '@/lib/data'


export default function ProductsPage() {
return (
<main className="max-w-7xl mx-auto p-6">
<h1 className="text-3xl font-bold mb-6">All Products</h1>
<ProductGrid products={products} />
</main>
)
}