export const metadata = { title: "About — Cape Breton Realty" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-cbr-600">About us</p>
      <h1 className="mt-2 font-serif text-4xl text-cbr-950">
        Family-run, locally hosted, built for the way Cape Breton actually buys property.
      </h1>

      <div className="mt-8 text-cbr-800 leading-relaxed space-y-6">
        <p>
          Cape Breton Realty specializes in real estate across Cape Breton Island and
          northeastern Nova Scotia. For years, we've helped families find homes,
          cottages, farms, vacant land, and commercial properties. Our agents live in
          the communities they serve. Our office is in Port Hawkesbury. And our
          website is hosted right here in Nova Scotia.
        </p>
        <p>
          We're rebuilding our online presence to match our core belief: that the
          clearest real estate website is the one where buyers and sellers see
          properties the way they actually exist — with real parcel boundaries, real
          assessment data, and real sales history. Everything is stitched together by
          Property ID and rendered on a map that works equally well for a 50-acre
          parcel near Inverness and a downtown Sydney townhouse.
        </p>
        <p>
          We're also committed to being easy to work with. When you send an inquiry,
          it reaches the right agent. We track responses. If you don't hear back
          within a reasonable time, we know about it. That's how a local brokerage
          should operate.
        </p>
      </div>
    </div>
  );
}
