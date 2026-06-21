import { type JSX, useState, useEffect } from 'react';
import AuthForm, { type FieldConfig } from '../AuthForm';
import { LoginSchema } from '../../utils/loginSchema';
import { RegisterSchema } from '../../utils/registerSchema';
import styles from './index.module.css';

/* ── Form configs ── */
const LOGIN_FIELDS: FieldConfig[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
  },
];

const REGISTER_FIELDS: FieldConfig[] = [
  {
    name: 'fullName',
    label: 'Full name',
    type: 'text',
    placeholder: 'Jane Doe',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm password',
    type: 'password',
    placeholder: '••••••••',
  },
];

const FORM_CONFIG = {
  login: {
    title: 'Welcome back',
    subtitle: 'Sign in to access your bag, orders and wishlist.',
    fields: LOGIN_FIELDS,
    schema: LoginSchema,
    submitLabel: 'Sign in',
    footerText: 'New here?',
    footerLinkLabel: 'Create an account',
  },
  register: {
    title: 'Create an account',
    subtitle: 'Join Pages & Co. and start your reading journey.',
    fields: REGISTER_FIELDS,
    schema: RegisterSchema,
    submitLabel: 'Create account',
    footerText: 'Already have an account?',
    footerLinkLabel: 'Sign in',
  },
} as const;

/* ── Modal ── */
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
}

export default function AuthModal({
  isOpen,
  onClose,
  initialView = 'login',
}: AuthModalProps): JSX.Element | null {
  const [view, setView] = useState<'login' | 'register'>(initialView);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const config = FORM_CONFIG[view];
  const toggleView = () =>
    setView((v) => (v === 'login' ? 'register' : 'login'));

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className={styles.logo}>P</div>

        <AuthForm {...config} onSuccess={onClose} onSwitchMode={toggleView} />
      </div>
    </div>
  );
}
