import Image from 'next/image'
interface Photo {
  id: string
  url: string
}

interface ThumbnailsProps {
  photos: Photo[]
  currentIndex: number
  onThumbnailClick: (index: number) => void
}

export default function Thumbnails({ photos, currentIndex, onThumbnailClick }: ThumbnailsProps) {
  return (
    <div className="flex overflow-x-auto space-x-2 py-2">
      {photos.map((photo, index) => (
        <button
          key={photo.id}
          onClick={() => onThumbnailClick(index)}
          className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden ${
            index === currentIndex ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          <Image
            src={photo.url}
            alt={`Thumbnail ${index + 1}`}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </button>
      ))}
    </div>
  )
}

