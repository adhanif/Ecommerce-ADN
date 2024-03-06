import React from 'react';
import HeroSection from '../components/heroSection/HeroSection';
import WhyChooseUs from '../components/heroSection/WhyChooseUs';
import FeaturedProducts from '../components/featuredProducts/FeaturedProducts';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <WhyChooseUs />
    </>
  );
}
