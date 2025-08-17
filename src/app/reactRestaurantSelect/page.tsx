'use client'
import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import ReactRestaurantCard from "./ReactRestaurantCard";
import type { rest } from "@/types/rest";
import TailSelect from "@/ui/TailSelect";


export default function reactProduct() {
  const [tdata,setTdata] = useState<rest[] |null>([]); //클라이언트 컴포넌트에서는 state훅 사용 가능
  const [option,setOption] = useState<ReactNode[]>([]);
  const selRef = useRef<HTMLSelectElement>(null); //<select>에서 선택한 부분을 가져옴
  
  //클라이언트 측에서 패치함 -> static mode
  const getFetchData = async ()=>{
    const baseUrl = 'https://apis.data.go.kr/6260000/FoodService/getFoodKr?'
    const apikey = process.env.NEXT_PUBLIC_API; //환경변수에서 API 키 가져오기
    let url = `${baseUrl}serviceKey=${apikey}&pageNo=1&numOfRows=40&resultType=json`;
    //console.log(url) //url 확인용

    const resp = await fetch(url); 
    const data = await resp.json(); 
    const items = data.getFoodKr.item;
    console.log(items) //원하는 데이터가 들어왔는지 확인용
    setTdata(items);
  }

  //맨 처음 한번 실행 //클라이언트 컴포넌트에서는 Effect훅 사용 가능
  useEffect(()=>{
    getFetchData();
  },[])

  //tdata 업데이트 될때마다 실행
  useEffect(()=>{
      if (!tdata) return;  // tdata가 null이면 종료
      if(tdata.length==0) return; //tdata가 빈 배열이면 뿌리지 말기
      //옵션 만들기
      let tm:string[] = tdata.map(item => item['GUGUN_NM'])
      tm = [...new Set(tm)].sort() //구 중복 제거 , 정렬
      const option:ReactNode[] = tm.map(item => <option key = {item} value={item}>
                                      {item}
                                  </option> )
      setOption(option);
  },[tdata])

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">부산 맛집 리스트</div>
          <div>
            <Link href={'/'} className="text-blue-600 hover:underline">
              홈으로
            </Link>
            <Link href={'/'} className="text-blue-600 hover:underline ml-3">
              지역별
            </Link>
          </div>
        </div>
        <div>
            <form className="w-full flex justify-center items-center mt-10">
                <select ref = {selRef}
                        //onChange={handelSel} //select 박스에 변화가 생기면(option이 선택되면) -> handleShow 함수가 실행됨
                        className="w-2/3 lg:w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 mb-3.5"> 
                    <option value=''>---지역선택---</option>
                    {option}
                </select >
            </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!tdata && <p>데이터를 불러오는 중입니다...</p>}
          {tdata && tdata.length === 0 && <p>표시할 데이터가 없습니다.</p>}
          {tdata && tdata.map((item: rest) => (
            <ReactRestaurantCard key={item.UC_SEQ} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}