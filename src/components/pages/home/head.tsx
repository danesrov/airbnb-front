import Heading from "@/components/headings/heading";
import MainImg from '@/assets/head.jpg'

export default function HomeHead () {
  return (
    <div className="border-l-4 border-l-primary-1 container wrapper flex justify-between">
      <Heading heading="PLANEA TU PROXIMO VIAJE" headingType="h1" className="max-w-96" />

      <div className="relative w-1/2 rounded-r-md overflow-hidden
        after:content-[''] after:absolute after:inset-0
        after:bg-gradient-to-r after:from-bg-dark after:to-primary-1/20">
        <img src={MainImg} alt="main image" className="absolute inset-0 size-full object-cover" />
      </div>
    </div>
  )
}