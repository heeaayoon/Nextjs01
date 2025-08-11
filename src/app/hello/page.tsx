'use client'
import { useState, useEffect } from "react";

type helloT = {
  msg : string
}

export default function HelloPage() {
  const [tdata,setTdata] = useState<helloT[] |null>([]);
  
  const getFetchData = async ()=>{
    const resp = await fetch('http://localhost:3000/api/hello'); //app>api>hello 데이터 패치하기
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