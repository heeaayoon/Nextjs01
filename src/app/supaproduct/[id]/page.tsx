import Link from "next/link";
import type { Product } from "@/types/product";
import Productdel from "../Productdel";
import { supabase } from "@/lib/supabase/client";

const getProduct = async (id:string):Promise <Product>=>{
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

export default async function reactProductDetail({params,}:{params:Promise<{id:string}>; //'동적라우팅(/방식)'에는 params 라는 오브젝트를 사용하는 것이 중요함 -> Promise로 바뀜(new!)
}) {
    const {id} = await params; //params에 든 값을 가져옴
    const product = await getProduct(id);
  
  return (
    <div className="w-9/10 h-screen m-10 flex flex-col justify-center items-center">
      <div className='border-2 border-indigo-200 rounded-2xl p-3 m-2'>
        <div className="flex justify-center">
            <Link href={'/supaproduct'} className="p-3 rounded-2xl text-white mx-2 
                                                hover:cursor-pointer hover:font-bold
                                               bg-blue-300 hover:bg-blue-100 hover:text-black"> 
                상품목록으로
            </Link>
            <Link href={`/supaproduct/${id}/edit`} className="p-3 rounded-2xl text-white mx-2 
                                                            hover:cursor-pointer hover:font-bold
                                                           bg-green-300 hover:bg-green-100 hover:text-black"> 
                수정
            </Link>
            <Productdel id = {id}/>
        </div>
        <div className="mt-5">
          <h2>
            제품명 : {product && product.name}
          </h2>
          <p className="font-semibold">{product && product.description}</p>
          <p>{product && product.price.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
}