import type { Product } from "@/types/product"
import Link from "next/link"

interface ReactProductCardProps{ //규칙, Props로 넘어오는 건 interface로 따로 빼기
  data:Product
}

export default async function ProductCard({data}:ReactProductCardProps) {
  return (
    <div className='border-2 border-indigo-200 rounded-2xl p-3 m-2'>
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