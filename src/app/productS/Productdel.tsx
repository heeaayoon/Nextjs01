'use client'
import { useRouter } from "next/navigation"

interface ProductdelProp{
    id:string
}

export default function Productdel({id}:ProductdelProp) {
    const router = useRouter();

    const handleDel = async()=>{
        if(confirm("이 상품을 삭제하시겠습니까?")){
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
            const resp = await fetch(`${baseUrl}/api/productS/${id}`, {method:"DELETE"});
            
            if(resp.ok){
                alert("정상적으로 삭제되었습니다.");
                router.push("/productS")
                router.refresh();
            }else{
                const data = await resp.json();
                alert(`삭제오류 : ${data.message || "알수 없는 오류"}`)
            }
        }
    }

    return (
        <div>
            <button className="p-3 rounded-2xl text-white mx-2 
                                hover:cursor-pointer hover:font-bold
                                bg-blue-400 hover:bg-blue-100 hover:text-black"
                    onClick={handleDel} >
                        삭제
            </button>
        </div>
    )
}
