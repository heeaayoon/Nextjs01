import { NextRequest, NextResponse } from "next/server"; //요청과 응답 객체
import type { Product } from "@/types/product";

//동적라우팅으로 들어오는 params의 이름으로 폴더명을 생성하기 => [id]

//동적라우팅으로 들어오는 params의 데이터 타입 //사용 X -> 대신 인라인으로 받아오기
// interface ParamsProp {
//   params : {id : string}
// }

//호스팅할 서버에서 read/write를 하기 위해 필요함 !
//CRUD를 구현할 JSON 파일 접근을 위해 필요한 모듈 추가
import path from "path";
import { promises as fs } from "fs";

//CRUD를 구현할 JSON 파일의 경로 만들기
const dataPath = path.join(process.cwd() , 'src/app/data/products.json') ;

//src/app/data/products.json 파일을 불러오기
async function getProduts() : Promise<Product[]> {
  const jsonData = await fs.readFile(dataPath, 'utf-8');
  
  return JSON.parse(jsonData) ;
}

//저장함수
async function saveProduts(products : Product[]) {
  await fs.writeFile(dataPath, JSON.stringify(products, null, 2))  
}


//데이터 조회
export async function GET(
  request : NextRequest, 
  {params} : {params : Promise<{id : string}>} //인라인방식으로 수정하기
) {
  try {
    //불러온 파일을 JSON 파싱을 통해 Product 배열로 만들기
    const products  = await getProduts() ;  
    const { id } = await params ; // id 값을 뽑아내는 방법 (searchParams 대신 사용)
    const product = products.find(item => item.id === id) ;

    //상품이 없는 경우 
    if (!product) {
      return NextResponse.json({message: "상품이 존재하지 않습니다."}, {status : 404}) ;
    }

    //터미널 콘솔에 출력 
    //console.log(products)
    return NextResponse.json(product) ;
  } catch(error){
    console.error("파일 불러오기 오류 :", error)
    return NextResponse.json({message: "시스템오류"}, {status : 500})
  } ;
}

//데이터 전체 수정  
export async function PUT(
  request : NextRequest, 
  {params} : {params : Promise<{id : string}>}
) {
  try {
    //불로온 파일을 JSON 파싱을 통해 Product 배열로 만들기
    const products  = await getProduts() ; 
    const { id } = await params ;

    //수정할 ID의 인덱스 값을 찾기
    const idx = products.findIndex(item => item.id === id) ;

    //상품이 없는 경우 
    if (idx == -1) {
      return NextResponse.json({message: "수정할 상품이 존재하지 않습니다."}, {status : 404}) ;
    }

    //수정할 자료
    const updateProduct = await request.json() ;

    //전체 자료에 해당자료 수정
    products[idx] = {id:id, ...updateProduct} ;
    
    //전체 자료 저장
    await saveProduts(products) ; 
    return NextResponse.json(products[idx])
  } catch(error){
    console.error("파일 불러오기 오류 :", error)
    return NextResponse.json({message: "시스템오류"}, {status : 500})
  } ;
}

//데이터 전체 수정  
export async function PATCH(
  request : NextRequest, 
  {params} : {params : Promise<{id : string}>}
) {
  try {
    //불로온 파일을 JSON 파싱을 통해 Product 배열로 만들기
    const products  = await getProduts() ; 
    const { id } = await params ;

    //수정할 ID의 인덱스 값을 찾기
    const idx = products.findIndex(item => item.id === id) ;

    //상품이 없는 경우 
    if (idx == -1) {
      return NextResponse.json({message: "수정할 상품이 존재하지 않습니다."}, {status : 404}) ;
    }

    //수정할 자료
    const updateProduct : Partial<Product> = await request.json() ; //Partial : name, category, price, description 전부를 입력하지 않아도 됨

    //전체 자료에 해당자료 수정
    products[idx] = {...products[idx], ...updateProduct} ;
    
    //전체 자료 저장
    await saveProduts(products) ;
    return NextResponse.json(products[idx])
  } catch(error){
    console.error("파일 불러오기 오류 :", error)
    return NextResponse.json({message: "시스템오류"}, {status : 500})
  } ;
}

//삭제
//데이터 전체 수정  
export async function DELETE(
  request : NextRequest, 
  {params} : {params : Promise<{id : string}>}
) {
  try {
    //불로온 파일을 JSON 파싱을 통해 Product 배열로 만들기
    const products  = await getProduts() ; 
    const { id } = await params ;

    //기존 데이터에서 해당하는 아이디만 제외 
    const updateProduct: Product[] = products.filter(item => item.id !== id) ;

    //상품이 없는 경우 
    if (products.length === updateProduct.length) {
      return NextResponse.json({message: "수정할 상품이 존재하지 않습니다."}, {status : 404}) ;
    }
 
    //전체 자료 저장
    await saveProduts(updateProduct) ;
    return NextResponse.json({message: `정상적으로 삭제:[${id}]`}, {status : 200})
  } catch(error){
    console.error("파일 불러오기 오류 :", error)
    return NextResponse.json({message: "시스템오류"}, {status : 500})
  } ;
}