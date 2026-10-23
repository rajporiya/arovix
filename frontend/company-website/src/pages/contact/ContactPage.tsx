import { useState } from 'react'
import type { FormEvent } from 'react'
import { ApiRequestError, submitContact } from '../../lib/api'
import { PageShell } from '../../components/shared/PageShell'
import { Toast, type ToastData } from '../../components/shared/Toast'
import emailImage from '../../assets/email.png'
import './contact.css'

type FormValues = {
  name: string
  email: string
  subject: string
  message: string
}

type Notice = {
  tone: 'success' | 'info' | 'error'
  title: string
  body: string
}

type ToastNotice = ToastData & Notice

const initialValues: FormValues = { name: '', email: '', subject: '', message: '' }

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || 'there'
}

export function ContactPage() {
  const [values, setValues] = useState(initialValues)
  const [notice, setNotice] = useState<ToastNotice | null>(null)
  const [sending, setSending] = useState(false)

  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setNotice(null)
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSending(true)
    setNotice(null)
    try {
      const result = await submitContact(values)
      const adminSent = result.email?.admin === 'sent'
      const confirmationSent = result.email?.confirmation === 'sent'
      setValues(initialValues)
      setNotice(adminSent
        ? {
            tone: 'success',
            title: 'Message sent',
            body: confirmationSent
              ? `Thanks, ${firstName(values.name)}. Your inquiry reached our team — a confirmation is on its way to ${values.email}.`
              : `Thanks, ${firstName(values.name)}. Your inquiry reached our team and we'll reply within one business day.`,
          }
        : {
            tone: 'info',
            title: 'Inquiry saved for our team',
            body: 'Your message is safely stored, but the automatic email notification could not be sent. We can still see your inquiry and will reply to the address you provided.',
          })
    } catch (error) {
      setNotice(error instanceof ApiRequestError && error.status === undefined
        ? { tone: 'error', title: 'Could not reach the server', body: 'Please check your connection and try again in a moment.' }
        : { tone: 'error', title: 'Inquiry not sent', body: 'Something went wrong while saving your message. Please try again in a moment.' })
    } finally {
      setSending(false)
    }
  }

  return <PageShell title={<>Let&apos;s make<br /><i>something real.</i></>} image={emailImage} className="contact-page" intro="Tell us what you're working on. We’ll get back to you with a thoughtful next step.">
    <form className="form contact-form" onSubmit={submit}>
      <label className={values.name ? 'field-filled' : ''}>Name<input name="name" autoComplete="name" value={values.name} onChange={(event) => updateValue('name', event.target.value)} required minLength={2} /></label>
      <label className={values.email ? 'field-filled' : ''}>Email<input name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => updateValue('email', event.target.value)} required /></label>
      <label className={values.subject ? 'field-filled' : ''}>Subject<input name="subject" autoComplete="off" value={values.subject} onChange={(event) => updateValue('subject', event.target.value)} required /></label>
      <label className={values.message ? 'field-filled' : ''}>Message<textarea name="message" value={values.message} onChange={(event) => updateValue('message', event.target.value)} minLength={10} required rows={5} /></label>
      <button className={`contact-submit ${sending ? 'is-sending' : ''}`} type="submit" disabled={sending}><span>{sending ? 'Sending…' : 'Send inquiry'}</span><b aria-hidden="true">{sending ? '···' : '→'}</b></button>
    </form>
    {notice && <Toast toast={notice} onClose={() => setNotice(null)} />}
  </PageShell>
}
