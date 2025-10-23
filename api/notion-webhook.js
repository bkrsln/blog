// Notion webhook handler
export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    // Verify webhook secret (optional security)
    const webhookSecret = process.env.NOTION_WEBHOOK_SECRET;
    const receivedSecret = req.headers['x-webhook-secret'];
    
    if (webhookSecret && receivedSecret !== webhookSecret) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Trigger GitHub Actions workflow
    const githubToken = process.env.GH_TOKEN;
    const repoOwner = 'bkrsln';
    const repoName = 'blog';
    
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/dispatches`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'notion-update',
          client_payload: {
            timestamp: new Date().toISOString(),
            source: 'notion-webhook'
          }
        })
      }
    );
    
    if (response.ok) {
      console.log('GitHub Actions workflow triggered successfully');
      return res.status(200).json({ 
        message: 'Deploy triggered successfully',
        timestamp: new Date().toISOString()
      });
    } else {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
}