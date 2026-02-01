export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <div className="hero__text">
          <p className="badge">Premium Car Rental</p>
          <h1 className="hero__title">Rent Your Perfect Car Easily</h1>
          <p className="hero__desc">
            Find the best cars for your journey. Fast, safe and comfortable
            rentals for every trip.
          </p>

          <div className="hero__cta">
            <button className="btn btn--primary">Rent Now</button>
            <button className="btn btn--ghost">Learn More</button>
          </div>
        </div>

        <div className="hero__imageWrap">
          <img
            className="hero__image"
            alt="Car"
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=60"
          />
        </div>
      </div>
    </section>
  );
}
