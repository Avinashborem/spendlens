import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendAuditConfirmation } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, companyName, role, teamSize, auditId, totalMonthlySavings, shareId } = body

    if (!email || !auditId) {
      return NextResponse.json({ error: 'Email and auditId required' }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Save lead
    const { error } = await supabaseAdmin
      .from('leads')
      .insert({
        audit_id: auditId,
        email,
        company_name: companyName || null,
        role: role || null,
        team_size: teamSize || null,
      })

    if (error) {
      console.error('Lead save error:', error)
    }

    // Send confirmation email
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://spendlens.vercel.app'
    await sendAuditConfirmation({
      email,
      companyName,
      totalMonthlySavings,
      shareUrl: `${appUrl}/audit/${shareId}`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}