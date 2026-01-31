export default function CallToAction() {
  return (
    <section className="cta">
      <div className="container cta__box">
        <h2 className="cta__title">Ready to Hit the Road?</h2>
        <p className="cta__desc">Book your ride today in just a few clicks.</p>

        <div className="cta__actions">
          <button className="btn btn--light">Search Available Cars</button>
          <button className="btn btn--ghost-light">Contact Sales</button>
        </div>
      </div>
    </section>
  );
}
