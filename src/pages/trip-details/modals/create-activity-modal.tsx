import { X, Tag, Calendar } from "lucide-react"

import { api } from "../../../lib/axios"

import { FormEvent } from "react"
import { useParams } from "react-router-dom"

import { Input } from "../../../components/input"
import { Modal } from "../../../components/modal"
import { Button } from "../../../components/button"

interface CreateActivityModalProps{
  closeCreateActivityModal: () => void
}

export function CreateActivityModal({
  closeCreateActivityModal
}: CreateActivityModalProps){

  const { tripId } = useParams()

  async function createActivity(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get("title")?.toString()
    const occurs_at = data.get("occurs_at")?.toString()

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at
    })

    window.document.location.reload()
  }
  
  return(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <Modal>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button onClick={closeCreateActivityModal}>
              <X className="size-5 text-zinc-400"/>
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>
        
        <form onSubmit={createActivity} className="space-y-3">
          <Input variant="secondary">
            <Tag className="text-zinc-400 size-5"/>

            <input
              type="text"
              name="title"
              placeholder="Qual a atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </Input>

          <Input variant="secondary">
            <Calendar className="text-zinc-400 size-5"/>

            <input
              type="datetime-local"
              name="occurs_at"
              placeholder="Data"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </Input>

          <div className="w-full h-px bg-zinc-800" />
          
          <Button variant="primary" size="full">
            Salvar atividade
          </Button>
        </form>
      </Modal>
    </div>
  )
}