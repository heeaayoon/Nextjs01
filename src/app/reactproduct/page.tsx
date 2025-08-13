'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import ReactProductCard from "./reactProductCard";
import type { Product } from "@/types/product";


export default function reactProduct() {
  const [tdata,setTdata] = useState<Product[] |null>([]); //클라이언트 컴포넌트에서는 state훅 사용 가능
  
  //클라이언트 측에서 패치함 -> static mode
  const getFetchData = async ()=>{
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const resp = await fetch(`${baseUrl}/api/products`); //app>api>products 데이터 패치하기
    const data = await resp.json();
    setTdata(data);
  }

  //맨 처음 한번 실행 //클라이언트 컴포넌트에서는 Effect훅 사용 가능
  useEffect(()=>{
    getFetchData();
  },[])

  return (
    <div className="w-9/10 h-screen m-10 flex flex-col justify-center items-center">
        <div>
            <Link href={'/'}> 
                홈으로
            </Link>
        </div>
        <h1>
            {
                tdata && tdata.map((item:Product) =>
                                        <ReactProductCard key = {item.id}
                                                        data = {item} />
                )
            }
        </h1>
    </div>
  );
}