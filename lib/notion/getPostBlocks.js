import api from '@/lib/server/notion-api'

export async function getPostBlocks (id) {
  let retries = 3
  let lastError
  
  while (retries > 0) {
    try {
      const pageBlock = await api.getPage(id)
      return pageBlock
    } catch (error) {
      console.log(`Retry attempt for page ${id}, retries left: ${retries - 1}`)
      lastError = error
      retries--
      
      if (retries > 0) {
        // 2 saniye bekle ve tekrar dene
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }
  }
  
  // Tüm retry'lar başarısız olursa boş bir obje döndür
  console.error(`Failed to get blocks for page ${id}:`, lastError)
  return {}
}
