import Link from "next/link";

const NAV = [
  { href: "/map", label: "Map Search" },
  { href: "/listings", label: "Listings" },
  { href: "/agents", label: "Our Agents" },
  { href: "/about", label: "About" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-cbr-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-md bg-cbr-500 grid place-items-center text-white font-serif text-lg shadow-sm group-hover:bg-cbr-600 transition">
            CB
          </div>
          <div className="leading-tight">
            <div className="font-serif text-lg text-dark-600">Cape Breton Realty</div>
            <div className="text-[11px] uppercase tracking-widest text-cbr-600">
              Nova Scotia
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-dark-600 rounded-md hover:bg-cbr-50 hover:text-cbr-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden sm:inline-flex text-sm font-medium text-dark-600 px-3 py-2 rounded-md hover:bg-cbr-50"
          >
            Sign in
          </Link>
          <Link
            href="/login?mode=register"
            className="inline-flex text-sm font-medium text-white bg-cbr-500 hover:bg-cbr-600 px-3 py-2 rounded-md shadow-sm"
          >
            Create account
          </Link>
        </div>
      </div>
    </header>
  );
}
