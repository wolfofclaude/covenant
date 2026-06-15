export interface Service {
  icon: React.ReactNode
  title: string
  description: string
  href?: string
}

export interface Step {
  number: string
  title: string
  body: string
}

export interface Plan {
  name: string
  price: string
  note: string
  popular: boolean
  features: string[]
}

export interface Addon {
  name: string
  price: string
}

export interface Testimonial {
  quote: string
  name: string
  detail: string
}

export interface NavLink {
  label: string
  href: string
}

export interface FooterLinkGroup {
  [group: string]: Array<{ label: string; href: string }>
}

export interface FAQ {
  question: string
  answer: string
}
