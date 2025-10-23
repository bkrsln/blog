// Utility function to generate webhook signature
async function generateSignature(body, secret) {
  const encoder = new TextEncoder();
  const data = encoder.encode(body);
  const key = encoder.encode(secret);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, data);
  const hashArray = Array.from(new Uint8Array(signature));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return `sha256=${hashHex}`;
}

export async function onRequestPost(context) {
  const { request } = context;
  
  try {
    // Read body as text first for signature verification
    const bodyText = await request.text();
    
    // Verify webhook signature if secret is provided (optional)
    if (context.env.NOTION_WEBHOOK_SECRET) {
      const signature = request.headers.get('notion-webhook-signature') || 
                       request.headers.get('x-notion-signature');
      
      if (signature) {
        const expectedSignature = await generateSignature(bodyText, context.env.NOTION_WEBHOOK_SECRET);
        if (signature !== expectedSignature) {
          console.error('Invalid webhook signature');
          return new Response(JSON.stringify({ 
            message: 'Invalid signature' 
          }), {
            headers: { 'Content-Type': 'application/json' },
            status: 401
          });
        }
        console.log('Webhook signature verified successfully');
      }
    } else {
      console.log('Webhook received without signature verification (no secret configured)');
    }
    
    const body = JSON.parse(bodyText);
    
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