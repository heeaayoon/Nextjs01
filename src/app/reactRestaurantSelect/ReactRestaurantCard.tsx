'use client'
import type { rest } from "@/types/rest"

interface ReactRestaurantCardProps{
  data:rest
}

export default function ReactRestaurantCard({data}:ReactRestaurantCardProps) {

const menu = data.RPRSNTV_MENU.replaceAll('\n', ',') //모든 줄바꿈 문자(\n)를 쉼표(,)로 바꿈
                              .split(',') //쉼표를 기준으로 개별 메뉴 항목으로 나눔
                              .map(item => {
                                    const match = item.match(/^[^\d￦₩(]+/); //'가격 정보가 시작되기 직전'까지의 텍스트만 추출
                                    return match ? match[0].trim() : ''; //match 결과가 있으면 그 값을 사용하고, 없으면 빈 문자열을 반환
                                  })
                              .filter(item => item);

  return (    
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <img className="h-48 w-full object-cover" src={data.MAIN_IMG_THUMB} alt={data.MAIN_TITLE} />
      <div className="p-6">
        <div className="flex items-baseline">
          <span className="inline-block bg-indigo-200 text-indigo-800 py-1 px-3 text-m rounded-full uppercase font-semibold tracking-wide">
            {data.GUGUN_NM}
          </span>
          <div className="ml-2 text-gray-800 text-m uppercase font-semibold tracking-wide truncate">
            {data.MAIN_TITLE}
          </div>
        </div>
        <div className="mt-2">
          {menu.map((item, index) => (
            <span key={`${item}-${index}`} 
                  className="mt-1 inline-block bg-indigo-100 text-indigo-800 font-semibold text-xs leading-tight rounded-full px-3 py-1 mr-2 mb-2">
              {item}
            </span>
          ))}
        </div>
        <p className="mt-1 text-gray-700 text-sm line-clamp-2">{data.ITEMCNTNTS}</p>
        <div className="mt-4 flex flex-col space-y-1">
          <span className="text-gray-600 text-sm">{data.ADDR1}</span>
          <span className="text-gray-600 text-sm">{data.CNTCT_TEL}</span>
        </div>
      </div>
    </div>
  )
}