'use server'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabase/client";

export interface FormStatus{
    message:string;
}

export async function addProduct(formData:FormData) {
    const name = formData.get('name');
    const category = formData.get('category');
    const price = parseInt(String(formData.get('price')??'0'));
    const description = formData.get('description');

    //추가될 자료의 ID 생성
    const newId = Date.now().toString();
    await supabase.from('products').insert({
        id:newId,name,category,price, description
    });

    //캐시를 갱신해서 새 데이터 즉시 반영
    revalidatePath('/supaproduct');
    //상품 추가 후, 제품 목록 페이지로 이동
    redirect('/supaproduct');
}

export async function updateProduct(formData:FormData) {
    const id = formData.get('id');
    const name = formData.get('name') ;
    const category = formData.get('category');
    const price = parseInt(String(formData.get('price')??'0'));
    const description = formData.get('description');

    await supabase
        .from('products')
        .update({name,category, price, description})
        .eq('id',id)

    //캐시를 갱신해서 새 데이터 즉시 반영
    revalidatePath('/supaproduct');
    //상품 추가 후, 제품 목록 페이지로 이동
    redirect('/supaproduct');
}

export async function deleteProduct(formData:FormData) {
    const id = formData.get('id');
    
    await supabase
        .from('products')
        .delete()
        .eq('id',id)

    //캐시를 갱신해서 새 데이터 즉시 반영
    revalidatePath('/supaproduct');
    //상품 추가 후, 제품 목록 페이지로 이동
    redirect('/supaproduct');
}
