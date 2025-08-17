import type { ChangeEvent, RefObject } from 'react'
import sarea from '../db/sarea.json'

interface SelectProps {
  selRef : RefObject<HTMLSelectElement | null>, // Input이면 InputElement 사용
  handelSel : (e:ChangeEvent<HTMLSelectElement>) => void
}


export default function TailSelect({selRef,handelSel} : SelectProps) {
  return (
    <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5'
            ref={selRef}
            onChange={handelSel}>
     <option>--측정소선택--</option>  
      {
          sarea.map(item => (
                    <option key={item['코드']} value={item['코드']}>{item['측정소']}</option>
          ))
      }
    </select>
    
    

  )
}
