// App shell

function App() {
  useReveal();
  useScrollProgress();

  return (
    <>
      <Nav />
      <Hero />
      <Disclaimer />
      <MarqueeBar />
      <ExecSummary />
      <Pullquote />
      <Strategy />
      <BeforeAfterSection />
      <PropertySlab />
      <PropertySummary />
      <Gallery />
      <MarketSection />
      <LocationSection />
      <CompsSection />
      <FinancialsSection />
      <ReturnsSection />
      <RisksSection />
      <Cta />
      <Footer />
      <TweaksPanel />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
