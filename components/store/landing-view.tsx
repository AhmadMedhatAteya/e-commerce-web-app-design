import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatPrice, type Product } from '@/lib/products'

interface LandingViewProps {
  featured: Product
  products: Product[]
  onOpenProduct: (id: string) => void
}

const STATS = [
  { value: '120k+', label: 'Happy users' },
  { value: '4.8/5', label: 'Avg. rating' },
  { value: '-40%', label: 'vs. big brands' },
]

export function LandingView({ featured, products, onOpenProduct }: LandingViewProps) {
  return (
    <section className="flex w-full flex-col gap-6" aria-labelledby="hero-title">
      <div className="grid min-h-0 flex-1 items-center gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            New drop — VOLT H1 is live
          </span>
          <h1 id="hero-title" className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Welcome to <span className="text-primary">My Store</span>
          </h1>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            Audio and wearables engineered with pro-grade specs, sold direct so you skip the markup.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" className="h-11 px-5" onClick={() => onOpenProduct(featured.id)}>
              Shop {featured.name}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <span className="font-mono text-sm text-muted-foreground">
              from <span className="text-foreground">{formatPrice(featured.priceInCents)}</span>
            </span>
          </div>
          <dl className="flex gap-8 border-t pt-5">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-1">
                <dt className="text-xs text-muted-foreground">{s.label}</dt>
                <dd className="font-mono text-xl font-semibold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <button
          type="button"
          onClick={() => onOpenProduct(featured.id)}
          className="group relative mx-auto aspect-square h-full max-h-[min(52vh,440px)] w-auto max-w-full"
          aria-label={`View ${featured.name}`}
        >
          <div aria-hidden="true" className="absolute inset-[15%] rounded-full bg-primary/20 blur-3xl" />
          <Image
            src={featured.image || '/placeholder.svg'}
            alt={`${featured.name} ${featured.tagline}`}
            fill
            priority
            sizes="(min-width: 768px) 440px, 80vw"
            className="rounded-3xl object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full border bg-background/80 px-3 py-1.5 font-mono text-xs backdrop-blur">
            <Star className="size-3 fill-primary text-primary" aria-hidden="true" />
            {featured.rating} · {featured.reviews.toLocaleString()} reviews
          </span>
        </button>
      </div>

      <ul className="grid shrink-0 gap-3 sm:grid-cols-3" aria-label="Product lineup">
        {products.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onOpenProduct(p.id)}
              className="group flex w-full items-center gap-3 rounded-xl border bg-card p-2.5 text-left transition-colors hover:border-primary/50"
            >
              <span className="relative size-14 shrink-0 overflow-hidden rounded-lg">
                <Image src={p.image || '/placeholder.svg'} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-medium">{p.name}</span>
                <span className="truncate text-xs text-muted-foreground">{p.tagline}</span>
              </span>
              <span className="font-mono text-sm">{formatPrice(p.priceInCents)}</span>
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
