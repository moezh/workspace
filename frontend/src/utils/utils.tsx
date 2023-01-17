export function getDomain(hostname: string) {
  const domainparts = hostname.split(".");
  const domain = domainparts
    .slice(domainparts.length - 2, domainparts.length)
    .join(".");
  return domain;
}

export function getSubdomain(hostname: string) {
  const domainparts = hostname.split(".");
  const subdomain = domainparts
    .slice(0, domainparts.length - 2)
    .reverse()
    .join(".");
  return subdomain;
}
