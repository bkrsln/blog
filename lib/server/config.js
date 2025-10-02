const fs = require('fs')
const { resolve } = require('path')

const raw = fs.readFileSync(resolve(process.cwd(), 'blog.config.js'), 'utf-8')
const config = eval(`((module = { exports }) => { ${raw}; return module.exports })()`)

// If we need to stripe out some private fields
const clientConfig = config

// Validate Notion configuration early to produce clearer build errors
if (!config.notionPageId || config.notionPageId === '----' || config.notionPageId === 'YOUR_NOTION_PAGE_ID') {
  // Don't crash in dev, but fail during CI/builds with actionable message
  const msg = 'Missing or invalid Notion page id in blog.config.js. Please set NOTION_PAGE_ID in Cloudflare environment variables or update blog.config.js.'
  // In CI/build environments, throw to stop the build and surface the message
  if (process.env.CI || process.env.NETLIFY || process.env.GITHUB_ACTIONS || process.env.VERCEL_ENV) {
    throw new Error(msg)
  } else {
    console.warn(msg)
  }
}

module.exports = {
  config,
  clientConfig
}
