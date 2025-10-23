# Notion Webhook Setup

## Automatic Deployment Configuration

This blog automatically deploys when Notion content changes using webhooks and GitHub Actions.

### Setup Steps:

1. **GitHub Secrets** (Repository Settings → Secrets and Variables → Actions):
   ```
   NOTION_PAGE_ID=your_notion_database_id
   NOTION_ACCESS_TOKEN=your_notion_integration_token
   GH_TOKEN=your_github_personal_access_token
   CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
   CLOUDFLARE_PROJECT_ID=your_cloudflare_pages_project_id
   NOTION_WEBHOOK_SECRET=random_secret_string (optional)
   ```

2. **Notion Integration Setup**:
   - Create Notion integration: https://www.notion.so/my-integrations
   - Add integration to your database
   - Copy integration token to `NOTION_ACCESS_TOKEN`

3. **Webhook URL**: 
   ```
   https://your-domain.com/api/notion-webhook
   ```

### How it works:

1. **Notion change** → Webhook triggers → **GitHub Actions** 
2. **GitHub Actions** builds site → **Triggers Cloudflare Pages deploy**
3. **New content** live in ~3-5 minutes

### Manual Deploy:
- GitHub Actions tab → "Auto Deploy from Notion" → "Run workflow"
- Or any git push will trigger deployment

### Fallback:
- Scheduled deploy every 2 hours as backup
- Manual Cloudflare Pages deployment always available