//상품 추가 페이지
import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="container mx-auto min-h-screen p-5 bg-indigo-50 flex justify-center items-center">
      <div className='w-full max-w-2xl bg-white p-8 rounded-lg'>
        <h1>
          상품 추가
        </h1>
        <div className="flex flex-col">
          <Link href="/productS" className="font-bold">
            상품 목록으로
          </Link>
        </div>
      </div>
    </div>
  )
}
