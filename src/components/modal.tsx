import { ReactNode } from "react"

interface ModalProps{
  children: ReactNode
}

export function Modal({children}: ModalProps){
  return(
    <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
      {children}
    </div>
  )
}