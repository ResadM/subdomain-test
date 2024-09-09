"use client";

import { useParams } from "next/navigation";

export default function SubdomainPage() {
  const params = useParams();
  const tenant = params.subdomains;
  return <div>Subdomain Page {tenant}</div>;
}
