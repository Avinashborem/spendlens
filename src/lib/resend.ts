import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendAuditConfirmation({
  email,
  companyName,
  totalMonthlySavings,
  shareUrl,
}: {
  email: string
  companyName?: string
  totalMonthlySavings: number
  shareUrl: string
}) {
  const isHighSavings = totalMonthlySavings > 500

  try {
    await resend.emails.send({
      from: 'SpendLens <noreply@spendlens.dev>',
      to: email,
      subject: `Your AI Spend Audit — $${totalMonthlySavings.toFixed(0)}/mo in potential savings`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0f172a;">Your SpendLens Audit is Ready</h1>
          <p>Hi${companyName ? ` from ${companyName}` : ''},</p>
          <p>Your AI tool spend audit found <strong>$${totalMonthlySavings.toFixed(0)}/month</strong> in potential savings — that's <strong>$${(totalMonthlySavings * 12).toFixed(0)}/year</strong>.</p>
          <p>
            <a href="${shareUrl}" style="background: #0f172a; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">
              View Your Full Report
            </a>
          </p>
          ${isHighSavings ? `
          <div style="background: #f0fdf4; border: 1px solid #86efac; padding: 16px; border-radius: 8px; margin-top: 24px;">
            <h3 style="color: #166534; margin: 0 0 8px;">You qualify for a Credex consultation</h3>
            <p style="color: #166534; margin: 0;">With $${totalMonthlySavings.toFixed(0)}/mo in potential savings, you may be able to get verified AI credits at a discount through Credex. A member of our team will reach out shortly.</p>
          </div>
          ` : ''}
          <p style="color: #64748b; font-size: 14px; margin-top: 32px;">SpendLens is a free tool by Credex — the marketplace for discounted AI infrastructure credits.</p>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Email send failed:', error)
    return { success: false, error }
  }
}