'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Thumbnails from '@/components/Thumbnails'

interface Photo {
  id: string
  url: string
}

interface PhotoGalleryProps {
  initialPhotos: Photo[]
}

export default function PhotoGallery({ initialPhotos }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // Added state for animation direction

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : initialPhotos.length - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex < initialPhotos.length - 1 ? prevIndex + 1 : 0
    )
  }

  const handleThumbnailClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  if (initialPhotos.length === 0) {
    return <p>No photos uploaded yet.</p>
  }

  const currentPhoto = initialPhotos[currentIndex]

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-4">
        <div className="relative aspect-square mb-4">
          <Image
            src={currentPhoto.url}
            alt={`Photo ${currentIndex + 1}`}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <Button onClick={goToPrevious}>Previous</Button>
          <Button onClick={goToNext}>Next</Button>
        </div>
        <Thumbnails
          photos={initialPhotos}
          currentIndex={currentIndex}
          onThumbnailClick={handleThumbnailClick}
        />
      </CardContent>
    </Card>
  )
}

