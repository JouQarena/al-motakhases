import Logo from './Logo';

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M27.24 4.76A15.04 15.04 0 0 0 16.55.32C7.9.32.86 7.36.86 16c0 2.75.72 5.44 2.08 7.8L.5 31.68l8.1-2.36a15.63 15.63 0 0 0 7.95 2.16h.01c8.65 0 15.69-7.04 15.69-15.69 0-4.19-1.63-8.13-4.6-11.03Zm-10.69 24.1h-.01a13.1 13.1 0 0 1-6.67-1.83l-.48-.29-4.8 1.4 1.41-4.67-.31-.48A13.08 13.08 0 0 1 3.46 16c0-7.21 5.87-13.08 13.09-13.08 3.49 0 6.77 1.36 9.23 3.82A12.96 12.96 0 0 1 29.6 16c0 7.21-5.86 13.08-13.05 13.08Zm7.17-9.79c-.39-.2-2.3-1.14-2.66-1.27-.35-.13-.61-.2-.86.2-.26.39-.99 1.27-1.22 1.53-.22.26-.45.29-.84.1-.39-.2-1.64-.6-3.12-1.92-1.15-1.02-1.92-2.28-2.14-2.67-.22-.39-.02-.6.17-.8.17-.17.39-.45.58-.68.19-.22.26-.39.39-.65.13-.26.07-.49-.03-.68-.1-.2-.86-2.08-1.18-2.85-.31-.74-.62-.64-.86-.65h-.74c-.26 0-.68.1-1.03.49-.36.39-1.35 1.32-1.35 3.21 0 1.88 1.38 3.71 1.57 3.97.2.26 2.7 4.12 6.54 5.78.91.39 1.62.62 2.17.79.91.29 1.74.25 2.4.15.73-.11 2.3-.94 2.62-1.84.33-.92.33-1.7.23-1.86-.09-.16-.35-.26-.74-.45Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.19 2.2Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.25-1.46 1.49-1.46H16.7V4.96c-.31-.04-1.37-.12-2.6-.12-2.57 0-4.33 1.57-4.33 4.45V11H7v3h2.77v8h3.73Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-soft-divider bg-[#efe7db]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 md:px-6 lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-md text-sm leading-7 text-primary-text/80">
            المتخصص يقدم أعمال راقية في الستائر والركنات والكنب بتفاصيل تجمع بين الذوق
            والراحة وجودة التنفيذ.
          </p>
        </div>

        <div className="space-y-3 text-sm text-primary-text md:justify-self-end md:text-left">
          <h3 className="font-display text-lg font-bold">تواصل معنا</h3>
          <a className="flex items-center gap-2 hover:text-accent" href="https://wa.me/201112849517" target="_blank" rel="noreferrer">
            <WhatsappIcon />
            <span>واتساب: 01112849517</span>
          </a>
          <a className="flex items-center gap-2 hover:text-accent" href="tel:01112849517">
            <PhoneIcon />
            <span>تليفون: 01112849517</span>
          </a>
          <a
            className="flex items-center gap-2 hover:text-accent"
            href="https://www.facebook.com/share/1CyT8kopiu/"
            target="_blank"
            rel="noreferrer"
          >
            <FacebookIcon />
            <span>فيسبوك</span>
          </a>
          <p className="pt-3 text-primary-text/70">© 2026 المتخصص. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
