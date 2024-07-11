import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react"
import { Button } from "../../../components/button"

interface DestinationAndDateStepProps{
  isGuestsInputOpen: boolean,
  openGuestsInput: () => void
  closeGuestsInput: () => void,
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  openGuestsInput,
  closeGuestsInput
}: DestinationAndDateStepProps){

  return(
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-4">
      
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400 ml-2"/>
        <input disabled={isGuestsInputOpen} className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" type="text" placeholder="Para onde você vai?" />
      </div>

      <button disabled={isGuestsInputOpen} className="flex items-center gap-2 text-left">
        <Calendar className="size-5 text-zinc-400"/>

        <span className="text-lg text-zinc-400">
          Quando?
        </span>
      </button>

      <div className="w-px h-6 bg-zinc-800"/>

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5"/>
        </Button>
      ) : (
        <Button onClick={openGuestsInput}>
          Continuar
          <ArrowRight className="size-5"/>
        </Button>
      )}

    </div>
  )
}