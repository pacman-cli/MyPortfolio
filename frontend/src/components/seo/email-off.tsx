import React from 'react'

/**
 * Prevents Cloudflare Email Address Obfuscation from replacing mailto: links
 * with JS scripts (/cdn-cgi/l/email-protection#...) that return 404 for search engine crawlers.
 */
export function EmailOff({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: '<!--email_off-->' }} />
      {children}
      <span dangerouslySetInnerHTML={{ __html: '<!--/email_off-->' }} />
    </>
  )
}
