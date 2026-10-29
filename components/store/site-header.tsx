import { ShoppingBag, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export type View = 'home' | 'product' | 'checkout'

const STEPS: { id: View; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'product', label: 'Product' },
  { id: 'checkout', label: 'Checkout' },
]

interface SiteHeaderProps {
  view: View
  onNavigate: (view: View) => void
  cartCount: number
}

export function SiteHeader({ view, onNavigate, cartCount }: SiteHeaderProps) {
  const activeIndex = STEPS.findIndex((s) => s.id === view)

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 md:px-8">
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 rounded-md font-semibold tracking-tight"
        aria-label="VOLT home"
      >
        <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Zap className="size-4" aria-hidden="true" />
        </span>
        <span className="text-lg">VOLT</span>
      </button>

      <nav aria-label="Store steps">
        <ol className="flex items-center gap-1 font-mono text-xs">
          {STEPS.map((step, i) => {
            const reachable = i <= activeIndex
            return (
              <li key={step.id} className="flex items-center gap-1">
                {i > 0 && <span aria-hidden="true" className="h-px w-3 bg-border md:w-6" />}
                <button
                  type="button"
                  disabled={!reachable}
                  onClick={() => onNavigate(step.id)}
                  aria-current={view === step.id ? 'step' : undefined}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-colors',
                    view === step.id
                      ? 'bg-secondary text-foreground'
                      : reachable
                        ? 'text-muted-foreground hover:text-foreground'
                        : 'text-muted-foreground/50',
                  )}
                >
                  <span className={cn('tabular-nums', view === step.id && 'text-primary')}>0{i + 1}</span>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="relative flex size-9 items-center justify-center rounded-full border" aria-label={`Cart, ${cartCount} items`} role="status">
        <ShoppingBag className="size-4" aria-hidden="true" />
        {cartCount > 0 && (
          <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary font-mono text-[10px] font-semibold text-primary-foreground">
            {cartCount}
          </span>
        )}
      </div>
    </header>
  )
}
