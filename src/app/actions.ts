'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export interface FormStatus{
    message:string;
}


export async function createProducrAction(prevState:FormStatus, formData:FormData): Promise<FormStatus> {
    const name = formData.get('name');
    const category = formData.get('category');
    const price = parseInt(String(formData.get('price')??'0'));
    const description = formData.get('description');

    console.log('createProducrAction', name)
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const resp = await fetch(`${baseUrl}/api/products`, {
        method:"POST",
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({name,category, price, description})
    }); 
    
    if(!resp.ok) { //오류가 발생한 경우
        const data = resp.json();
        return {message : `API 오류:${data}`}
    }
    //캐시를 갱신해서 새 데이터 즉시 반영
    revalidatePath('productS')
    //상품 추가 후, 제품 목록 페이지로 이동
    redirect('/productS')
}

export async function updateProducrAction(prevState:FormStatus, formData:FormData): Promise<FormStatus> {
    const id = formData.get('id');
    const name = formData.get('name');
    const category = formData.get('category');
    const price = parseInt(String(formData.get('price')??'0'));
    const description = formData.get('description');

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const resp = await fetch(`${baseUrl}/api/products/${id}`, {
        method:"PUT",
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({name,category, price, description})
    }); 
    
    if(!resp.ok) { //오류가 발생한 경우
        const data = resp.json();
        return {message : `API 오류:${data}`}
    }
    //캐시를 갱신해서 새 데이터 즉시 반영
    revalidatePath('productS')
    revalidatePath(`/productS/${id}`)
    //상품 추가 후, 제품 상세 페이지로 이동
    redirect(`/productS/${id}`)
}
