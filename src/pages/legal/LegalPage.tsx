import './legal.css'

interface LegalSection {
  heading: string
  paragraphs: string[]
}

const privacySections: LegalSection[] = [
  {
    heading: 'Overview',
    paragraphs: [
      'This privacy policy explains how Arovix collects, uses, and protects information when you use this website or contact us through it.',
      'By using the website, you agree to the practices described here. If you do not agree, please do not submit information through the site.',
    ],
  },
  {
    heading: 'Information we collect',
    paragraphs: [
      'When you submit the contact form, we collect the name, email address, subject, and message you provide. If you subscribe to our newsletter, we collect the email address you enter.',
      'We may also receive basic technical information such as browser type, device type, and pages visited through standard server logs. This information is used to keep the site secure and understand how it is used.',
    ],
  },
  {
    heading: 'How we use information',
    paragraphs: [
      'We use your information to respond to inquiries, send updates you have requested, operate and protect the website, and improve the clarity of our content and services.',
      'We do not sell personal information. We may share it with service providers that help us host the site, deliver email, or operate the contact system, and only to the extent needed for those services.',
    ],
  },
  {
    heading: 'Retention',
    paragraphs: [
      'We keep inquiry details for as long as needed to respond and maintain a record of the conversation, unless a longer period is required by law. Newsletter subscriptions are kept until you unsubscribe or ask us to remove your address.',
    ],
  },
  {
    heading: 'Cookies',
    paragraphs: [
      'The website uses only the cookies required for it to function, including authentication cookies for the protected admin area. We do not use advertising cookies.',
    ],
  },
  {
    heading: 'Your choices',
    paragraphs: [
      'You may ask us to access, correct, or delete the personal information you have shared with us. You can also unsubscribe from newsletter messages at any time.',
      'To make a request, use the contact form and describe what you would like us to do.',
    ],
  },
  {
    heading: 'Security and changes',
    paragraphs: [
      'We take reasonable technical and organisational measures to protect information, but no method of transmission or storage is completely secure.',
      'We may update this policy as the website or our services change. The latest version will always be published on this page.',
    ],
  },
]

const termsSections: LegalSection[] = [
  {
    heading: 'Acceptance',
    paragraphs: [
      'These terms govern your use of the Arovix website. By accessing or using the site, you agree to these terms. If you do not agree, please do not use the site.',
    ],
  },
  {
    heading: 'Website content',
    paragraphs: [
      'The content on this website is provided for general information about Arovix and our services. It may change without notice and should not be treated as a binding offer, quotation, or professional recommendation.',
      'Submitting a contact form or requesting a proposal does not create a client relationship. Any engagement will be governed by a separate written agreement.',
    ],
  },
  {
    heading: 'Intellectual property',
    paragraphs: [
      'The website design, text, graphics, and other content are owned by Arovix or used with permission. You may view and share links to the site, but you may not copy, modify, or redistribute content for commercial purposes without written permission.',
    ],
  },
  {
    heading: 'Acceptable use',
    paragraphs: [
      'You agree not to use the site in a way that is unlawful, interferes with its operation, attempts to gain unauthorised access, or harms other users. We may restrict access where we reasonably believe these rules have been broken.',
    ],
  },
  {
    heading: 'Third-party links',
    paragraphs: [
      'The site may link to third-party websites or services. We do not control those destinations and are not responsible for their content, availability, or privacy practices.',
    ],
  },
  {
    heading: 'Disclaimers and liability',
    paragraphs: [
      'The website is provided on an “as is” and “as available” basis. To the extent permitted by law, Arovix is not liable for indirect or consequential loss arising from your use of the site.',
      'Nothing in these terms excludes liability that cannot lawfully be excluded.',
    ],
  },
  {
    heading: 'Governing law and changes',
    paragraphs: [
      'These terms are governed by the laws applicable in the jurisdiction where Arovix is registered. Any dispute will be handled by the courts with jurisdiction over that location.',
      'We may update these terms from time to time. The version published on this page applies from the date shown below.',
    ],
  },
]

export function LegalPage({ kind, navigate }: { kind: 'privacy' | 'terms'; navigate: (path: string) => void }) {
  const isPrivacy = kind === 'privacy'
  const sections = isPrivacy ? privacySections : termsSections

  return (
    <div className="legal-page">
      <header className="legal-hero">
        <div className="legal-shell">
          <p className="legal-eyebrow"><span /> Arovix / Legal</p>
          <h1>{isPrivacy ? <>Privacy<br /><em>policy.</em></> : <>Terms and<br /><em>conditions.</em></>}</h1>
          <p>{isPrivacy ? 'How we handle the information you share with us.' : 'The ground rules for using this website.'}</p>
          <small>Last updated: November 2026</small>
        </div>
      </header>
      <div className="legal-body">
        <div className="legal-shell legal-layout">
          <div className="legal-content">
            {sections.map((section, index) => (
              <section key={section.heading}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>
          <aside className="legal-aside">
            <p>Questions about this page?</p>
            <strong>We are happy to clarify.</strong>
            <button type="button" onClick={() => navigate('/contact')}>Contact us <span aria-hidden="true">↗</span></button>
          </aside>
        </div>
      </div>
    </div>
  )
}
