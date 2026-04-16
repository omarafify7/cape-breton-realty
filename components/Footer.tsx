import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-cbr-200 bg-dark-600 text-dark-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-cbr-500 text-white grid place-items-center font-serif text-lg">
              CB
            </div>
            <div>
              <div className="font-serif text-lg text-white">Cape Breton Realty</div>
              <div className="text-xs uppercase tracking-widest text-cbr-300">
                Nova Scotia
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-dark-300 max-w-md">
            Family-owned brokerage specializing in Cape Breton Island and northeastern Nova
            Scotia real estate. Province-wide listings, local expertise, dedicated service.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Browse</h4>
          <ul className="mt-3 space-y-2 text-sm text-dark-300">
            <li><Link href="/map" className="hover:text-cbr-400">Map search</Link></li>
            <li><Link href="/listings" className="hover:text-cbr-400">All listings</Link></li>
            <li><Link href="/agents" className="hover:text-cbr-400">Our agents</Link></li>
            <li><Link href="/about" className="hover:text-cbr-400">About us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-dark-300">
            <li>admin@capebretonrealty.ca</li>
            <li>Port Hawkesbury, NS</li>
            <li>(902) 555-0143</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-dark-700 text-xs text-dark-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            Listing data courtesy of the Nova Scotia Association of REALTORS®. Parcel
            data &copy; GeoNova. Assessment values &copy; PVSC.
          </div>
          <div>&copy; {new Date().getFullYear()} Cape Breton Realty Ltd.</div>
        </div>
      </div>
    </footer>
  );
}
