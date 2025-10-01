const fs = require('fs')
const path = require('path')

// Simple script to generate RSS feed for static export
// This is a basic implementation - can be enhanced if needed
async function generateStaticRSS() {
  const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Bekir Arslan</title>
    <description>@bkrsln</description>
    <link>https://bekirarslan.com</link>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  </channel>
</rss>`

  const publicDir = path.join(process.cwd(), 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  
  fs.writeFileSync(path.join(publicDir, 'feed.xml'), rssContent)
  console.log('RSS feed generated at public/feed.xml')
}

if (require.main === module) {
  generateStaticRSS().catch(console.error)
}

module.exports = { generateStaticRSS }