export const metadata = { title: "Our agents — Cape Breton Realty" };

const AGENTS = [
  {
    name: "Sherry MacLeod",
    role: "Broker / Owner",
    area: "Port Hawkesbury & Strait area",
    bio: "Twenty-plus years guiding buyers and sellers across Cape Breton."
  },
  {
    name: "Beth Cameron",
    role: "Managing Broker",
    area: "Cape Breton Regional Municipality",
    bio: "Specializes in residential transactions in Sydney and surrounding communities."
  },
  {
    name: "Dawn Coady",
    role: "REALTOR®",
    area: "Margaree, Inverness, Cabot Trail",
    bio: "Born and raised on the Cabot Trail; expert on rural and waterfront listings."
  },
  {
    name: "Glenna MacInnis",
    role: "REALTOR®",
    area: "Baddeck & Bras d'Or Lake",
    bio: "Helps families find lakefront homes and seasonal cottages."
  },
  {
    name: "Sandra Boudreau",
    role: "REALTOR®",
    area: "Cheticamp & Northwest Coast",
    bio: "Bilingual agent serving Acadian communities along the Cabot Trail."
  },
  {
    name: "Don MacKinnon",
    role: "REALTOR®",
    area: "Louisbourg & Cape Breton east coast",
    bio: "Heritage homes, small-town living, and oceanfront acreage."
  }
];

export default function AgentsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-cbr-600">Our team</p>
      <h1 className="mt-2 font-serif text-4xl text-cbr-950">
        Local agents in every corner of Cape Breton.
      </h1>
      <p className="mt-3 text-cbr-700 max-w-2xl">
        When you create an account or send an inquiry, we connect you with an agent
        who lives and works in the area you're searching — not the agent who paid the
        most to be at the top of the page.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {AGENTS.map((a) => (
          <div
            key={a.name}
            className="rounded-lg border border-cbr-100 bg-white p-6"
          >
            <div className="h-16 w-16 rounded-full bg-cbr-200 grid place-items-center font-serif text-2xl text-cbr-900">
              {a.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="mt-4 font-serif text-xl text-cbr-950">{a.name}</div>
            <div className="text-xs uppercase tracking-wider text-cbr-600">
              {a.role}
            </div>
            <div className="mt-2 text-sm font-medium text-cbr-800">{a.area}</div>
            <p className="mt-2 text-sm text-cbr-700">{a.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
