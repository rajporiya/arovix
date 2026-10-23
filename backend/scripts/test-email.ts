/**
 * Verifies the SMTP configuration and sends a real test email.
 * Run from the backend folder: npm run email:test
 */
import { env } from '../src/config/env.js'
import {
  adminRecipient,
  confirmContact,
  emailConfigured,
  notifyContact,
  verifyEmailConnection,
} from '../src/modules/email/email.service.js'

async function main(): Promise<void> {
  if (!emailConfigured()) {
    console.error('\n✗ Email is not configured.')
    console.error('  Add SMTP_USER and SMTP_PASSWORD to backend/.env (for Gmail use an App Password, not your login password).')
    console.error('  Optional: ADMIN_NOTIFICATION_EMAIL — defaults to SMTP_USER when empty.\n')
    process.exitCode = 1
    return
  }

  const recipient = adminRecipient() ?? env.SMTP_USER
  console.log(`SMTP account : ${env.SMTP_USER}`)
  console.log(`Transport    : ${env.SMTP_HOST ? `${env.SMTP_HOST}:${env.SMTP_PORT ?? 587}` : env.SMTP_SERVICE}`)
  console.log(`Admin inbox  : ${recipient}`)
  console.log('Connecting...')

  await verifyEmailConnection()
  console.log('✓ SMTP connection and credentials are valid.')

  const submittedAt = new Date().toISOString()
  const sample = {
    name: 'Arovix Test',
    email: env.SMTP_USER as string,
    subject: 'SMTP test from Arovix',
    message: 'This is a test inquiry sent by npm run email:test. If you can read this, email delivery is working.',
    submittedAt,
    reference: 'SMTP-TEST',
  }

  await notifyContact(sample)
  console.log(`✓ Admin notification sent to ${recipient}`)

  await confirmContact(sample)
  console.log(`✓ Confirmation email sent to ${sample.email}`)

  console.log('\nCheck the inbox (and spam folder). Delivery is working.\n')
}

main().catch((error: unknown) => {
  const details = error as { message?: string; providerCode?: string; responseCode?: number }
  console.error(`\n✗ ${details.message ?? 'Email test failed'}`)
  if (details.providerCode) console.error(`  Provider code: ${details.providerCode}`)
  if (details.responseCode) console.error(`  Response code: ${details.responseCode}`)
  if (details.providerCode === 'EAUTH' || details.responseCode === 535) {
    console.error('  Gmail rejected the login. Create a fresh App Password at https://myaccount.google.com/apppasswords')
    console.error('  and paste it into SMTP_PASSWORD (16 characters, spaces are removed automatically).')
    console.error('  Make sure 2-Step Verification is enabled on the Google account.')
  }
  console.error('')
  process.exitCode = 1
})
