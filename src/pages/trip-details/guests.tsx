import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";

import { api } from "../../lib/axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "../../components/button";

interface Participant{
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export function Guests(){
  const { tripId } = useParams()

  const [participants, setParticipants] = useState<Participant[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
  }, [tripId])

  return(
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {
          participants.map((participants, index) => {
            return(
              <div key={participants.id} className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">{participants.name ?? `Convidado ${index}`}</span>
                  <span className="block text-sm text-zinc-400 truncate">{participants.email}</span>
                </div>

                {participants.is_confirmed ? (
                  <CheckCircle2 className="size-5 shrink-0 text-green-400" />
                ) : (
                  <CircleDashed className= "size-5 shrink-0 text-zinc-400" />
                )}
              </div>
            )
          })
        }
      </div>

      <Button variant="secondary" size="full">
        <UserCog className="size-5"/>
        Gerenciar convidados
      </Button>
    </div>
  )
}