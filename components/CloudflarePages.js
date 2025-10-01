const CloudflarePages = () => {
  return (
    <a
      href="https://pages.cloudflare.com"
      target="_blank"
      rel="noreferrer"
      aria-label="Cloudflare Pages"
    >
      <svg
        width="135"
        height="28"
        viewBox="0 0 135 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block"
      >
        <rect width="135" height="28" rx="4" fill="#f38020"/>
        <path
          d="M20 8L28 14L20 20L15 16L20 12L15 8L20 8Z"
          fill="white"
        />
        <text x="35" y="17" fontSize="11" fill="white" fontFamily="system-ui, sans-serif" fontWeight="500">
          Powered by Cloudflare Pages
        </text>
      </svg>
    </a>
  )
}

export default CloudflarePages