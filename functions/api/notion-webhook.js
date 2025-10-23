export async function onRequestPost(context) {
  const { request } = context;
  
  try {
    const body = await request.json();
    
    // Handle Notion webhook verification challenge
    if (body?.challenge) {
      console.log('Webhook verification challenge received:', body.challenge);
      return new Response(JSON.stringify({ challenge: body.challenge }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      });
    }
    
    console.log('Webhook received from Notion:', body);
    
    // Trigger GitHub Actions workflow
    const githubToken = context.env.GH_TOKEN;
    const repoOwner = 'bkrsln';
    const repoName = 'blog';
    
    if (githubToken) {
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
      }
    }
    
    return new Response(JSON.stringify({ 
      message: 'Webhook processed successfully',
      timestamp: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ 
      message: 'Internal server error',
      error: error.message 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}

export async function onRequestGet(context) {
  return new Response(JSON.stringify({ 
    message: 'Notion webhook endpoint is active',
    timestamp: new Date().toISOString()
  }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
}