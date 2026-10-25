import { Nav, Hero, AboutSection, EventSection } from "./PublicSiteSections/IntroSections";
import { GiftsSection } from "./PublicSiteSections/GiftsSection";
import { RSVPSection } from "./PublicSiteSections/RSVPSection";
import {
  MessagesSection,
  GallerySection,
  ShareSection,
  Footer,
  FloatingCTA,
} from "./PublicSiteSections/CommunitySections";

export default function PublicSite() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Nav />
      <main>
        <Hero />
        <AboutSection />
        <EventSection />
        <GiftsSection />
        <RSVPSection />
        <MessagesSection />
        <GallerySection />
        <ShareSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
