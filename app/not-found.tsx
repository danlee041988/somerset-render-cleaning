import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-brand-charcoal">Page not found</h1>
      <p className="mt-4 text-brand-slate">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-brand-green px-6 py-3 font-semibold text-white hover:bg-brand-green-dark"
      >
        Back to Home
      </Link>
    </div>
  );
}
