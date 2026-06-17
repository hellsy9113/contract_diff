export default async function Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          Compare Contracts in Seconds
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Upload two versions of a contract and instantly identify
          additions, deletions, and modifications.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
            Upload Documents
          </button>

          <button className="px-6 py-3 border rounded-lg hover:bg-gray-100">
            View Demo
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-center">
          Why Use Contract Diff?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-lg">
              Upload Contracts
            </h3>
            <p className="mt-2 text-gray-600">
              Upload original and revised contract versions securely.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-lg">
              AI-Powered Comparison
            </h3>
            <p className="mt-2 text-gray-600">
              Detect additions, removals, and modified clauses instantly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-lg">
              Export Reports
            </h3>
            <p className="mt-2 text-gray-600">
              Download a professional summary of all contract changes.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 border-t">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12 text-center">
            <div>
              <div className="text-4xl font-bold">1</div>
              <p className="mt-3">Upload original contract</p>
            </div>

            <div>
              <div className="text-4xl font-bold">2</div>
              <p className="mt-3">Upload revised contract</p>
            </div>

            <div>
              <div className="text-4xl font-bold">3</div>
              <p className="mt-3">Review highlighted changes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-gray-500">
        Contract Diff © 2026
      </footer>
    </main>
  );
}