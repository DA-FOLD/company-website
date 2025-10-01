import './App.css';

function App() {
  return (
    <div className="App">
      <header className="section hero-section">
        <h1>DA FOLD</h1>
        <p className="tagline">Unlocking Potential. Engineering Efficiency.</p>
        <button className="cta-button">Discover Our Solutions</button>
      </header>

      <main>
        <section id="mission" className="section">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="section-title">Clarity from Complexity.</h2>
              <p>
                DA FOLD creates systems that unlock the untapped potential of small-medium enterprises. We dive deep into complex operational challenges and emerge with elegant, efficient solutions that drive growth and empower teams.
              </p>
            </div>
            <div className="mission-visual">
              {/* This div is a placeholder for the unfolding animation visual */}
              <p style={{ opacity: 0.5 }}>[Visual Metaphor: Unfolding Complexity]</p>
              <img src={"assets/logo.jpg"} alt={"logo"}/>
            </div>
          </div>
        </section>

        <section id="solutions" className="section">
          <h2 className="section-title">Our Solutions</h2>
          <div className="solutions-grid">
            <div className="solution-card">
              <h3>Process Automation</h3>
              <p>We identify bottlenecks and build automated workflows that save time, reduce errors, and free your team to focus on what matters most.</p>
            </div>
            <div className="solution-card">
              <h3>Custom Software</h3>
              <p>From internal tools to customer-facing applications, we develop bespoke software that is perfectly tailored to your unique business needs.</p>
            </div>
            <div className="solution-card">
              <h3>Data Optimization</h3>
              <p>We transform raw data into actionable insights, creating clear dashboards and reporting systems that enable smarter decision-making.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <h2 className="section-title">Let's Build Together</h2>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message" rows={5}></textarea>
            <button type="submit" className="cta-button">Transform Your Business</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;