'use client'
import { useFormStatus } from "react-dom";

interface SubmitButtonProp{
    isEditMode : boolean
}
export default function SubmitButton({isEditMode}:SubmitButtonProp) {
    const { pending } = useFormStatus();
    return (
        <button type="submit"
                disabled={pending}
                className="p-3 rounded-2xl text-white mx-2 
                           hover:cursor-pointer hover:font-bold
                          bg-blue-300 hover:bg-blue-100 hover:text-black">
            {isEditMode ? (pending ? '수정중':'수정하기')
                        : (pending ? '새 상품 추가중':'새 상품 추가하기')}
        </button>
  )
}
