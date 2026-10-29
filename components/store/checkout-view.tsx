'use client'

import Image from 'next/image'
import { useState, type FormEvent } from 'react'
import { ArrowLeft, Check, CreditCard, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatPrice, type Product } from '@/lib/products'

interface CheckoutViewProps {
  product: Product
  colorName: string
  quantity: number
  onBack: () => void
  onDone: () => void
}

type Fields = 'email' | 'name' | 'card' | 'expiry' | 'cvc' | 'zip'
type Errors = Partial<Record<Fields, string>>

function formatCard(value: string) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

function validate(values: Record<Fields, string>): Errors {
  const errors: Errors = {}
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email'
  if (values.name.trim().length < 2) errors.name = 'Enter the name on card'
  if (values.card.replace(/\s/g, '').length !== 16) errors.card = 'Card number must be 16 digits'
  const [mm, yy] = values.expiry.split('/').map(Number)
  if (!mm || !yy || mm < 1 || mm > 12) errors.expiry = 'Use MM/YY'
  if (!/^\d{3,4}$/.test(values.cvc)) errors.cvc = '3–4 digits'
  if (values.zip.trim().length < 3) errors.zip = 'Required'
  return errors
}

export function CheckoutView({ product, colorName, quantity, onBack, onDone }: CheckoutViewProps) {
  const [values, setValues] = useState<Record<Fields, string>>({
    email: '',
    name: '',
    card: '',
    expiry: '',
    cvc: '',
    zip: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'processing' | 'paid'>('idle')

  const subtotal = product.priceInCents * quantity
  const savings = (product.compareAtInCents - product.priceInCents) * quantity
  const tax = Math.round(subtotal * 0.08)
  const total = subtotal + tax

  function update(field: Fields, raw: string) {
    const value = field === 'card' ? formatCard(raw) : field === 'expiry' ? formatExpiry(raw) : field === 'cvc' ? raw.replace(/\D/g, '').slice(0, 4) : raw
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setStatus('processing')
    setTimeout(() => setStatus('paid'), 1400)
  }

  if (status === 'paid') {
    return (
      <section className="m-auto flex max-w-md flex-col items-center gap-5 text-center animate-in fade-in zoom-in-95" aria-live="polite">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-8" aria-hidden="true" />
        </span>
        <h1 className="text-3xl font-semibold tracking-tight">{"You're all set."}</h1>
        <p className="leading-relaxed text-muted-foreground">
          {quantity} × {product.name} ({colorName}) is on its way. A receipt for {formatPrice(total)} was sent to{' '}
          <span className="text-foreground">{values.email}</span>.
        </p>
        <Button size="lg" className="h-11 px-6" onClick={onDone}>
          Back to store
        </Button>
      </section>
    )
  }

  return (
    <section className="grid w-full items-center gap-6 md:grid-cols-[1.25fr_1fr] md:gap-10" aria-labelledby="checkout-title">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex size-9 items-center justify-center rounded-full border text-muted-foreground hover:text-foreground"
            aria-label="Back to product"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <h1 id="checkout-title" className="text-3xl font-semibold tracking-tight">
            Checkout
          </h1>
        </div>

        <Field label="Email" id="email" error={errors.email}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            className={inputClass(errors.email)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </Field>

        <fieldset className="flex flex-col gap-4 rounded-2xl border bg-card p-4">
          <legend className="flex items-center gap-2 px-1 text-sm font-medium">
            <CreditCard className="size-4 text-primary" aria-hidden="true" />
            Payment details
          </legend>
          <Field label="Name on card" id="name" error={errors.name}>
            <input
              id="name"
              autoComplete="cc-name"
              placeholder="Alex Rivera"
              value={values.name}
              onChange={(e) => update('name', e.target.value)}
              className={inputClass(errors.name)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
          </Field>
          <Field label="Card number" id="card" error={errors.card}>
            <input
              id="card"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="4242 4242 4242 4242"
              value={values.card}
              onChange={(e) => update('card', e.target.value)}
              className={cn(inputClass(errors.card), 'font-mono')}
              aria-invalid={!!errors.card}
              aria-describedby={errors.card ? 'card-error' : undefined}
            />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Expiry" id="expiry" error={errors.expiry}>
              <input
                id="expiry"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM/YY"
                value={values.expiry}
                onChange={(e) => update('expiry', e.target.value)}
                className={cn(inputClass(errors.expiry), 'font-mono')}
                aria-invalid={!!errors.expiry}
                aria-describedby={errors.expiry ? 'expiry-error' : undefined}
              />
            </Field>
            <Field label="CVC" id="cvc" error={errors.cvc}>
              <input
                id="cvc"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                value={values.cvc}
                onChange={(e) => update('cvc', e.target.value)}
                className={cn(inputClass(errors.cvc), 'font-mono')}
                aria-invalid={!!errors.cvc}
                aria-describedby={errors.cvc ? 'cvc-error' : undefined}
              />
            </Field>
            <Field label="ZIP" id="zip" error={errors.zip}>
              <input
                id="zip"
                autoComplete="postal-code"
                placeholder="94107"
                value={values.zip}
                onChange={(e) => update('zip', e.target.value)}
                className={cn(inputClass(errors.zip), 'font-mono')}
                aria-invalid={!!errors.zip}
                aria-describedby={errors.zip ? 'zip-error' : undefined}
              />
            </Field>
          </div>
        </fieldset>

        <Button type="submit" size="lg" className="h-12 text-base" disabled={status === 'processing'}>
          {status === 'processing' ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" aria-hidden="true" />
              Processing…
            </>
          ) : (
            <>
              <Lock className="size-4" aria-hidden="true" />
              Pay {formatPrice(total)}
            </>
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground">Demo checkout — no real payment is processed.</p>
      </form>

      <aside className="flex flex-col gap-4 rounded-3xl border bg-card p-5" aria-label="Order summary">
        <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Order summary</h2>
        <div className="flex items-center gap-4">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
            <Image src={product.image || '/placeholder.svg'} alt="" fill sizes="80px" className="object-cover" />
            <span className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-primary font-mono text-[10px] font-semibold text-primary-foreground">
              {quantity}
            </span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="font-medium">{product.name}</span>
            <span className="text-sm text-muted-foreground">
              {product.tagline} · {colorName}
            </span>
          </div>
          <span className="font-mono">{formatPrice(subtotal)}</span>
        </div>
        <dl className="flex flex-col gap-2 border-t pt-4 text-sm">
          <Row label="Subtotal" value={formatPrice(subtotal)} />
          <Row label="You save" value={`-${formatPrice(savings)}`} highlight />
          <Row label="Shipping" value="Free" />
          <Row label="Estimated tax" value={formatPrice(tax)} />
        </dl>
        <div className="flex items-baseline justify-between border-t pt-4">
          <span className="font-medium">Total</span>
          <span className="font-mono text-2xl font-semibold">{formatPrice(total)}</span>
        </div>
      </aside>
    </section>
  )
}

function inputClass(error?: string) {
  return cn(
    'h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring/40',
    error && 'border-destructive focus:border-destructive',
  )
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn('font-mono', highlight && 'text-primary')}>{value}</dd>
    </div>
  )
}
