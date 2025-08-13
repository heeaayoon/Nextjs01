//서버 컴포넌트
import Link from "next/link";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

async function getProducts():Promise<Product[]>{
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const resp = await fetch(`${baseUrl}/api/products`, {cache:'no-store'}); //들어오는 시점에 패치시키기 위해 cache 옵션을 줌 -> dynamic mode
  
  if(!resp.ok) throw new Error("Fetch ERROR"); //오류가 발생한 경우
  
  const data = await resp.json();// 오류가 발생하지 않은 경우
  return data;
}

export default async function reactProduct() {
  const products = await getProducts(); //서버 컴포넌트 이므로 state훅 사용 불가 
                  //await -> 이 작업을 끝내기 전까지 다른 작업을 할 수 없음
                  //즉, 데이터를 받아와야 다음 작업을 할 수 있음

  return (
    <div className="container mx-auto min-h-screen p-5 bg-indigo-50 flex justify-center items-center">
      <div className='w-full max-w-2xl bg-white p-8 rounded-lg'>
        <h1 className="font-bold">
          상품 목록
        </h1>
        <div>
          {
              products && products.map((item:Product) =>
                                                <ProductCard key = {item.id}
                                                            data = {item} />
              )
          }
        </div>
        <div className="flex justify-between">
          <Link href="/productS/new" className="p-3 rounded-2xl text-white mx-2 
                                                hover:cursor-pointer hover:font-bold
                                               bg-blue-300 hover:bg-blue-100 hover:text-black">
            상품 추가
          </Link>
          <Link href="/" className="p-3 rounded-2xl text-white mx-2 
                                    hover:cursor-pointer hover:font-bold
                                   bg-indigo-900 hover:bg-blue-100 hover:text-black">
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}