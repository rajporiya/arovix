import { ContactForm } from '../../components/shared/ContactForm'
import { PageShell } from '../../components/shared/PageShell'
import emailImage from '../../assets/email-illustration.jpg'
import './contact.css'

export function ContactPage() {
  return <PageShell title={<>Let&apos;s make<br /><i>something real.</i></>} image={emailImage} className="contact-page" intro="Tell us what you're working on. We’ll get back to you with a thoughtful next step.">
    <ContactForm />
  </PageShell>
}
