interface ResponsiveImageProps {
  stem: string
  alt: string
  className?: string
  sizes?: string
  eager?: boolean
  objectPosition?: string
}

export function ResponsiveImage({
  stem,
  alt,
  className = '',
  sizes = '100vw',
  eager = false,
  objectPosition = 'center',
}: ResponsiveImageProps) {
  const base = `${import.meta.env.BASE_URL}images/baden/${stem}.jpg`

  return (
    <img
      src={base}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      className={`object-cover w-full h-full ${className}`}
      style={{ objectPosition }}
      sizes={sizes}
      onError={e => {
        const img = e.currentTarget
        img.style.background = '#CBD9C8'
        img.alt = alt
      }}
    />
  )
}
