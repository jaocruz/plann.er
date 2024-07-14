import { Plus } from "lucide-react";

import { useState } from "react";

import { Guests } from "./guests";
import { Activities } from "./activities";
import { ImportantLinks } from "./important-links";
import { DestinationAndDateHeader } from "./destination-and-date-header";

import { ManageGuestsModal } from "./manage-guests-modal";
import { CreateNewLinkModal } from "./create-new-link-modal";
import { CreateActivityModal } from "./create-activity-modal";
import { ChangeDestinationAndDateModal } from "./change-destination-and-date-modal";

export function TripDetails(){
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)

  function openCreateActivityModal(){
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal(){
    setIsCreateActivityModalOpen(false)
  }

  const [isCreateNewLinkModalOpen, setIsCreateNewLinkModalOpen] = useState(false)

  function openCreateNewLinkModal(){
    setIsCreateNewLinkModalOpen(true)
  }

  function closeCreateNewLinkModal(){
    setIsCreateNewLinkModalOpen(false)
  }

  const [isManageGuestsModalOpen, setIsManageGuestsModalOpen]= useState(false)

  function openManageGuestsModal(){
    setIsManageGuestsModalOpen(true)
  }

  function closeManageGuestsModal(){
    setIsManageGuestsModalOpen(false)
  }

  const[isChangeDestinationAndDateModalOpen, setIsChangeDestinationAndDateModalOpen] = useState(false)

  function openChangeDestinationAndDateModalOpen(){
    setIsChangeDestinationAndDateModalOpen(true)
  }

  function closeChangeDestinationAndDateModalOpen(){
    setIsChangeDestinationAndDateModalOpen(false)
  }

  return(
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader
        openChangeDestinationAndDateModalOpen={openChangeDestinationAndDateModalOpen}
      />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button onClick={openCreateActivityModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
              <Plus className="size-5"/>
              Cadastrar atividade
            </button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks
            openCreateNewLinkModal={openCreateNewLinkModal}
          />

          <div className="w-full h-px bg-zinc-800" />

          <Guests
            openManageGuestsModal={openManageGuestsModal}
          />
        </div>
      </main>

      {isChangeDestinationAndDateModalOpen && (
        <ChangeDestinationAndDateModal
          closeChangeDestinationAndDateModalOpen={closeChangeDestinationAndDateModalOpen}
        />
      )}

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}

      {isCreateNewLinkModalOpen && (
        <CreateNewLinkModal 
          closeCreateNewLinkModal={closeCreateNewLinkModal}
        />
      )}

      {isManageGuestsModalOpen && (
        <ManageGuestsModal
          closeManageGuestsModal={closeManageGuestsModal}
        />
      )} 
    </div>
  )
}