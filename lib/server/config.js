const fs = require('fs')
const { resolve } = require('path')

const raw = fs.readFileSync(resolve(process.cwd(), 'blog.config.js'), 'utf-8')
const config = eval(`((module = { exports }) => { ${raw}; return module.exports })()`)

// If we need to stripe out some private fields
const clientConfig = config

// Validate Notion configuration early to produce clearer build errors (unless skipping)
const skipNotion = process.env.SKIP_NOTION === '1'
if (!skipNotion) {
  if (!config.notionPageId || config.notionPageId === '----' || config.notionPageId === 'YOUR_NOTION_PAGE_ID') {
    const msg = 'Missing or invalid Notion page id in blog.config.js. Set NOTION_PAGE_ID (or use SKIP_NOTION=1 to bypass temporarily).'
    if (process.env.CI || process.env.NETLIFY || process.env.GITHUB_ACTIONS || process.env.VERCEL_ENV) {
      throw new Error(msg)
    } else {
      console.warn(msg)
    }
  }
} else {
  console.warn('[SKIP_NOTION=1] Notion fetch disabled — site will build without posts.')
}

module.exports = {
  config,
  clientConfig
}
