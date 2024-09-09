
import { NextRequest, NextResponse } from 'next/server';
import subdomains from './subdomains';




export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host");


  // Define allowed Domains (localhost and production domain)
  const allowedDomains = ["localhost:3000","rasadmammadov.com"];
  
  // Verify if hostname exist in allowed domains
  const isAllowedDomain = allowedDomains.some(domain => hostname!.includes(domain));

 
  // Extract the possible subdomain in the URL
  const subdomain = hostname!.split('.')[0];

  
  // If we stay in a allowed domain and its not a subdomain, allow the request.
  if (isAllowedDomain && !subdomains.some(d => d.subdomain === subdomain)) {
    return NextResponse.next();
  }

  const subdomainData = subdomains.find(d => d.subdomain === subdomain);

  if (subdomainData) {
    // Rewrite the URL in the dynamic route based in the subdomain
    
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
  }

  return new Response(null, { status: 404 });
}