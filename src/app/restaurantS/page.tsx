import Link from "next/link";
import RestaurantList from "./RestaurantList";
import type { rest } from "@/types/rest";

//서버에서 패치
async function getFetchData():Promise<rest[]>{
  const baseUrl = 'https://apis.data.go.kr/6260000/FoodService/getFoodKr?'
  const apikey = process.env.NEXT_PUBLIC_API; //환경변수에서 API 키 가져오기
  let url = `${baseUrl}serviceKey=${apikey}&pageNo=1&numOfRows=40&resultType=json`;
  const resp = await fetch(url, {cache:'no-store'}); //들어오는 시점에 패치시키기 위해 cache 옵션을 줌 -> dynamic mode
  
  if(!resp.ok) throw new Error("Fetch ERROR"); //오류가 발생한 경우
  
  const data = await resp.json();// 오류가 발생하지 않은 경우
  const tdata:rest[] = data.getFoodKr.item
  console.log(tdata) //원하는 데이터가 들어왔는지 확인용
  return tdata;
}

export default async function restaurantS() {
  const tdata = await getFetchData();

  const gun = [...new Set(tdata.map(item => item.GUGUN_NM))].sort();

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
        <RestaurantList tdata={tdata}/>
      </div>
    </div>
  );
}