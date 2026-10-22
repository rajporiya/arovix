import { useState } from 'react'
import type { FormEvent } from 'react'
import { submitContact } from '../../lib/api'
import { PageShell } from '../../components/shared/PageShell'
import './contact.css'

type FormValues = {
  name: string
  email: string
  subject: string
  message: string
}

const initialValues: FormValues = { name: '', email: '', subject: '', message: '' }

export function ContactPage() {
  const [values, setValues] = useState(initialValues)
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setStatus('')
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSending(true)
    setStatus('')
    try {
      await submitContact(values)
      setValues(initialValues)
      setStatus('Thanks — your message was submitted successfully.')
    } catch {
      setStatus('We could not send that right now. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return <PageShell title={<>Let&apos;s make<br /><i>something real.</i></>} intro="Tell us what you're working on. We’ll get back to you with a thoughtful next step.">
    <form className="form contact-form" onSubmit={submit}>
      <label className={values.name ? 'field-filled' : ''}>Name<input name="name" value={values.name} onChange={(event) => updateValue('name', event.target.value)} required minLength={2} /></label>
      <label className={values.email ? 'field-filled' : ''}>Email<input name="email" type="email" value={values.email} onChange={(event) => updateValue('email', event.target.value)} required /></label>
      <label className={values.subject ? 'field-filled' : ''}>Subject<input name="subject" value={values.subject} onChange={(event) => updateValue('subject', event.target.value)} required /></label>
      <label className={values.message ? 'field-filled' : ''}>Message<textarea name="message" value={values.message} onChange={(event) => updateValue('message', event.target.value)} minLength={10} required rows={5} /></label>
      <button className={`contact-submit ${sending ? 'is-sending' : ''}`} type="submit" disabled={sending}><span>{sending ? 'Sending…' : 'Send inquiry'}</span><b aria-hidden="true">{sending ? '···' : '→'}</b></button>
      <p className={status.includes('successfully') ? 'form-success' : 'form-error'} role="status">{status}</p>
    </form>
  </PageShell>
}
