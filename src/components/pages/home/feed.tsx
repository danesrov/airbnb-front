import AnnouncementCard from "@/components/anuncios/card";
import Heading from "@/components/headings/heading";

export default function HomeFeed() {
  return (
    <section aria-label="Feed section" className="wrapper py-4">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="max-w-[30%]">
          <Heading heading="Recomendaciones" headingType="h2"/>
          <span className="text-gray-400 text-sm">Descubre tu siguiente experiencia</span>

          <div className="grid grid-cols-2 mt-2">
            <AnnouncementCard/>
            <AnnouncementCard/>
            <AnnouncementCard/>
            <AnnouncementCard/>

          </div>
        </div>
        <div></div>
      </div>
    </section>
  )
}