// Types backing the SEO structured data (see components/StructuredData.tsx).

export interface Plan {
  name: string
  price: string
  note: string
  popular: boolean
  features: string[]
}

export interface Testimonial {
  quote: string
  name: string
  detail: string
}

export interface FAQ {
  question: string
  answer: string
}
