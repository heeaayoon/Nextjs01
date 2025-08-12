'use client'
import type { Product } from "@/types/product"

interface ReactProductCardProps{
  data:Product
}

export default function ReactProductCard({data}:ReactProductCardProps) {
  return (
    <div className="container mx-auto min-h-screen p-5 bg-indigo-50 flex justify-center items-center">
      <div className='w-full max-w-2xl bg-white p-8 rounded-lg'>
        <div>
          <span>카테고리 : {data['category']}</span><br/>
          <span>{data['description']}</span>
        </div>
          <div>제품명 : {data['name']}</div>
          <div>{data.price.toLocaleString()}원</div>
        </div>
    </div>
  )
}