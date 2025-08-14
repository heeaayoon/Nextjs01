//상품 수정 페이지
import Link from "next/link";
import type { Product } from "@/types/product";
import ProductForm from "../../ProductForm";
import { supabase } from "@/lib/supabase/client";

//함수형으로 변환
async function getProduct(id:string):Promise <Product>{
    const {data:product , error} = await supabase
                                  .from('products') //supabase의 테이블 이름
                                  .select('*')
                                  .eq('id',id)
                                  .single();
    // if(error){
    //     return <div> ERROR : {error.message} </div>
    // }
    return product;
}

export default async function reactProductDetail({params,}:{params:Promise<{id:string}>;
}) {
    const {id} = await params;
    const product = await getProduct(id);
  
  return (
    <div className="container mx-auto min-h-screen p-5 bg-indigo-50 flex justify-center items-center">
      <div className='flex flex-col justify-between items-center mb-8'>
        <h1 className="font-bold text-gray-800 text-left">
          수정 [{product.name}/{product.id}]
        </h1>
        <ProductForm data={product}/>
        <div className="flex">
          <Link href="/supaproduct" className="p-3 rounded-2xl text-white mx-2 
                                            hover:cursor-pointer hover:font-bold
                                           bg-blue-300 hover:bg-blue-100 hover:text-black">
            상품 목록으로
          </Link>
        </div>  
      </div>
    </div>

  );
}