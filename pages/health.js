export default function Health() {
  return (
    <main style={{fontFamily:'sans-serif',padding:'2rem'}}>
      <h1>OK</h1>
      <p>Deployment health check page.</p>
      <ul>
        <li>Build Time: {new Date().toISOString()}</li>
        <li>SKIP_NOTION: {typeof process !== 'undefined' && process.env?.SKIP_NOTION === '1' ? 'ON' : 'OFF'}</li>
        <li>Has NOTION_PAGE_ID: {typeof process !== 'undefined' && process.env?.NOTION_PAGE_ID ? 'YES' : 'NO'}</li>
      </ul>
    </main>
  )
}