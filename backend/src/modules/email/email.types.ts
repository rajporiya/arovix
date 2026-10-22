export type ContactEmailData = {
  name: string
  email: string
  subject: string
  message: string
  submittedAt: string
}

export type CareerEmailData = {
  applicantName: string
  applicantEmail: string
  jobTitle: string
  applicationId: string
  submittedAt: string
}

export class EmailProviderError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EmailProviderError'
  }
}
