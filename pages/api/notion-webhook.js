// Notion webhook handler
export default async function handler(req, res) {
  // Handle Notion webhook verification challenge
  if (req.method === 'POST' && req.body?.challenge) {
    console.log('Webhook verification challenge received:', req.body.challenge);
    return res.status(200).json({ challenge: req.body.challenge });
  }
  
  // Handle GET requests for verification
  if (req.method === 'GET') {
    return res.status(200).json({ 
      message: 'Notion webhook endpoint is active',
      timestamp: new Date().toISOString()
    });
  }
  
  // Only accept POST requests for actual webhooks
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    // Skip webhook secret verification for now (Notion may not provide one)
    console.log('Webhook received from Notion:', {
      method: req.method,
      headers: Object.keys(req.headers),
      body: req.body ? 'Present' : 'Missing'
    });
    
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