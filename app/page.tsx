import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import BeforeAfter from "@/components/BeforeAfter";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import WhyUs from "@/components/WhyUs";
import GoogleReviews from "@/components/GoogleReviews";
import EnquiryForm from "@/components/EnquiryForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <BeforeAfter />
        <Process />
        <Pricing />
        <WhyUs />
        <GoogleReviews />
        <EnquiryForm />
        <FAQ />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
