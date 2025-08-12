//서버 컴포넌트 -> Fetch data from databases or APIs close to the source 에 사용하면 좋음
//훅 사용이 제한됨
type helloT = {
  msg : string
}

//화살표 함수에서 -> 함수 형식으로 변환
async function getFetchData():Promise<helloT[]>{
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const resp = await fetch(`${baseUrl}/api/hello`, {cache:'no-store'}); //들어오는 시점에 패치시키기 위해 cache 옵션을 줌 -> dynamic mode
  const data = await resp.json();
  return data;
}

export default async function HelloPageS() {
  const tdata = await getFetchData();

  return (
    <div className="w-full h-screen
                    flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">
        {
            tdata && tdata.map((item:helloT) => <div key={item.msg}>
                                                  {item.msg}
                                                </div>)
        }
      </h1>
    </div>
  );
}