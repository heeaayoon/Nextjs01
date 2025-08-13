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
    const resp = await fetch(`${baseUrl}/api/products`, {cache:'no-store'}); //들어오는 시점에 패치시키기 위해 cache 옵션을 줌 -> dynamic mode
    
    
    if(!resp.ok) { //오류가 발생한 경우
    
    }
    
    const data = await resp.json();// 오류가 발생하지 않은 경우
    return data;
}

export async function updateProducrAction(prevState:FormStatus, formData:FormData): Promise<FormStatus> {
    const name = formData.get('name');
    const category = formData.get('category');
    const price = parseInt(String(formData.get('price')??'0'));
    const description = formData.get('description');

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const resp = await fetch(`${baseUrl}/api/products`, {cache:'no-store'}); //들어오는 시점에 패치시키기 위해 cache 옵션을 줌 -> dynamic mode
    
    
    if(!resp.ok) { //오류가 발생한 경우
    
    }
    
    const data = await resp.json();// 오류가 발생하지 않은 경우
    return data;
}
