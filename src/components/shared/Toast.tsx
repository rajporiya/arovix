import { useEffect } from 'react'
import './Toast.css'

export interface ToastData {
  tone: 'success' | 'info' | 'error'
  title?: string
  body: string
}

const TOAST_DURATION_MS = 2000

export function Toast({ toast, onClose }: { toast: ToastData; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, TOAST_DURATION_MS)
    return () => clearTimeout(timer)
  }, [toast, onClose])

  return (
    <div className={`adv-toast adv-toast-${toast.tone}`} role="status" aria-live="polite">
      <div className="adv-toast-text">
        {toast.title && <b>{toast.title}</b>}
        <span>{toast.body}</span>
      </div>
      <button className="adv-toast-close" type="button" onClick={onClose} aria-label="Dismiss">✕</button>
    </div>
  )
}
