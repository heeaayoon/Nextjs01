//상품 수정 페이지
import Link from "next/link";
import type { Product } from "@/types/product";

//함수형으로 변환
async function getProduct(id:string):Promise <Product>{
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const resp = await fetch(`${baseUrl}/api/products/${id}`); //app>api>products>id 데이터 패치하기
  const data:Product = await resp.json();
  return data;
}

export default async function reactProductDetail({params,}:{params:Promise<{id:string}>;
}) {
    const {id} = await params;
    const product = await getProduct(id);
  
  return (
    <div className="w-9/10 h-screen m-10 flex flex-col justify-center items-center">
        <div>
            <Link href={'/productS'}> 
                상품목록으로
            </Link>
            <Link href={'/'}> 
                수정
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