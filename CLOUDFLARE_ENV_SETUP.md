# Cloudflare Pages Environment Variables Setup

This project requires the following environment variables configured in Cloudflare Pages for builds to succeed:

Required variables:

- NOTION_PAGE_ID
  - Description: The Notion database page id that contains your blog posts.
  - Example: `5a3c8b44-e771-4684-8c69-1836224add4d`

- NOTION_ACCESS_TOKEN (optional but recommended)
  - Description: If your Notion database is not public, set an integration token here.
  - How to get: Create an integration in Notion and share the database with it.

How to set variables in Cloudflare Pages:

1. Open Cloudflare dashboard -> Pages -> your project
2. Settings -> Environment variables (or Build variables)
3. Add `NOTION_PAGE_ID` with the value from your Notion database
4. Add `NOTION_ACCESS_TOKEN` if needed
5. Save and trigger a redeploy (push a dummy commit or click Redeploy)

Troubleshooting:
- If you see `Error: NOTION_PAGE_ID is missing or invalid` in build logs, that means the `NOTION_PAGE_ID` is not set correctly.
- Make sure the page id is the collection page id (not a post id). Use `idToUuid` helper from `notion-utils` to convert if needed.

