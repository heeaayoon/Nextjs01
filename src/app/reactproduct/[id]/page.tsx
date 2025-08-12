'use client'
import { useState, useEffect, use} from "react";
import Link from "next/link";
import type { Product } from "@/types/product";


export default function reactProductDetail({params,}:{params:Promise<{id:string}>;
}) {
    const {id} = use(params);
    const [product,setProduct] = useState<Product|null>(null);
  
  //클라이언트 측에서 패치함 -> static mode
  const getProduct = async ()=>{
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const resp = await fetch(`${baseUrl}/api/products/${id}`); //app>api>products>id 데이터 패치하기
    const data:Product = await resp.json();
    setProduct(data);
  }

  //맨 처음 한번 실행
  useEffect(()=>{
    getProduct();
  },[])

  return (
    <div className="w-9/10 h-screen m-10 flex flex-col justify-center items-center">
        <div>
            <Link href={'/'}> 
                홈으로
            </Link>
        </div>
        <div className='border-2 border-indigo-950-700 rounded-2xl p-3 m-2'>
            <div className="font-semibold">id : {product && product.id}</div>
            <div>제품명 : {product && product.name}</div>
            <div>카테고리 : {product && product.category}</div>
            <div>{product && product.description}</div>
            <div>{product && product.price.toLocaleString()}원</div>
        </div>
    </div>
  );
}