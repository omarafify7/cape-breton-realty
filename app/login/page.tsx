import Link from "next/link";

export const metadata = { title: "Sign in — Cape Breton Realty" };

export default function LoginPage({
  searchParams
}: {
  searchParams: { mode?: string };
}) {
  const isRegister = searchParams?.mode === "register";

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2000)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-cbr-950/80 via-cbr-900/40 to-transparent" />
        <div className="relative h-full flex flex-col justify-end p-10 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-cbr-200">
            For Nova Scotia, by Nova Scotia
          </p>
          <h2 className="mt-2 font-serif text-3xl max-w-md">
            Save listings, set up alerts, and keep your search organized.
          </h2>
          <p className="mt-3 text-cbr-100 max-w-md text-sm">
            An account lets you save searches, get notified when matching parcels come
            on the market, and request showings directly from your agent.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <h1 className="font-serif text-3xl text-cbr-950">
            {isRegister ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-cbr-700">
            {isRegister
              ? "Save properties and searches across Cape Breton & Nova Scotia."
              : "Sign in to your Cape Breton Realty account."}
          </p>

          <form className="mt-6 space-y-4">
            {isRegister && (
              <div>
                <label className="text-xs font-semibold text-cbr-800">Full name</label>
                <input
                  type="text"
                  placeholder="Jane MacDonald"
                  className="mt-1 w-full rounded-md border border-cbr-200 focus:border-cbr-500 focus:ring-1 focus:ring-cbr-500 px-3 py-2 text-sm"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-cbr-800">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full rounded-md border border-cbr-200 focus:border-cbr-500 focus:ring-1 focus:ring-cbr-500 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-cbr-800">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-md border border-cbr-200 focus:border-cbr-500 focus:ring-1 focus:ring-cbr-500 px-3 py-2 text-sm"
              />
            </div>
            <button
              type="button"
              className="w-full bg-cbr-700 hover:bg-cbr-800 text-white font-semibold py-2.5 rounded-md"
            >
              {isRegister ? "Create account" : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-cbr-700">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-cbr-900 underline">
                  Sign in
                </Link>
              </>
            ) : (
              <>
                New here?{" "}
                <Link
                  href="/login?mode=register"
                  className="font-semibold text-cbr-900 underline"
                >
                  Create an account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
