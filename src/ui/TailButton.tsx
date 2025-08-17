import type { MouseEvent } from 'react';

type buttonColor = "blue" | "orange" | "lime" ;

interface TailButtonProps {
  caption : string,
  // color : "blue" | "orange" | "lime",
  color : buttonColor,
  onHandle? : (e:MouseEvent<HTMLButtonElement>) => void
}

export default function TailButton({caption, color, onHandle} : TailButtonProps) {
  const bg = {
    "blue" : "bg-blue-800",
    "orange" : "bg-orange-800",
    "lime" : "bg-lime-800"
  }

    const hoverbg = {
    "blue" : "hover:bg-blue-400",
    "orange" : "hover:bg-orange-400",
    "lime" : "hover:bg-lime-400"
  }
  return (
    <button className={`p-4 rounded-xl m-4 text-white 
                      flex items-center justify-center
                       hover:cursor-pointer hover:font-bold  h-10
                       
                      ${bg[color]} ${hoverbg[color]}`}
            onClick={onHandle}>
      {caption}
    </button>
  )
}