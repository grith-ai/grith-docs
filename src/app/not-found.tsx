import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/shared/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="font-label text-text-dim text-sm font-medium tracking-[0.1em] uppercase">
            404
          </p>
          <h1 className="font-heading text-text mt-2 text-4xl font-semibold tracking-[-0.02em]">
            Page not found
          </h1>
          <p className="text-text-secondary mt-4">
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
