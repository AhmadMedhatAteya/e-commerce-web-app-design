import Image from 'next/image'
import { Minus, Plus, ShieldCheck, Star, Truck, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PRODUCTS, formatPrice, type Product } from '@/lib/products'

interface ProductViewProps {
  product: Product
  colorIndex: number
  quantity: number
  onColorChange: (index: number) => void
  onQuantityChange: (qty: number) => void
  onSwitchProduct: (id: string) => void
  onBuyNow: () => void
}

const MAX_QTY = 5

export function ProductView({
  product,
  colorIndex,
  quantity,
  onColorChange,
  onQuantityChange,
  onSwitchProduct,
  onBuyNow,
}: ProductViewProps) {
  const discount = Math.round((1 - product.priceInCents / product.compareAtInCents) * 100)

  return (
    <section className="grid w-full items-center gap-6 md:grid-cols-[1.1fr_1fr] md:gap-10" aria-labelledby="product-title">
      <div className="flex h-full min-h-0 flex-col gap-3">
        <div className="relative min-h-64 flex-1 overflow-hidden rounded-3xl border bg-card">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={`${product.name} in ${product.colors[colorIndex].name}`}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-primary px-2.5 py-1 font-mono text-xs font-semibold text-primary-foreground">
            -{discount}%
          </span>
        </div>
        <div className="flex shrink-0 gap-3" role="group" aria-label="Other products">
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSwitchProduct(p.id)}
              aria-pressed={p.id === product.id}
              aria-label={p.name}
              className={cn(
                'relative size-16 overflow-hidden rounded-xl border-2 transition-colors',
                p.id === product.id ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100',
              )}
            >
              <Image src={p.image || '/placeholder.svg'} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">{product.tagline}</p>
          <h1 id="product-title" className="text-4xl font-semibold tracking-tight md:text-5xl">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn('size-3.5', i < Math.round(product.rating) ? 'fill-primary text-primary' : 'text-muted-foreground')}
                />
              ))}
            </span>
            <span>
              {product.rating} ({product.reviews.toLocaleString()} reviews)
            </span>
          </div>
        </div>

        <p className="text-pretty leading-relaxed text-muted-foreground">{product.description}</p>

        <dl className="grid grid-cols-4 overflow-hidden rounded-xl border">
          {product.specs.map((spec, i) => (
            <div key={spec.label} className={cn('flex flex-col-reverse gap-0.5 p-3', i > 0 && 'border-l')}>
              <dt className="text-[11px] text-muted-foreground">{spec.label}</dt>
              <dd className="font-mono text-sm font-medium">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-end gap-8">
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-xs text-muted-foreground">
              Color: <span className="text-foreground">{product.colors[colorIndex].name}</span>
            </legend>
            <div className="flex gap-2">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => onColorChange(i)}
                  aria-label={c.name}
                  aria-pressed={i === colorIndex}
                  className={cn(
                    'size-8 rounded-full border-2 ring-offset-2 ring-offset-background transition',
                    i === colorIndex ? 'border-transparent ring-2 ring-primary' : 'border-border',
                  )}
                  style={{ backgroundColor: c.swatch }}
                />
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-2">
            <span id="qty-label" className="text-xs text-muted-foreground">
              Quantity
            </span>
            <div className="flex h-9 items-center rounded-full border" role="group" aria-labelledby="qty-label">
              <button
                type="button"
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
                aria-label="Decrease quantity"
              >
                <Minus className="size-3.5" aria-hidden="true" />
              </button>
              <span className="w-6 text-center font-mono text-sm tabular-nums" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => onQuantityChange(Math.min(MAX_QTY, quantity + 1))}
                disabled={quantity >= MAX_QTY}
                className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
                aria-label="Increase quantity"
              >
                <Plus className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t pt-5">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-3xl font-semibold">{formatPrice(product.priceInCents * quantity)}</span>
            <span className="font-mono text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAtInCents * quantity)}
            </span>
          </div>
          <Button size="lg" className="h-12 w-full text-base" onClick={onBuyNow}>
            <Zap className="size-4" aria-hidden="true" />
            Buy Now
          </Button>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <Truck className="size-3.5" aria-hidden="true" /> Free 2-day shipping
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5" aria-hidden="true" /> 2-year warranty
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
