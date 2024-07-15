import { AtSign, Plus, X } from "lucide-react"

import { api } from "../../../lib/axios"

import { useParams } from "react-router-dom"
import { FormEvent, useEffect, useState } from "react"

import { Modal } from "../../../components/modal"
import { Input } from "../../../components/input"
import { Button } from "../../../components/button"

interface ManageGuestsModalProps{
  closeManageGuestsModal: () => void,
}

interface Participant{
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export function ManageGuestsModal({
  closeManageGuestsModal,
}: ManageGuestsModalProps){

  const { tripId } = useParams()

  const [participants, setParticipants] = useState<Participant[]>([])
  const [newParticipants, setNewParticipants] = useState<string[]>([]);

  const addNewEmailToInvite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const newEmail = emailInput.value.trim();
    
    if (newEmail && !newParticipants.includes(newEmail)) {        
        setNewParticipants([...newParticipants, newEmail]);
        
        emailInput.value = "";
    }
  };

  const removeNewParticipant = (email: string) => {
    const filteredNewParticipants = newParticipants.filter((e) => e !== email);
    setNewParticipants(filteredNewParticipants);
  };

  const sendInvitesToBackend = async () => {
    const inviteRequests = [];
  
    for (const email of newParticipants) {
      inviteRequests.push(api.post(`/trips/${tripId}/invites`, { email }));
    }
  
    await Promise.all(inviteRequests);
  
    window.document.location.reload();
  };
  
  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
  }, [tripId])

  return(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <Modal>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Gerenciar convidados</h2>
            <button onClick={closeManageGuestsModal}>
              <X className="size-5 text-zinc-400"/>
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Os novos convidados irão receber e-mails para confirmar a participação na viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
        {
          participants.map((participants) => (
            <div key={participants.email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
              <span className="text-zinc-300">{participants.email}</span>

              <button type="button">
                <X className="size-4 text-zinc-400"/>
              </button>
            </div>
          ))
        }

        {
          newParticipants.map((email) => (
            <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
              <span className="text-zinc-300">{email}</span>

              <button type="button" onClick={() => removeNewParticipant(email)}>
                <X className="size-4 text-zinc-400"/>
              </button>
            </div>
          ))
        }
        </div>
        
        <div className="w-full h-px bg-zinc-800" />

        <Input variant="secondary">
          <form onSubmit={addNewEmailToInvite} className="bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2 w-full">
            <div className=" flex items-center flex-1 gap-2">
              <AtSign className="text-zinc-400 size-5"/>

              <input
                type="email"
                name="email"
                placeholder="Digite o e-mail do convidado"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>
                
            <Button variant="secondary">
              <Plus className="size-5"/>
              Convidar
            </Button>
          </form>
        </Input>  

        <Button onClick={sendInvitesToBackend} variant="primary" size="full">
          Salvar alterações
        </Button>    
      </Modal>
    </div>
  )
}