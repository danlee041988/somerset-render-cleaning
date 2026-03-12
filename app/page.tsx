import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import BeforeAfter from "@/components/BeforeAfter";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import EnquiryForm from "@/components/EnquiryForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <BeforeAfter />
        <Process />
        <WhyUs />
        <EnquiryForm />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
