import { Footer } from "@/components/global-comp/Footer";
import Navbar from "@/components/global-comp/navbar";
import ContactForm from "@/components/home-comp/Contact-form";
import { FeatureBriefs } from "@/components/home-comp/Feature-briefs";
import { FeatureDescription } from "@/components/home-comp/Feature-description";
import Hero from "@/components/home-comp/Hero";
import VisibilityDetector from "@/components/home-comp/visibility";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <Problem /> */}
      <FeatureBriefs />
      <FeatureDescription />
      <ContactForm />
      <Footer />
      {/* <VisibilityDetector /> */}
    </>
  );
}
