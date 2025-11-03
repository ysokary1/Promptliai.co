import { client } from './sanity.client'

// Fetch site settings
export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings" && _id == "siteSettings"][0]{
      title,
      description,
      phone,
      email,
      address,
      companyName,
      companyDescription,
      socialLinks
    }`
  )
}

// Fetch hero section
export async function getHeroSection() {
  return client.fetch(
    `*[_type == "heroSection" && _id == "heroSection"][0]{
      heading,
      subheading,
      primaryButtonText,
      secondaryButtonText,
      badge1,
      badge2
    }`
  )
}

// Fetch all services
export async function getServices() {
  return client.fetch(
    `*[_type == "service"] | order(order asc){
      _id,
      name,
      description,
      icon,
      order,
      showInFooter
    }`
  )
}

// Fetch footer services only
export async function getFooterServices() {
  return client.fetch(
    `*[_type == "service" && showInFooter == true] | order(order asc){
      _id,
      name,
      description,
      icon,
      order
    }`
  )
}

// Fetch all pricing plans
export async function getPricingPlans() {
  return client.fetch(
    `*[_type == "pricingPlan"] | order(order asc){
      _id,
      name,
      monthlyPrice,
      yearlyPrice,
      period,
      description,
      features,
      buttonText,
      isPopular,
      isComingSoon,
      order
    }`
  )
}
