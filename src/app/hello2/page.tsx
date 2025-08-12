//서버 컴포넌트
type helloT = {
  msg : string
}

const getFetchData = async (): Promise<helloT[]>=>{
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const resp = await fetch(`${baseUrl}/api/hello`, {cache:'no-store'}); //app>api>hello 데이터 패치하기
  const data = await resp.json();
  return data;
}

export default async function HelloPage2() {
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