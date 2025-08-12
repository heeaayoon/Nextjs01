'use client' //클라이언트 컴포넌트
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; //클라이언트 컴포넌트에서 쿼리스트링을 추출하기 위해 추가한 부분

type helloT = {
  msg : string
}

export default function HelloPage1() {
  const [tdata,setTdata] = useState<helloT[] |null>([]);
  
  //클라이언트 컴포넌트에서 쿼리스트링을 추출하는 방법
  const searchParams = useSearchParams();
  const msg = searchParams.get('msg');
  console.log(msg)

  const getFetchData = async ()=>{
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const resp = await fetch(`${baseUrl}/api/hello`); //app>api>hello 데이터 패치하기
    const data = await resp.json();
    setTdata(data);
  }

  useEffect(()=>{
    //맨 처음 한번 실행
    getFetchData();
  },[])

  useEffect(()=>{
    //tdata가 바뀔 때마다
    console.log(tdata)
  },[tdata])

  return (
    <div className="w-full h-screen
                    flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">
        {
            tdata && tdata.map((item:helloT) => <div key={item.msg}>
                                                  {item.msg}
                                                </div>)
        }
      </h1>
    </div>
  );
}