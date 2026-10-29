export interface Review {
  id: string
  author: string
  rating: number
  title: string
  body: string
  date: string
}

export interface ProductReviews {
  breakdown: [number, number, number, number, number]
  items: Review[]
}

export const REVIEWS: Record<string, ProductReviews> = {
  'volt-h1': {
    breakdown: [84, 11, 3, 1, 1],
    items: [
      {
        id: 'h1-1',
        author: 'Maya R.',
        rating: 5,
        title: 'Better than my old $350 pair',
        body: 'The ANC kills subway noise completely and I charge them maybe twice a month. Comfortable for long coding sessions.',
        date: 'Oct 2026',
      },
      {
        id: 'h1-2',
        author: 'Jonah K.',
        rating: 5,
        title: 'Insane value',
        body: 'Sound is punchy without being muddy. Multipoint switching between laptop and phone just works.',
        date: 'Sep 2026',
      },
      {
        id: 'h1-3',
        author: 'Priya S.',
        rating: 4,
        title: 'Great, slightly tight at first',
        body: 'Clamp force eased up after a week. Battery life is unreal and the app EQ is actually useful.',
        date: 'Sep 2026',
      },
    ],
  },
  'volt-b2': {
    breakdown: [78, 15, 4, 2, 1],
    items: [
      {
        id: 'b2-1',
        author: 'Leo T.',
        rating: 5,
        title: 'Gym-proof',
        body: 'Survived months of sweaty workouts. They stay put and the case fits in my coin pocket.',
        date: 'Oct 2026',
      },
      {
        id: 'b2-2',
        author: 'Ava M.',
        rating: 5,
        title: 'Low latency for gaming',
        body: 'Game mode is genuinely snappy. No noticeable lag on my phone or Switch.',
        date: 'Aug 2026',
      },
      {
        id: 'b2-3',
        author: 'Sam D.',
        rating: 4,
        title: 'Solid daily drivers',
        body: 'Spatial audio is a fun bonus. Call quality is good indoors, a bit windy outside.',
        date: 'Jul 2026',
      },
    ],
  },
  'volt-w3': {
    breakdown: [72, 18, 6, 2, 2],
    items: [
      {
        id: 'w3-1',
        author: 'Chris L.',
        rating: 5,
        title: 'Two weeks per charge, for real',
        body: 'GPS tracking is accurate on trail runs and the AMOLED is bright even in direct sun.',
        date: 'Oct 2026',
      },
      {
        id: 'w3-2',
        author: 'Nina P.',
        rating: 4,
        title: 'No subscription is huge',
        body: 'Sleep and HRV insights are on par with watches twice the price. App could be a bit faster.',
        date: 'Sep 2026',
      },
      {
        id: 'w3-3',
        author: 'Omar F.',
        rating: 5,
        title: 'Replaced my fitness band',
        body: 'Light enough to sleep in and the titanium finish looks premium. Notifications are reliable.',
        date: 'Aug 2026',
      },
    ],
  },
}
