import { Mail, Clock, MessageSquare, Settings, TrendingUp, Link as LinkIcon, Building } from "lucide-react";
import { useEffect } from "react";
import logoIsometric from "@/assets/logo.jpg";
import "../styles/main.css";

const Index = () => {
    useEffect(() => {
        const handleScroll = () => {
            const nav = document.querySelector('.nav');
            if (window.scrollY > 50) {
                nav?.classList.add('scrolled');
            } else {
                nav?.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            {/* Navigation */}
            <nav className="nav">
                <a href="#hero" className="nav-logo">DA FØLD</a>
                <ul className="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#why-choose">Why Choose Us</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                </ul>
            </nav>

            {/* Hero Section */}
            <section id="hero" className="hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Unify your operations.<br />
                            Unleash your<br />
                            potential.
                        </h1>
                        <p className="hero-subtitle">
                            Simplify the path to enterprise excellence.
                        </p>
                        <a href="#contact" className="hero-button">Lets Talk</a>
                    </div>
                    <div className="hero-card">
                        <div className="hero-card-inner">
                            <img src={logoIsometric} alt="DA FØLD Logo" className="hero-logo" />
                            <h2 className="hero-card-title">DA FØLD</h2>
                            <p className="hero-card-subtitle">SOFTWARE ENGINEERING</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about">
                <div className="about-content">
                    <h2 className="about-title">Who We Are</h2>
                    <div className="about-description">
                        DA FØLD is the enterprise platform for seamless operational integration. We provide a
                        unified digital core that standardizes processes, consolidates data, and drives
                        measurable gains in productivity for global organizations.
                    </div>
                    <a href="#contact" className="about-button">Talk with us</a>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section id="why-choose" className="why-choose">
                <div className="why-choose-content">
                    <h2 className="why-choose-title">Why Choose Us</h2>
                    <p className="why-choose-description">
                        We aim to transform complexity into clear, actionable efficiency. We empower enterprises to overcome system
                        sprawl, data fragmentation, and operational bottlenecks, allowing teams to focus on innovation and growth.
                    </p>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Settings />
                            </div>
                            <h3 className="feature-title">Process automation</h3>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <TrendingUp />
                            </div>
                            <h3 className="feature-title">Optimized performance</h3>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <LinkIcon />
                            </div>
                            <h3 className="feature-title">Seamless integration</h3>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Building />
                            </div>
                            <h3 className="feature-title">Enterprise grade</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact">
                <div className="contact-content">
                    <div className="contact-header">
                        <h2 className="contact-title">
                            Ready to Transform<br />
                            <span className="contact-title-highlight">Your Operations?</span>
                        </h2>
                        <p className="contact-subtitle">
                            Let's discuss how we can create a custom software solution that transforms your<br />
                            workflows and saves you time.
                        </p>
                    </div>
                    <div className="contact-main">
                        <div className="contact-info">
                            <div className="info-card">
                                <div className="info-card-icon">
                                    <Mail />
                                </div>
                                <h3 className="info-card-title">Get in Touch</h3>
                                <p className="info-card-description">
                                    Send us a message and we'll respond quickly
                                </p>
                            </div>
                            <div className="info-card">
                                <div className="info-card-icon">
                                    <Clock />
                                </div>
                                <h3 className="info-card-title">Quick Response</h3>
                                <p className="info-card-description">
                                    We typically respond within 24 hours
                                </p>
                            </div>
                            <div className="info-card">
                                <div className="info-card-icon">
                                    <MessageSquare />
                                </div>
                                <h3 className="info-card-title">Free Consultation</h3>
                                <p className="info-card-description">
                                    Initial project discussion is always free
                                </p>
                            </div>
                        </div>
                        <div className="contact-form-wrapper">
                            <h3 className="form-title">Start Your Project</h3>
                            <p className="form-subtitle">
                                Tell us about your process challenges and we'll help you find the perfect solution.
                            </p>
                            <form>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Your Name</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            placeholder="John Smith"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-input"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Project Type</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g., Workflow automation, Custom database, Mobile app"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Tell Us About Your Needs</label>
                                    <textarea
                                        className="form-textarea"
                                        placeholder="Describe your current process challenges and what you'd like to achieve..."
                                    ></textarea>
                                </div>
                                <button type="submit" className="form-submit">
                                    Send Message →
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Index;
