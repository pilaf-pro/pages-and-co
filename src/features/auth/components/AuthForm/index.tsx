import { type JSX } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import styles from './index.module.css';

export interface FieldConfig {
  /** Must match the key in the Zod schema */
  name: string;
  label: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
}

interface AuthFormProps {
  title: string;
  subtitle: string;
  fields: FieldConfig[];
  submitLabel: string;
  footerText: string;
  footerLinkLabel: string;
  schema: z.ZodType<Record<string, string>>;
  onSuccess: () => void;
  onSwitchMode: () => void;
}

export default function AuthForm({
  title,
  subtitle,
  fields,
  submitLabel,
  footerText,
  footerLinkLabel,
  schema,
  onSuccess,
  onSwitchMode,
}: AuthFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Record<string, string>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any) as Resolver<Record<string, string>>,
    mode: 'onSubmit',
  });

  const onSubmit = (data: unknown) => {
    console.log('AuthForm submit:', data);
    onSuccess();
  };

  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <div key={field.name} className={styles.formGroup}>
            <label className={styles.label} htmlFor={field.name}>
              {field.label}
            </label>
            <input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.name)}
              className={`${styles.input} ${errors[field.name] ? styles.inputError : ''}`}
            />
            {errors[field.name] && (
              <p className={styles.errorText}>
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        ))}

        <button type="submit" className={styles.submitBtn}>
          {submitLabel}
        </button>
      </form>

      <p className={styles.footerText}>
        {footerText}{' '}
        <button type="button" className={styles.linkBtn} onClick={onSwitchMode}>
          {footerLinkLabel}
        </button>
      </p>
    </>
  );
}
