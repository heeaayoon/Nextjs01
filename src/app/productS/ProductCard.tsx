import type { Product } from "@/types/product"
import Link from "next/link"

interface ReactProductCardProps{
  data:Product
}

export default function ProductCard({data}:ReactProductCardProps) {
  return (
    <div className='border-2 border-indigo-950-700 rounded-2xl p-3 m-2'>
        <h2>
          <Link href={`/productS/${data.id}`}>
            {data.name}
          </Link>
        </h2>
        <p className="font-semibold">
          {data.description}
        </p>
        <p>
          {data.price.toLocaleString()}원
        </p>
    </div>
  )
}