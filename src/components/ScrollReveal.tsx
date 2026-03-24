import { useEffect, useRef, useState, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

const ScrollReveal = ({ children, delay = 0, direction = 'up' }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [delay])

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)'
    switch (direction) {
      case 'up': return 'translate3d(0, 40px, 0)'
      case 'left': return 'translate3d(-40px, 0, 0)'
      case 'right': return 'translate3d(40px, 0, 0)'
      case 'none': return 'translate3d(0, 0, 0)'
    }
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
