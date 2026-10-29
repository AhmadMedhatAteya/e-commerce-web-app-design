'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { REVIEWS } from '@/lib/reviews'
import type { Product } from '@/lib/products'

export function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            'size-3.5',
            i < Math.round(rating) ? 'fill-primary text-primary' : 'fill-muted text-muted',
            className,
          )}
        />
      ))}
    </span>
  )
}

export function ReviewsSection({ product }: { product: Product }) {
  const data = REVIEWS[product.id]
  const [index, setIndex] = useState(0)

  if (!data) return null

  const safeIndex = index % data.items.length
  const review = data.items[safeIndex]
  const step = (delta: number) => setIndex((safeIndex + delta + data.items.length) % data.items.length)

  return (
    <section
      aria-labelledby="reviews-title"
      className="grid shrink-0 gap-4 rounded-2xl border bg-card p-4 sm:grid-cols-[auto_1fr]"
    >
      <div className="flex gap-4 sm:border-r sm:pr-4">
        <div className="flex flex-col gap-1">
          <h2 id="reviews-title" className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            Customer reviews
          </h2>
          <span className="font-mono text-3xl font-semibold leading-none">{product.rating}</span>
          <StarRating rating={product.rating} />
          <span className="text-[11px] text-muted-foreground">{product.reviews.toLocaleString()} ratings</span>
        </div>
        <ul className="flex w-28 flex-col justify-center gap-1" aria-label="Rating breakdown">
          {data.breakdown.map((pct, i) => (
            <li key={i} className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
              <span className="w-2">{5 - i}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <span className="block h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
              </span>
              <span className="sr-only">{`${pct}% of reviews are ${5 - i} stars`}</span>
            </li>
          ))}
        </ul>
      </div>

      <figure className="flex min-w-0 flex-col gap-1.5" aria-live="polite">
        <div className="flex items-center justify-between gap-2">
          <StarRating rating={review.rating} className="size-3" />
          <div className="flex items-center gap-1">
            <span className="mr-1 font-mono text-[10px] text-muted-foreground">
              {safeIndex + 1}/{data.items.length}
            </span>
            <button
              type="button"
              onClick={() => step(-1)}
              className="flex size-6 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              aria-label="Previous review"
            >
              <ChevronLeft className="size-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="flex size-6 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              aria-label="Next review"
            >
              <ChevronRight className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <blockquote className="flex flex-col gap-0.5">
          <p className="text-sm font-medium">{review.title}</p>
          <p className="line-clamp-2 text-pretty text-xs leading-relaxed text-muted-foreground">{review.body}</p>
        </blockquote>
        <figcaption className="text-[11px] text-muted-foreground">
          <span className="text-foreground">{review.author}</span> · Verified buyer · {review.date}
        </figcaption>
      </figure>
    </section>
  )
}
