//상품 추가 페이지
import Link from "next/link";
import ProductForm from "../ProductForm";

export default function NewProductPage() {
  return (
    <div className="container mx-auto min-h-screen p-5 bg-indigo-50 flex justify-center items-center">
      <div className='w-full max-w-2xl bg-white p-8 rounded-lg'>
        <h1>
          상품 추가
        </h1>
        <ProductForm />
        <div className="flex justify-center">
          <Link href="/supaproduct" className="p-3 rounded-2xl text-white mx-2 
                                            hover:cursor-pointer hover:font-bold
                                           bg-blue-300 hover:bg-blue-100 hover:text-black">
            상품 목록으로
          </Link>
        </div>
      </div>
    </div>
  )
}
