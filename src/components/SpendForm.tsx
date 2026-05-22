'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Plus, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ALL_TOOLS, TOOL_PLANS, USE_CASES } from '@/lib/pricing-data'
import type { ToolEntry, UseCase } from '@/types'

const STORAGE_KEY = 'spendlens_form_data'

const defaultTool = (): ToolEntry => ({
  tool: 'cursor',
  plan: 'pro',
  monthlySpend: 0,
  seats: 1,
})

export default function SpendForm() {
  const router = useRouter()
  const [tools, setTools] = useState<ToolEntry[]>([defaultTool()])
  const [teamSize, setTeamSize] = useState(1)
  const [useCase, setUseCase] = useState<UseCase>('coding')
  const [loading, setLoading] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.tools) setTools(parsed.tools)
        if (parsed.teamSize) setTeamSize(parsed.teamSize)
        if (parsed.useCase) setUseCase(parsed.useCase)
      } catch {}
    }
  }, [])

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ tools, teamSize, useCase }))
  }, [tools, teamSize, useCase])

  function addTool() {
    setTools(prev => [...prev, defaultTool()])
  }

  function removeTool(index: number) {
    setTools(prev => prev.filter((_, i) => i !== index))
  }

  function updateTool(index: number, field: keyof ToolEntry, value: string | number) {
    setTools(prev => prev.map((t, i) => {
      if (i !== index) return t
      if (field === 'tool') {
        const plans = TOOL_PLANS[value as string]
        return { ...t, tool: value as ToolEntry['tool'], plan: plans[0] as ToolEntry['plan'] }
      }
      return { ...t, [field]: value }
    }))
  }

  async function handleSubmit() {
    // Validate
    if (tools.length === 0) {
      toast.error('Add at least one AI tool')
      return
    }
    for (const tool of tools) {
      if (tool.monthlySpend < 0) {
        toast.error('Monthly spend cannot be negative')
        return
      }
      if (tool.seats < 1) {
        toast.error('Seats must be at least 1')
        return
      }
    }

    setLoading(true)
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tools, teamSize, useCase }),
      })

      if (!response.ok) throw new Error('Audit failed')

      const data = await response.json()
      router.push(`/audit/${data.shareId}`)
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Team info */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">About your team</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="teamSize">Team size</Label>
            <Input
              id="teamSize"
              type="number"
              min={1}
              value={teamSize}
              onChange={e => setTeamSize(parseInt(e.target.value) || 1)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="useCase">Primary use case</Label>
            <select
              id="useCase"
              value={useCase}
              onChange={e => setUseCase(e.target.value as UseCase)}
              className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              {USE_CASES.map(uc => (
                <option key={uc.value} value={uc.value}>{uc.label}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Tools */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Your AI tools</h2>
        <div className="space-y-4">
          {tools.map((tool, index) => (
            <div key={index} className="grid grid-cols-12 gap-3 items-end p-4 bg-slate-50 rounded-lg">
              {/* Tool name */}
              <div className="col-span-3">
                <Label>Tool</Label>
                <select
                  value={tool.tool}
                  onChange={e => updateTool(index, 'tool', e.target.value)}
                  className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  {ALL_TOOLS.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Plan */}
              <div className="col-span-3">
                <Label>Plan</Label>
                <select
                  value={tool.plan}
                  onChange={e => updateTool(index, 'plan', e.target.value)}
                  className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  {TOOL_PLANS[tool.tool]?.map(plan => (
                    <option key={plan} value={plan}>
                      {plan.charAt(0).toUpperCase() + plan.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Monthly spend */}
              <div className="col-span-3">
                <Label>Monthly spend ($)</Label>
                <Input
                  type="number"
                  min={0}
                  value={tool.monthlySpend}
                  onChange={e => updateTool(index, 'monthlySpend', parseFloat(e.target.value) || 0)}
                  className="mt-1"
                  placeholder="0"
                />
              </div>

              {/* Seats */}
              <div className="col-span-2">
                <Label>Seats</Label>
                <Input
                  type="number"
                  min={1}
                  value={tool.seats}
                  onChange={e => updateTool(index, 'seats', parseInt(e.target.value) || 1)}
                  className="mt-1"
                  placeholder="1"
                />
              </div>

              {/* Remove */}
              <div className="col-span-1 flex justify-end">
                {tools.length > 1 && (
                  <button
                    onClick={() => removeTool(index)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addTool}
          className="mt-4 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          <Plus size={16} />
          Add another tool
        </button>
      </Card>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-6 text-lg font-semibold bg-slate-900 hover:bg-slate-700"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin mr-2" />
            Running your audit...
          </>
        ) : (
          'Run My Free Audit →'
        )}
      </Button>

      <p className="text-center text-sm text-slate-500">
        No login required. Results are instant.
      </p>
    </div>
  )
}