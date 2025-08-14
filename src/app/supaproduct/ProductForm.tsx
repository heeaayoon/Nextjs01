'use client'
import type { Product } from "@/types/product"
import SubmitButton from "./SubmitButton2";
import { addProduct, updateProduct} from "../actions2";

interface ProductFormProp{
    data?:Product; //props(data)가 들어오는지 여부에 따라 -> 수정인지(있으면)/새로운 상품 추가인지(없으면) 구분하기
}

export default function ProductForm({data}:ProductFormProp) {
    const isEditMode =  data != null;  //수정(data가 null이 아니면 edit모드임)인지 입력인지 구분

    //useActionState 설정
    const actionUse = isEditMode ? updateProduct : addProduct;

  return (
    <div className="w-full rounded-2xl bg-indigo-200 m-2 p-2">
      <form action = { actionUse }
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {isEditMode && <input type= "hidden" name="id" value={data.id} />} 
            <div className="p-4">
                <label htmlFor="name">
                    제품명 <br />
                </label>
                <input type="text" id="name" name="name" required defaultValue={isEditMode ? data.name:""} 
                        className="border-2 border-indigo-100 bg-white rounded-lg"/>
            </div>
            <div className="p-4">
                <label htmlFor="category">
                    카테고리 <br />
                </label>
                <input type="text" id="category" name="category" required defaultValue={isEditMode ? data.category:""} 
                        className="border-2 border-indigo-100 bg-white rounded-lg"/>
            </div>
            <div className="p-4">
            <label htmlFor="price">
                    가격 <br />
                </label>
                <input type="text" id="price" name="price" required defaultValue={isEditMode ? data.price:""} 
                        className="border-2 border-indigo-100 bg-white rounded-lg"/>
            </div>
            <div className="p-4">
                <label htmlFor="description">
                    제품 설명 <br />
                </label>
                <input type="text" id="description" name="description" required defaultValue={isEditMode ? data.description:""} 
                        className="border-2 border-indigo-100 bg-white rounded-lg"/>
            </div>
        <div className="flex justify-center"> 
            <SubmitButton isEditMode={isEditMode} />
        </div>
      </form>
    </div>
  )
}
