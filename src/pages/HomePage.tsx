import Features from '@/components/Home/Features';
import FoundationSection from '@/components/Home/BuiltOn';
import GetStarted from '@/components/Home/GetStarted';
import Home from '@/components/Home/Home';

const HomePage = () => {

  return (
  <div>
    <section id="home">
    <Home />
    </section>
     <section id="features">
      <Features />
    </section>
    <section id="foundation">
      <FoundationSection />
    </section>
    <section id="get-started">
      <GetStarted />
    </section>
  </div>
  );
};

export default HomePage;