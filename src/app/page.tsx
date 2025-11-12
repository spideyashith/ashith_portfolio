import Navbar from '../../components/Navbar';
import IntroLoader from '../../components/IntroLoader';
import Hero from '../../components/Hero';
import About3D from '../../components/About3D';
import Projects3D from '../../components/Projects3D';
import Contact3D from '../../components/Contact3D';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';

export default function Home() {
  return (
    <>
      <IntroLoader />
      <SmoothScroll>
        <main className="min-h-screen bg-black">
          <Navbar />
          <Hero />
          <About3D />
          <Projects3D />
          <Contact3D />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
