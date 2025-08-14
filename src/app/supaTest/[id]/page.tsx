import { supabase } from "@/lib/supabase/client";

//동적 라우팅

export default async function supaTestId({params} : {params:Promise<{id:string}>}) {

    const { id } = await params;
    const {data , error} = await supabase
                              .from('products') //supabase의 테이블 이름
                              .select('*')
                              .eq('id', id) //where절과 동일
                              .single(); //중복되는 데이터가 있는 경우, 딱 1개만 가져옴 -> 배열이 아니니까 map 못씀
    if(error){
        return <div> ERROR : {error.message} </div>
    }

  return (
    <div className="font-bold">
      {id}
      <ul>
        <li>{data.name}</li>
        <li>{data.description}</li>
      </ul>
    </div>
  )
}
