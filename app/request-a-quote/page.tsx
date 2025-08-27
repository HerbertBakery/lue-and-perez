import QuoteForm from '../../components/QuoteForm';

export const metadata = { title: 'Request a Quote' };

export default function Page() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>Request a Quote</h1>
      <p style={{ color: '#555', marginBottom: 16 }}>
        Tell us what you need and where it’s going. We’ll reply with pricing, lead time, and compliance notes.
      </p>
      <QuoteForm />
    </main>
  );
}
