import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Dialog({ open, onClose, title, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (open) {
      el.showModal()
      closeRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      el.close()
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    const handler = (e: Event) => {
      e.preventDefault()
      onClose()
    }
    el.addEventListener('cancel', handler)
    return () => el.removeEventListener('cancel', handler)
  }, [onClose])

  if (!open) return null

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      onClick={e => { if (e.target === dialogRef.current) onClose() }}
      className="fixed inset-0 m-auto w-full max-w-2xl max-h-[90dvh] rounded-3xl p-0 bg-paper shadow-2xl backdrop:bg-ink/60 open:flex open:flex-col overflow-hidden"
    >
      <div className="flex items-center justify-between px-8 py-5 border-b border-mist">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="p-2 rounded-full text-muted hover:text-ink hover:bg-mist transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>
      <div className="overflow-y-auto flex-1 p-8">
        {children}
      </div>
    </dialog>
  )
}
