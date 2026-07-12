import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
}

const base =
  "inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-brand-accent)] text-[var(--color-brand-dark)] border border-[var(--color-brand-accent)] hover:bg-transparent hover:text-[var(--color-brand-accent)] focus-visible:outline-[var(--color-brand-accent)]",
  secondary:
    "bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)] border border-[var(--color-brand-dark)] hover:bg-transparent hover:text-[var(--color-brand-dark)] focus-visible:outline-[var(--color-brand-dark)]",
  ghost:
    "bg-transparent text-[var(--color-brand-dark)] underline underline-offset-4 hover:text-[var(--color-brand-accent)]",
};

const sizes: Record<Size, string> = {
  sm: "text-xs px-4 py-2 rounded",
  md: "text-sm px-6 py-3 rounded",
  lg: "text-sm px-8 py-4 rounded",
};

export function Button({ variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  external,
  className = "",
  children,
  ...props
}: LinkButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...props}>
      {children}
    </Link>
  );
}
