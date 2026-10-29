'use client'

import { useState } from 'react'
import { PRODUCTS } from '@/lib/products'
import { SiteHeader, type View } from './site-header'
import { LandingView } from './landing-view'
import { ProductView } from './product-view'
import { CheckoutView } from './checkout-view'

export function Storefront() {
  const [view, setView] = useState<View>('home')
  const [productId, setProductId] = useState(PRODUCTS[0].id)
  const [colorIndex, setColorIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const product = PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0]

  function openProduct(id: string) {
    setProductId(id)
    setColorIndex(0)
    setQuantity(1)
    setView('product')
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <SiteHeader view={view} onNavigate={setView} cartCount={view === 'checkout' ? quantity : 0} />
      <main className="relative min-h-0 flex-1 overflow-y-auto md:overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        />
        <div key={view} className="relative mx-auto flex h-full max-w-7xl animate-in fade-in px-4 py-4 duration-300 md:px-8 md:py-6">
          {view === 'home' && (
            <LandingView featured={PRODUCTS[0]} products={PRODUCTS} onOpenProduct={openProduct} />
          )}
          {view === 'product' && (
            <ProductView
              product={product}
              colorIndex={colorIndex}
              quantity={quantity}
              onColorChange={setColorIndex}
              onQuantityChange={setQuantity}
              onSwitchProduct={openProduct}
              onBuyNow={() => setView('checkout')}
            />
          )}
          {view === 'checkout' && (
            <CheckoutView
              product={product}
              colorName={product.colors[colorIndex]?.name ?? product.colors[0].name}
              quantity={quantity}
              onBack={() => setView('product')}
              onDone={() => {
                setQuantity(1)
                setView('home')
              }}
            />
          )}
        </div>
      </main>
      <footer className="hidden h-10 shrink-0 items-center justify-between border-t px-8 font-mono text-[11px] uppercase tracking-wider text-muted-foreground md:flex">
        <span>Free shipping over $50</span>
        <span>2-year warranty</span>
        <span>30-day returns</span>
        <span>{'© 2026 VOLT Labs'}</span>
      </footer>
    </div>
  )
}
