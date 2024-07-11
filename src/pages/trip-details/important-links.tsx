import { Link2, Plus } from "lucide-react"
import { useState } from "react"

import { Button } from "../../components/button"
import { CreateNewLinkModal } from "./create-new-link-modal"

export function ImportantLinks(){
  const [isCreateNewLinkModalOpen, setIsCreateNewLinkModalOpen] = useState(false)

  function openCreateNewLinkModal(){
    setIsCreateNewLinkModalOpen(true)
  }

  function closeCreateNewLinkModal(){
    setIsCreateNewLinkModalOpen(false)
  }

  return(
    <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
                  <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">https://www.airbnb.com.br/rooms/1047000113463575757</a>
                </div>

                <Link2 className="text-zinc-400 size-5 shrink-0" />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
                  <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">https://www.airbnb.com.br/rooms/1047000113463575757</a>
                </div>

                <Link2 className="text-zinc-400 size-5 shrink-0" />
              </div>
            </div>

            <Button onClick={openCreateNewLinkModal} variant="secondary" size="full">
              <Plus className="size-5"/>
              Cadastrar novo link
            </Button>

            {isCreateNewLinkModalOpen && (
              <CreateNewLinkModal 
                closeCreateNewLinkModal={closeCreateNewLinkModal}
              />
            )}
          </div>
  )
}