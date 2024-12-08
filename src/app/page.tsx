import { getPhotos } from '@/actions/photoactions'
import PhotoGallery from '@/components/PhotoGallery'
import UploadForm from '@/components/UploadForm'

export default async function Home() {
  const photos = await getPhotos()

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Photo Gallery</h1>
      <UploadForm />
      <PhotoGallery initialPhotos={photos} />
    </main>
  )
}

