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

// Fetch process section
export async function getProcessSection() {
  return client.fetch(
    `*[_type == "processSection" && _id == "processSection"][0]{
      title,
      subtitle,
      steps[] | order(order asc) {
        title,
        description,
        icon,
        order
      }
    }`
  )
}

// Fetch stats section
export async function getStatsSection() {
  return client.fetch(
    `*[_type == "statsSection" && _id == "statsSection"][0]{
      title,
      subtitle,
      stats[] | order(order asc) {
        value,
        label,
        description,
        icon,
        order
      }
    }`
  )
}

// Fetch CTA section
export async function getCTASection() {
  return client.fetch(
    `*[_type == "ctaSection" && _id == "ctaSection"][0]{
      title,
      subtitle,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink,
      backgroundStyle
    }`
  )
}

// Fetch page by slug
export async function getPageBySlug(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug && isPublished == true][0]{
      _id,
      title,
      slug,
      metaTitle,
      metaDescription,
      sections[] {
        _type == 'reference' => @->{
          _id,
          _type,
          title,
          subtitle,
          heading,
          subheading,
          primaryButtonText,
          primaryButtonLink,
          secondaryButtonText,
          secondaryButtonLink,
          badge1,
          badge2,
          backgroundStyle,
          steps[] | order(order asc) {
            title,
            description,
            icon,
            order
          },
          stats[] | order(order asc) {
            value,
            label,
            description,
            icon,
            order
          }
        },
        _type == 'servicesSection' => {
          _type,
          title,
          subtitle,
          layout
        },
        _type == 'pricingSection' => {
          _type,
          title,
          subtitle,
          showToggle
        },
        _type == 'customContent' => {
          _type,
          title,
          content,
          alignment
        }
      }
    }`,
    { slug }
  )
}

// Fetch all published pages
export async function getAllPages() {
  return client.fetch(
    `*[_type == "page" && isPublished == true]{
      _id,
      title,
      slug,
      metaTitle,
      metaDescription
    }`
  )
}

// Fetch legal page by slug
export async function getLegalPageBySlug(slug: string) {
  return client.fetch(
    `*[_type == "legalPage" && slug.current == $slug][0]{
      title,
      slug,
      lastUpdated,
      effectiveDate,
      introduction,
      content,
      contactEmail
    }`,
    { slug }
  )
}
