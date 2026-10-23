import { env } from '../../config/env.js'

export type EmailDetail = { label: string; value: string; href?: string }
export type EmailStep = { title: string; body: string }

export type EmailTemplate = {
  subject: string
  preheader: string
  eyebrow: string
  badge: string
  title: string
  intro: string
  details?: EmailDetail[]
  message?: { label: string; body: string }
  steps?: EmailStep[]
  cta?: { label: string; href: string }
  note?: string
  footerNote: string
}

export type RenderedEmail = { subject: string; text: string; html: string }

const INK = '#0f172a'
const MUTED = '#5b6478'
const SOFT = '#8b93a7'
const BORDER = '#e7eaf3'
const SURFACE = '#f8f9fd'
const BRAND = '#4f46e5'
const BRAND_LIGHT = '#eef0ff'
const HEADER = '#12172b'

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeMultiline(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, '<br>')
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replace(/`/g, '&#96;')
}

function cleanSubject(value: string): string {
  return value.replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim().slice(0, 180)
}

function renderDetails(details: EmailDetail[]): string {
  const rows = details
    .map((detail, index) => {
      const value = detail.href
        ? `<a href="${escapeAttribute(detail.href)}" style="color:${BRAND};text-decoration:none;font-weight:600">${escapeHtml(detail.value)}</a>`
        : escapeHtml(detail.value)
      const divider = index === details.length - 1 ? '' : `border-bottom:1px solid ${BORDER};`
      return `<tr><td style="padding:11px 0;${divider}">
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;line-height:1.4;letter-spacing:1.4px;text-transform:uppercase;color:${SOFT};padding-bottom:4px">${escapeHtml(detail.label)}</div>
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:${INK};word-break:break-word">${value}</div>
      </td></tr>`
    })
    .join('')
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${rows}</table>`
}

function renderSteps(steps: EmailStep[]): string {
  return steps
    .map(
      (step, index) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        <tr>
          <td width="34" valign="top" style="padding:0 0 14px">
            <div style="width:24px;height:24px;border-radius:50%;background:${BRAND_LIGHT};color:${BRAND};font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;line-height:24px;text-align:center">${index + 1}</div>
          </td>
          <td valign="top" style="padding:0 0 14px">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;line-height:1.5;color:${INK}">${escapeHtml(step.title)}</div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.65;color:${MUTED};padding-top:2px">${escapeHtml(step.body)}</div>
          </td>
        </tr>
      </table>`,
    )
    .join('')
}

function renderText(template: EmailTemplate): string {
  const blocks: string[] = [template.title, '', template.intro]
  if (template.details?.length) {
    blocks.push('', ...template.details.map((detail) => `${detail.label}: ${detail.value}`))
  }
  if (template.message) blocks.push('', `${template.message.label}:`, template.message.body)
  if (template.steps?.length) {
    blocks.push('', ...template.steps.map((step, index) => `${index + 1}. ${step.title} — ${step.body}`))
  }
  if (template.cta) blocks.push('', `${template.cta.label}: ${template.cta.href}`)
  if (template.note) blocks.push('', template.note)
  blocks.push('', '—', template.footerNote, env.FRONTEND_URL)
  return blocks.join('\n')
}

export function renderEmail(template: EmailTemplate): RenderedEmail {
  const siteUrl = escapeAttribute(env.FRONTEND_URL)
  const details = template.details?.length
    ? `<tr><td class="px" style="padding:6px 32px 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;background:${SURFACE};border:1px solid ${BORDER};border-radius:12px">
          <tr><td style="padding:16px 20px">${renderDetails(template.details)}</td></tr>
        </table>
      </td></tr>`
    : ''

  const message = template.message
    ? `<tr><td class="px" style="padding:22px 32px 0">
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:${SOFT};padding-bottom:8px">${escapeHtml(template.message.label)}</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:${SURFACE};border-radius:0 10px 10px 0">
          <tr>
            <td width="4" style="background:${BRAND};font-size:0;line-height:0">&nbsp;</td>
            <td style="padding:16px 18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#374151;word-break:break-word">${escapeMultiline(template.message.body)}</td>
          </tr>
        </table>
      </td></tr>`
    : ''

  const steps = template.steps?.length
    ? `<tr><td class="px" style="padding:24px 32px 0">${renderSteps(template.steps)}</td></tr>`
    : ''

  const cta = template.cta
    ? `<tr><td class="px" style="padding:26px 32px 4px">
        <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate">
          <tr>
            <td align="center" bgcolor="${BRAND}" style="border-radius:999px;padding:14px 28px">
              <a href="${escapeAttribute(template.cta.href)}" style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;line-height:1;color:#ffffff;text-decoration:none;letter-spacing:.2px">${escapeHtml(template.cta.label)} &rarr;</a>
            </td>
          </tr>
        </table>
      </td></tr>`
    : ''

  const note = template.note
    ? `<tr><td class="px" style="padding:18px 32px 4px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.7;color:${MUTED}">${escapeHtml(template.note)}</td></tr>`
    : ''

  const html = `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(cleanSubject(template.subject))}</title>
<!--[if mso]>
<style>body,table,td,a{font-family:Arial,Helvetica,sans-serif !important}</style>
<![endif]-->
<style>
@media only screen and (max-width:620px){
  .wrap{padding:18px 10px !important}
  .px{padding-left:22px !important;padding-right:22px !important}
  .h1{font-size:24px !important;line-height:1.25 !important}
  .card{border-radius:16px !important}
}
</style>
</head>
<body style="margin:0;padding:0;background:#eef1f8;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%">
<div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all">${escapeHtml(template.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#eef1f8">
  <tr>
    <td class="wrap" align="center" style="padding:32px 16px">
      <table role="presentation" class="card" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;width:100%;max-width:600px;background:#ffffff;border:1px solid ${BORDER};border-radius:20px;overflow:hidden">
        <tr>
          <td style="background:${HEADER};padding:26px 32px 10px" class="px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
              <tr>
                <td align="left" valign="middle">
                  <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
                    <tr>
                      <td width="34" height="34" align="center" valign="middle" bgcolor="#635bff" style="width:34px;height:34px;border-radius:9px;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;line-height:34px;color:#ffffff">A</td>
                      <td style="padding-left:10px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;letter-spacing:2.4px;color:#ffffff">AROVIX</td>
                    </tr>
                  </table>
                </td>
                <td align="right" valign="middle">
                  <span style="display:inline-block;padding:6px 10px;border-radius:999px;background:#242c47;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;color:#b9c0d4">${escapeHtml(template.badge)}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:${HEADER};padding:14px 32px 30px" class="px">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:#8d84ff;padding-bottom:10px">${escapeHtml(template.eyebrow)}</div>
            <h1 class="h1" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:28px;font-weight:700;line-height:1.28;letter-spacing:-.6px;color:#ffffff">${escapeHtml(template.title)}</h1>
          </td>
        </tr>
        <tr>
          <td height="4" style="height:4px;background:#635bff;background-image:linear-gradient(90deg,#635bff 0%,#8b7cff 55%,#77c99b 100%);font-size:0;line-height:0">&nbsp;</td>
        </tr>
        <tr>
          <td class="px" style="padding:30px 32px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.75;color:#4b5568">${escapeHtml(template.intro)}</td>
        </tr>
        ${details}
        ${message}
        ${steps}
        ${cta}
        ${note}
        <tr><td height="30" style="height:30px;font-size:0;line-height:0">&nbsp;</td></tr>
        <tr>
          <td style="padding:22px 32px;background:${SURFACE};border-top:1px solid ${BORDER};font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;color:${SOFT}" class="px">
            <span style="color:#3f4759;font-weight:700">Arovix</span> · Digital products, thoughtfully built.<br>
            ${escapeHtml(template.footerNote)}<br>
            <a href="${siteUrl}" style="color:${BRAND};text-decoration:none;font-weight:600">${escapeHtml(env.FRONTEND_URL.replace(/^https?:\/\//, ''))}</a>
          </td>
        </tr>
      </table>
      <div style="max-width:600px;margin:16px auto 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.6;color:#98a0b3;text-align:center">Sent with care from the Arovix studio.</div>
    </td>
  </tr>
</table>
</body>
</html>`

  return { subject: cleanSubject(template.subject), text: renderText(template), html }
}
