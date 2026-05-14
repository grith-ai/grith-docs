import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/shared/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="font-label text-sm uppercase tracking-[0.12em] text-text-dim">404</p>
          <h1 className="mt-2 font-heading text-4xl font-extrabold text-text">Page not found</h1>
          <p className="mt-4 text-text-secondary">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button href="/">Back to docs</Button>
            <Button href="/docs/start/quickstart" variant="secondary">
              Quickstart
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
