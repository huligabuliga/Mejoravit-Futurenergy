import {
  Header,
  HeroSection,
  VideoSection,
  EligibilitySection,
  TestimonialsSection,
  FormSection,
  Footer,
} from './components';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <VideoSection />
        <EligibilitySection />
        <TestimonialsSection />
        <FormSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
