
interface TailballProps {
  n : number
}

export default function TailBall({n} : TailballProps) {
    const bg = [
        "bg-red-200", "bg-amber-200", "bg-lime-200",
        "bg-sky-200", "bg-purple-200"
    ]


  return (
    <div className={`w-25 h-25 rounded-full m-3
                    flex justify-center items-center
                    font-bold text-2xl                  
                    ${bg[Math.floor(n/10)]}`}>
       {n}
    </div>
  )
}
