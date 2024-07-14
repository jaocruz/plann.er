import { Mail, User, X } from "lucide-react";

import { FormEvent } from "react";

import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Modal } from "../../components/modal";

interface ConfirmTripModalProps{
  closeConfirmTripModal: () => void,
  setOwnerName: (name: string) => void,
  setOwnerEmail: (email: string) => void,
  createTrip: (event: FormEvent<HTMLFormElement>) => void,
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail
}: ConfirmTripModalProps){

  return(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

      <Modal>
        <div className="space-y-2">

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>

            <button onClick={closeConfirmTripModal}>
              <X className="size-5 text-zinc-400"/>
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem preencha seus dados abaixo:
          </p>

        </div>
        
        <form onSubmit={createTrip} className="space-y-3 w-full">     
 
          <Input variant="secondary">
            <User className="text-zinc-400 size-5"/>

            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              onChange={(event) => setOwnerName(event.target.value)}
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </Input>

          <Input variant="secondary">
            <Mail className="text-zinc-400 size-5"/>

            <input
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              onChange={(event) => setOwnerEmail(event.target.value)}
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </Input>

          <Button type="submit" variant="primary" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
        
      </Modal>
    </div> 
  )
}