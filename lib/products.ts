export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  priceInCents: number
  compareAtInCents: number
  image: string
  rating: number
  reviews: number
  specs: { label: string; value: string }[]
  colors: { name: string; swatch: string }[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'volt-h1',
    name: 'VOLT H1',
    tagline: 'Over-ear ANC headphones',
    description:
      'Hybrid active noise cancelling, 40mm graphene drivers and a battery that outlasts your week. Folds flat, weighs nothing.',
    priceInCents: 14900,
    compareAtInCents: 24900,
    image: '/products/headphones.png',
    rating: 4.8,
    reviews: 2184,
    specs: [
      { label: 'Battery', value: '60 hrs' },
      { label: 'ANC', value: '-42 dB' },
      { label: 'Weight', value: '238 g' },
      { label: 'Charge', value: 'USB-C' },
    ],
    colors: [
      { name: 'Carbon', swatch: '#1a1a1c' },
      { name: 'Fog', swatch: '#c9cbcf' },
      { name: 'Volt', swatch: '#c6f432' },
    ],
  },
  {
    id: 'volt-b2',
    name: 'VOLT B2',
    tagline: 'True wireless earbuds',
    description:
      'Pocket-sized sound with adaptive ANC, spatial audio and multipoint pairing. IPX5 so sweat sessions are fine.',
    priceInCents: 7900,
    compareAtInCents: 12900,
    image: '/products/earbuds.png',
    rating: 4.7,
    reviews: 3410,
    specs: [
      { label: 'Battery', value: '36 hrs' },
      { label: 'ANC', value: '-38 dB' },
      { label: 'Rating', value: 'IPX5' },
      { label: 'Latency', value: '45 ms' },
    ],
    colors: [
      { name: 'Carbon', swatch: '#1a1a1c' },
      { name: 'Fog', swatch: '#c9cbcf' },
    ],
  },
  {
    id: 'volt-w3',
    name: 'VOLT W3',
    tagline: 'Fitness smartwatch',
    description:
      'Always-on AMOLED, dual-band GPS, and 14-day battery. Tracks sleep, HRV and 120+ workouts without a subscription.',
    priceInCents: 12900,
    compareAtInCents: 19900,
    image: '/products/watch.png',
    rating: 4.6,
    reviews: 1297,
    specs: [
      { label: 'Battery', value: '14 days' },
      { label: 'Display', value: '1.43" AMOLED' },
      { label: 'GPS', value: 'Dual-band' },
      { label: 'Water', value: '5 ATM' },
    ],
    colors: [
      { name: 'Carbon', swatch: '#1a1a1c' },
      { name: 'Titanium', swatch: '#8d8f93' },
    ],
  },
]

export function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)
}
