import type { rest } from "@/types/rest";
import RestaurantDetail from "../RestaurantDetail";

//다시 정보 읽어서 -> 데이터 골라낸 후에 -> 상세정보 만들기
const getFood = async (id: string): Promise<rest | undefined> => {
  const baseUrl = 'https://apis.data.go.kr/6260000/FoodService/getFoodKr?'
  const apikey = process.env.NEXT_PUBLIC_API; //환경변수에서 API 키 가져오기
  let url = `${baseUrl}serviceKey=${apikey}&pageNo=1&numOfRows=40&resultType=json`;

  const resp = await fetch(url);
  const data = await resp.json();
  const items = data.getFoodKr.item;

  const IdData = items.find((item: rest) => item.UC_SEQ === parseInt(id));
  console.log(IdData);
  return IdData;
}

export default async function ReactRestaurantId({ params }: { params: { id: string } }) {

    const {id} = await params ;
    const restData = await getFood(id);

    return (
    <div>
      <div>
        <RestaurantDetail data={restData}/>
      </div>
    </div>
  )
}
