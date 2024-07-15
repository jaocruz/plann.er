import { Calendar, MapPin, X } from "lucide-react";

import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";

import { api } from "../../../lib/axios";

import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import { Modal } from "../../../components/modal";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";

interface ChangeDestinationAndDateModalOpen{
  closeChangeDestinationAndDateModalOpen: () => void,
}

export function ChangeDestinationAndDateModal({
  closeChangeDestinationAndDateModalOpen,
}: ChangeDestinationAndDateModalOpen){

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const { tripId } = useParams()
  
  const [destination, setDestination] = useState("")
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates.from, "dd ' de ' LLL").concat(" a ").concat(format(eventStartAndEndDates.to, "dd ' de ' LLL")) : null

  function openDatePicker(){
    return setIsDatePickerOpen(true)
  }

  function closeDatePicker(){
    return setIsDatePickerOpen(false)
  }

  async function updateTripDestinyAndDate(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
  
    await api.put(`/trips/${tripId}`, {
      destination: destination,
      starts_at: eventStartAndEndDates?.from,
      ends_at: eventStartAndEndDates?.to
    })

    window.document.location.reload()
  }

  return(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <form onSubmit={updateTripDestinyAndDate}>
        <Modal>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Atualizar destino/data</h2>
              <button onClick={closeChangeDestinationAndDateModalOpen}>
                <X className="size-5 text-zinc-400"/>
              </button>
            </div>

              <p className="text-sm text-zinc-400">
                Todos os convidados serão notificados sobre a alteração.
              </p>
          </div>


          <Input variant="secondary">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400 ml-2"/>

              <input
                value={destination}
                onChange={event => setDestination(event.target.value)}
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" type="text" placeholder="Para onde você vai?"
              />
            </div>

            <button onClick={openDatePicker} className="flex items-center gap-2 text-left w-fit pr-3">
              <Calendar className="size-5 text-zinc-400"/>

              <span className="text-lg text-zinc-400 w-fit flex-1">
                {displayedDate || "Quando?"}
              </span>
            </button>

            {isDatePickerOpen && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

                <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Selecione a data</h2>
            
                      <button onClick={closeDatePicker}>
                        <X className="size-5 text-zinc-400"/>
                      </button>
                    </div>
                  </div>
                    
                  <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates}/>
            
                </div>
              </div>
              )}

          </Input>
              
          <div className="w-full h-px bg-zinc-800" />
          
          <Button variant="primary" size="full">
            Atualizar viagem
          </Button>          
        </Modal>
      </form>
    </div>
  )
}