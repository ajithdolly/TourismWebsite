import { useState, useId } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionItem {
  q: string
  a: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className = '' }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null)
  const baseId = useId()

  return (
    <div className={`divide-y divide-mist ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i
        const headingId = `${baseId}-h-${i}`
        const panelId = `${baseId}-p-${i}`
        return (
          <div key={i}>
            <button
              id={headingId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-4 py-5 text-left text-ink font-medium text-base md:text-lg hover:text-forest transition-colors cursor-pointer"
            >
              <span>{item.q}</span>
              <ChevronDown
                size={20}
                className={`shrink-0 mt-0.5 text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              hidden={!isOpen}
              className="pb-5 text-muted leading-relaxed text-base"
            >
              {item.a}
            </div>
          </div>
        )
      })}
    </div>
  )
}
