'use client'
import { useState} from 'react'
import { rest } from '@/types/rest'
import RestaurantSCard from './RestaurantSCard'

interface RestaurantListProp{
    tdata:rest[];
}

export default function RestaurantList({tdata}:RestaurantListProp) {

    const [selGugun, setSelGugun] = useState('');

    const options = [...new Set(tdata.map(item => item.GUGUN_NM))] //구 이름 중복 제거
                        .sort() //구 이름 정렬    

    //구가 선택되면, 선택된 구를 selGugun에 저장
    const handelSel = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelGugun(event.target.value);
    }

    //선택된 구에 해당하는 데이터만 필터링
    //선택된 구가 없으면 전체 데이터를 보여줌
    const filteredData = selGugun ? tdata.filter(item=> item.GUGUN_NM === selGugun) : tdata;

    return (
      <div>
        <div>
            <form className="w-full flex justify-center items-center mt-10">
                <select value={selGugun}
                        onChange={handelSel} //select 박스에 변화가 생기면(option이 선택되면) -> handleShow 함수가 실행됨
                        className="w-2/3 lg:w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 mb-3.5"> 
                    <option value=''>---지역선택---</option>
                    {options.map(item=>(
                                    <option key = {item}
                                            value={item}>
                                        {item}
                                    </option>   
                                ))}
                </select >
            </form>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredData.map((item: rest) => (
                <RestaurantSCard key={item.UC_SEQ} data={item} />
            ))}
        </div> 
    </div>
  )
}
