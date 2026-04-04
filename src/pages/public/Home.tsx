import { CTA } from "../../sections/home/CTA";
import { Features } from "../../sections/home/Features";
import { Hero } from "../../sections/home/Hero";
import { HowItWorks } from "../../sections/home/HowItWorks";
import { SocialProof } from "../../sections/home/SocialProof";
import { Testimonials } from "../../sections/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  )
}
