import { supabase } from "@/lib/supabase/client";
import type { Product } from "@/types/product";
import Link  from "next/link"; //동적 라우팅

export default async function supaTest() {
  const {data , error} = await supabase
                              .from('products') //supabase의 테이블 이름
                              .select('*')
                              //.eq('id',123) //where절과 동일
                              //.single(); //중복되는 데이터가 있는 경우, 딱 1개만 가져옴 -> 배열이 아니니까 map 못씀
  if(error){
    return <div> ERROR : {error.message} </div>
  }

  console.log(data) //데이터 잘 들어왔는지 확인
  

  return (
    <div className="w-full h-screen
                    flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">
        Supa Test
        {data && data.map((item:Product) => 
            <Link href={`/supaTest/${item.id}`}> 
              <div key={item.id}>{item.name}</div>
            </Link> )}
      </h1>
    </div>
  );
}