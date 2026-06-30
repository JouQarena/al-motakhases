export default function Logo({ className = '', showText = true }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`} aria-label="المتخصص">
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
      >
        <rect x="8" y="10" width="48" height="4" rx="2" fill="#2C2416" />
        <path d="M14 14C14 14 15.5 19 18 22C20.5 25 22 28 22 32C22 36 20.5 39 18 42C15.5 45 14 50 14 50" stroke="#B89A6A" strokeWidth="3" strokeLinecap="round" />
        <path d="M22 14C22 14 23.5 19 26 22C28.5 25 30 28 30 32C30 36 28.5 39 26 42C23.5 45 22 50 22 50" stroke="#D4B896" strokeWidth="3" strokeLinecap="round" />
        <path d="M30 14C30 14 31.5 19 34 22C36.5 25 38 28 38 32C38 36 36.5 39 34 42C31.5 45 30 50 30 50" stroke="#B89A6A" strokeWidth="3" strokeLinecap="round" />
        <path d="M22 36C22 33.7909 23.7909 32 26 32H44C46.2091 32 48 33.7909 48 36V42C48 44.2091 46.2091 46 44 46H26C23.7909 46 22 44.2091 22 42V36Z" fill="#F5F0E8" stroke="#2C2416" strokeWidth="2" />
        <path d="M24 45V50" stroke="#2C2416" strokeWidth="2" strokeLinecap="round" />
        <path d="M46 45V50" stroke="#2C2416" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 40H48" stroke="#B89A6A" strokeWidth="2" />
        <path d="M22 36L18 39V46" stroke="#2C2416" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className="text-[1.45rem] font-bold tracking-[0.02em]"
            style={{ color: '#2C2416', fontFamily: 'var(--font-tajawal)' }}
          >
            المتخصص
          </span>
          <span
            className="mt-1 text-[0.7rem] font-light"
            style={{ color: '#B89A6A', fontFamily: 'var(--font-cairo)' }}
          >
            ستائر · ركنات · كنب
          </span>
        </div>
      )}
    </div>
  );
}
