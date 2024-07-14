import { ArrowRight, UserRoundPlus } from "lucide-react"

import { Button } from "../../../components/button"
import { Input } from "../../../components/input"

interface InviteGuestsStep{
  emailsToInvite: string[]
  openGuestsModal: () => void
  openConfirmTripModal: () => void
}

export function InviteGuestsStep({
  emailsToInvite,
  openGuestsModal,
  openConfirmTripModal,
}: InviteGuestsStep){

  return(
    <Input variant="primary">
      <button type="button" onClick={openGuestsModal} className="flex items-center gap-2 flex-1 text-left">
        <UserRoundPlus className="size-5 text-zinc-400 ml-2"/>
        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-100 text-lg flex-1">{emailsToInvite.length} pessoa(s) convidada(s)</span>
        ) : (
          <span className="text-zinc-400 text-lg flex-1">Quem estará na viagem?</span>
        )}
      </button>

      <div className="w-px h-6 bg-zinc-800"/>

      <Button onClick={openConfirmTripModal} variant="primary">
        Confirmar viagem
        <ArrowRight className="size-5"/>
      </Button>
    </Input>
  )
}