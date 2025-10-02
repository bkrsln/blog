const fs = require('fs')
const { resolve } = require('path')

const raw = fs.readFileSync(resolve(process.cwd(), 'blog.config.js'), 'utf-8')
const config = eval(`((module = { exports }) => { ${raw}; return module.exports })()`)

// If we need to stripe out some private fields
const clientConfig = config

// Validate Notion configuration early to produce clearer build errors (unless skipping)
// Default to SKIP_NOTION=true for initial deployment if no env vars are set
const skipNotion = process.env.SKIP_NOTION === '1' || process.env.SKIP_NOTION === 'true' || process.env.SKIP_NOTION === 'True' || !process.env.NOTION_PAGE_ID
console.log('[DEBUG] SKIP_NOTION value:', process.env.SKIP_NOTION, 'NOTION_PAGE_ID exists:', !!process.env.NOTION_PAGE_ID, 'Evaluated as:', skipNotion)
if (!skipNotion) {
  if (!config.notionPageId || config.notionPageId === '----' || config.notionPageId === 'YOUR_NOTION_PAGE_ID') {
    const msg = 'Missing or invalid Notion page id in blog.config.js. Set NOTION_PAGE_ID (or use SKIP_NOTION=1 to bypass temporarily).'
    console.error('[ERROR]', msg)
    throw new Error(msg)
  }
} else {
  console.warn('[SKIP_NOTION] Notion fetch disabled — site will build without posts.')
}

module.exports = {
  config,
  clientConfig
}
