import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Business Discovery Platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Find · Connect · Grow',
    announcement: [
      'New profiles added daily — discover fresh businesses today',
      'Free to list your business · No credit card needed',
      '500+ verified business profiles and growing',
    ],
    primaryLinks: [
      { label: 'Articles', href: '/article' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Add Profile', href: '/create' },
      secondary: { label: 'Sign In', href: '/login' },
    },
  },
  footer: {
    tagline: 'Find · Connect · Grow',
    description: 'Discover local businesses, creative profiles, and visual content through one connected directory built for modern business owners.',
    columns: [
      {
        title: 'Discover',
        links: [
          { label: 'Articles', href: '/article' },
          { label: 'Resources', href: '/pdf' },
        ],
      },
      {
        title: 'Business',
        links: [
          { label: 'Add Your Profile', href: '/create' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Free to list · Verified profiles · Growing community.',
  },
  commonLabels: {
    readMore: 'View profile',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Listed',
  },
} as const
