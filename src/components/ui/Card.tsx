import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'li'
}

export default function Card({ children, className = '', as: Tag = 'div' }: CardProps) {
  return <Tag className={`card ${className}`}>{children}</Tag>
}
