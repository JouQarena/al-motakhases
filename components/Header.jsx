'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from './Logo';

const navItems = [
  { href: '/', label: 'الرئيسية' },
  { href: '/gallery', label: 'معرض الأعمال' },
  { href: '/about', label: 'من نحن' },
  { href: '/contact', label: 'تواصل معنا' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (logoClicks >= 5) {
      setLogoClicks(0);
      router.push('/admin/login?secret=1');
    }

    if (!logoClicks) return;
    const timer = setTimeout(() => setLogoClicks(0), 2500);
    return () => clearTimeout(timer);
  }, [logoClicks, router]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-soft-divider bg-primary-background/95 shadow-sm backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <div className="order-1">
          <button
            type="button"
            onClick={() => setLogoClicks((value) => value + 1)}
            aria-label="الذهاب إلى الرئيسية"
            className="cursor-pointer"
          >
            <Link href="/">
              <Logo className="scale-90 md:scale-100" />
            </Link>
          </button>
        </div>

        <nav className="order-2">
          <ul className="flex flex-wrap items-center gap-3 text-sm md:gap-6 md:text-base">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-medium text-primary-text hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
