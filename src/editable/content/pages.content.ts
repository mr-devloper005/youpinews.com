import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Find & Connect With Local Businesses',
      description: 'Discover local businesses, creative profiles, and visual content through one connected directory.',
      openGraphTitle: 'Find & Connect With Local Businesses',
      openGraphDescription: 'Browse profiles, images, and articles across the directory. Free to list your business.',
      keywords: ['business directory', 'local profiles', 'business discovery', 'connect with businesses'],
    },
    hero: {
      badge: 'Featured this week',
      title: ['Find & Connect With', 'Local Businesses'],
      description: 'Browse verified business profiles, stunning images, and curated articles. Your go-to directory for discovering exactly what you need.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'List Your Business', href: '/create' },
      searchPlaceholder: 'Search businesses, profiles, images...',
      focusLabel: 'Discover',
      featureCardBadge: 'latest profiles',
      featureCardTitle: 'Fresh business profiles shape the visual experience of the directory.',
      featureCardDescription: 'Recent profiles and images stay at the center of the experience without changing any core platform behavior.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for business owners, creators, and curious customers.',
      paragraphs: [
        'YoupiNews brings together business profiles, visual content, and articles so visitors can move naturally between different discovery paths.',
        'Instead of separating listings, images, and stories into disconnected pages, the platform keeps them connected in one place with consistent navigation.',
        'Whether someone starts with a business profile, an image gallery, or a how-to article, they can keep discovering related content without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Discovery-first homepage with strong emphasis on profiles and imagery.',
        'Connected sections for businesses, visuals, articles, and resources.',
        'Cleaner browsing rhythm designed to make exploration feel easier.',
        'Free to list — no credit card, no hidden fees.',
      ],
      primaryLink: { label: 'Browse Articles', href: '/article' },
      secondaryLink: { label: 'Browse Directory', href: '/search' },
    },
    cta: {
      badge: 'Get listed',
      title: 'List your business free — reach real customers.',
      description: 'Add your profile, showcase your services, and connect with thousands looking for exactly what you offer.',
      primaryCta: { label: 'List Your Business Free', href: '/create' },
      secondaryCta: { label: 'Browse Directory', href: '/search' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A faster, clearer way to discover local businesses.',
    description: `${slot4BrandConfig.siteName} is built to make business discovery, visual browsing, and profile exploration feel like one unified experience.`,
    paragraphs: [
      'Instead of splitting everything into disconnected pages, the platform keeps related content easy to move through and easy to understand.',
      'Whether someone starts with a business profile, a gallery image, or an article, they can continue exploring without losing context.',
    ],
    values: [
      {
        title: 'Discovery-first experience',
        description: 'We prioritize clarity, speed, and structure so people can browse businesses and profiles without noise.',
      },
      {
        title: 'Connected content surfaces',
        description: 'Profiles, images, articles, and resources stay connected so discovery feels natural across the site.',
      },
      {
        title: 'Free and fair listing',
        description: 'We believe every business deserves visibility. Listing is always free — no credit card, no hidden fees.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'A support page that matches the product, not a generic contact form.',
    description: 'Tell us what you are trying to list, fix, or launch. We will route it through the right lane instead of forcing every request into the same support bucket.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search businesses, profiles, images, and content across the directory.',
    },
    hero: {
      badge: 'Search the directory',
      title: 'Find businesses, profiles, and images faster.',
      description: 'Use keywords, categories, and content types to discover profiles from every active section of the directory.',
      placeholder: 'Search by keyword, category, business name, or topic',
    },
    resultsTitle: 'Latest directory content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Add your business profile or submit new content to the directory.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to add your business profile.',
      description: 'Use your account to open the publishing workspace and add profiles, images, and articles to the directory.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Add your business to the directory.',
      description: 'Choose the content type, add your details, and prepare a clean profile with images, links, summary, and description.',
    },
    formTitle: 'Profile details',
    submitLabel: 'Submit profile',
    successTitle: 'Profile submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your directory.',
      description: 'Login to continue browsing, managing your profiles, and adding new content to the directory.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start listing.',
      description: 'Create a free account to access the publishing workspace, save your details, and add your business to the directory.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related businesses',
      fallbackTitle: 'Business details',
    },
    image: {
      relatedTitle: 'Related images',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Similar profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
