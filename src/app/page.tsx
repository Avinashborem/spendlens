import SpendForm from '@/components/SpendForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            <span className="font-semibold text-slate-900">SpendLens</span>
          </div>
          <span className="text-sm text-slate-500">Free AI Spend Audit</span>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Free — no login required
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Is your team overspending on AI tools?
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Enter your current AI subscriptions and get an instant audit — where you&apos;re overspending, what to switch, and exactly how much you&apos;d save.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
          <span>✓ Cursor</span>
          <span>✓ Claude</span>
          <span>✓ ChatGPT</span>
          <span>✓ GitHub Copilot</span>
          <span>✓ Gemini</span>
          <span>✓ More</span>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <SpendForm />
      </section>
    </main>
  )
}