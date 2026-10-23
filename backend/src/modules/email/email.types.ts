export type ContactEmailData = {
  name: string
  email: string
  subject: string
  message: string
  submittedAt: string
  reference?: string
}

export type SubscriberEmailData = {
  email: string
  subscribedAt: string
}

export type CareerEmailData = {
  applicantName: string
  applicantEmail: string
  jobTitle: string
  applicationId: string
  submittedAt: string
  reference?: string
}

export class EmailProviderError extends Error {
  constructor(message: string, readonly providerCode?: string, readonly responseCode?: number) {
    super(message)
    this.name = 'EmailProviderError'
  }
}
