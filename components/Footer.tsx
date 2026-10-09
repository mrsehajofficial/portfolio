/**
 * Footer — the quietest element on the page. The contact section already
 * ended the conversation; this just closes the document.
 */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>
          © {new Date().getFullYear()} Sehaj Varma — server-rendered, zero
          external calls, no tracking.
        </span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
