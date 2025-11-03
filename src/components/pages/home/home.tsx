import Separator from "@/components/utilities/separator";
import HomeHead from "./head";
import HomeFeed from "./feed";

export default function Home () {
  return (
    <>
      <section aria-label="Heading Section">
        <HomeHead/>
        <Separator/>
      </section>
      <HomeFeed/>
    </>
  )
}