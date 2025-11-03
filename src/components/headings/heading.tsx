
type HeadingType = 'h1'|'h2'|'h3'
type HeadingComponentProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

const BASE = "font-bold tracking-tight text-white"
const SIZE_BY_TYPE: Record<HeadingType, string> = {
  h1: "text-4xl/7 sm:text-5xl ",
  h2: "text-2xl sm:text-3xl",
  h3: "text-xl sm:text-2xl",
}

const createHeadingFactory = (headingType: HeadingType) => {
  const Tag = headingType // 'h1' | 'h2' | 'h3'
  const size = SIZE_BY_TYPE[headingType]

  const HeadingImpl: React.FC<HeadingComponentProps> = ({ children, className = "", id }) => (
    <Tag id={id} className={`${BASE} ${size} ${className}`.trim()}>
      {children}
    </Tag>
  )

  HeadingImpl.displayName = `Heading(${headingType.toUpperCase()})`
  return HeadingImpl
}

/**
 * Compomente para los headings h1
 * ,h2,h3
 */
export default function Heading({
  headingType,
  heading,
  className,
  id,
}: {
  headingType: HeadingType
  heading: string
  className?: string
  id?: string
}) {
  const H = createHeadingFactory(headingType)
  return <H className={className} id={id}>{heading}</H>
}