'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import fs from 'fs'
import path from 'path'

export async function uploadPhoto(formData: FormData) {
  const file = formData.get('photo') as File
  if (!file) {
    throw new Error('No file uploaded')
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  const uploadPath = path.join(uploadDir, file.name)

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }
  
  const fileBuffer = Buffer.from(await file.arrayBuffer())
  fs.writeFileSync(uploadPath, fileBuffer)

  const url = `/uploads/${file.name}`

  await prisma.photo.create({
    data: { url }
  })

  revalidatePath('/')
}

export async function getPhotos() {
  return prisma.photo.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

