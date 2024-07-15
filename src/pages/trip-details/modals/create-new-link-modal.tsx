import { X, Tag, Link2 } from "lucide-react"

import { FormEvent } from "react"
import { useParams } from "react-router-dom"

import { api } from "../../../lib/axios"

import { Input } from "../../../components/input"
import { Modal } from "../../../components/modal"
import { Button } from "../../../components/button"

interface CreateNewLinkModalProps{
  closeCreateNewLinkModal: () => void
}

export function CreateNewLinkModal({
  closeCreateNewLinkModal
}: CreateNewLinkModalProps){

  const { tripId } = useParams()

  async function createNewLink(event:
    FormEvent<HTMLFormElement>){
      event.preventDefault()

      const data = new FormData(event.currentTarget)

      const title = data.get("title")?.toString()
      const url = data.get("url")?.toString()

      await api.post(`trips/${tripId}/links`, {
        title,
        url
      })

      window.document.location.reload()
    }
  
  return(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <Modal>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>
            <button onClick={closeCreateNewLinkModal}>
              <X className="size-5 text-zinc-400"/>
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>
          
        <form onSubmit={createNewLink} className="space-y-3">
          <Input variant="secondary">
            <Tag className="text-zinc-400 size-5"/>

            <input
              type="text"
              name="title"
              placeholder="Título do link"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </Input>

          <Input variant="secondary">
            <Link2 className="text-zinc-400 size-5"/>

            <input
              type="text"
              name="url"
              placeholder="URL"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </Input>

          <div className="w-full h-px bg-zinc-800" />
          
          <Button variant="primary" size="full">
            Salvar link
          </Button>
        </form>
      </Modal>
    </div>
  )
}