'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import ReactRestaurantCard from "./ReactRestaurantCard";
import type { Product } from "@/types/product";


export default function reactProduct() {
  const [tdata,setTdata] = useState<Product[] |null>([]); //클라이언트 컴포넌트에서는 state훅 사용 가능
  
  //클라이언트 측에서 패치함 -> static mode
  const getFetchData = async ()=>{
    const baseUrl = 'https://apis.data.go.kr/6260000/FoodService/getFoodKr?'
    const apikey = process.env.NEXT_PUBLIC_API; //환경변수에서 API 키 가져오기
    let url = `${baseUrl}serviceKey=${apikey}&pageNo=1&numOfRows=10&resultType=json`;
    //console.log(url) //url 확인용

    const resp = await fetch(url); 
    const data = await resp.json(); 
    const items = data.getFoodKr.item;
    console.log(items) //원하는 데이터가 들어왔는지 확인용
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
            {/* {
                tdata && tdata.map((item:Product) =>
                                        <ReactRestaurantCard key = {item.id}
                                                        data = {item} />
                )
            } */}

            [카드 테스트]

        </h1>
    </div>
  );
}