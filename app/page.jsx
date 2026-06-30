import Link from 'next/link';
import HomeViewTracker from '@/components/HomeViewTracker';

const categories = [
  {
    title: 'ستائر',
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="12" width="44" height="4" rx="2" fill="currentColor" />
        <path d="M18 16C18 16 19.5 22 22 25C24.5 28 26 31 26 36C26 40 24.5 43 22 46C19.5 49 18 54 18 54" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M30 16C30 16 31.5 22 34 25C36.5 28 38 31 38 36C38 40 36.5 43 34 46C31.5 49 30 54 30 54" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M42 16C42 16 43.5 22 46 25C48.5 28 50 31 50 36C50 40 48.5 43 46 46C43.5 49 42 54 42 54" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'ركنات',
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 36C12 32.6863 14.6863 30 18 30H40C43.3137 30 46 32.6863 46 36V46H12V36Z" stroke="currentColor" strokeWidth="3" />
        <path d="M46 24H52C55.3137 24 58 26.6863 58 30V46H46V24Z" stroke="currentColor" strokeWidth="3" />
        <path d="M16 46V52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M54 46V52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'كنب',
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="30" width="40" height="14" rx="4" stroke="currentColor" strokeWidth="3" />
        <path d="M16 28C16 24.6863 18.6863 22 22 22H42C45.3137 22 48 24.6863 48 28V30H16V28Z" stroke="currentColor" strokeWidth="3" />
        <path d="M18 44V52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M46 44V52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <HomeViewTracker />

      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(44,36,22,0.38), rgba(44,36,22,0.38)), url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80')",
          }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl justify-start px-4 py-24 md:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <p className="mb-4 font-body text-sm tracking-[0.25em] text-white/80 md:text-base">
              ستائر · ركنات · كنب
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl md:leading-[1.25]">
              لمسة أناقة هادئة
              <br />
              تليق بكل ركن في بيتك
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/90 md:text-lg">
              في المتخصص نهتم بالتفاصيل التي تصنع الفارق، من اختيار الخامات إلى تنفيذ
              الستائر والركنات والكنب بشكل يبرز جمال المساحة ويمنحها راحة تدوم.
            </p>
            <Link
              href="/gallery"
              className="mt-8 inline-flex rounded-[4px] bg-accent px-7 py-3 text-base font-bold text-white hover:bg-accent-light hover:text-primary-text"
            >
              شوف أعمالنا
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary-background px-4 py-20 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-body text-sm tracking-[0.2em] text-accent">عن المتخصص</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-primary-text md:text-4xl">
              خبرة تهتم بالجمال العملي
            </h2>
            <p className="mt-6 text-base leading-8 text-primary-text/80 md:text-lg">
              نقدم أعمالاً مصممة لتناسب الذوق المصري الراقي، مع اهتمام واضح بتناسق الألوان
              وجودة التنفيذ والراحة اليومية. هدفنا أن يرى العميل النتيجة في صورة مساحة
              أكثر دفئاً وأناقة، لا مجرد قطعة أثاث أو ستارة فقط.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="font-body text-sm tracking-[0.2em] text-accent">أقسام الأعمال</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-primary-text md:text-4xl">
                اختر القسم المناسب لك
              </h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <article
                key={category.title}
                className="group rounded-[4px] border border-soft-divider bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-[4px] bg-primary-background text-accent">
                  {category.icon}
                </div>
                <h3 className="font-display text-2xl font-bold text-primary-text">{category.title}</h3>
                <p className="mt-4 text-sm leading-7 text-primary-text/75">
                  شاهد نماذج مختارة من أعمال {category.title} بتفاصيل تبرز الذوق والجودة.
                </p>
                <Link
                  href="/gallery"
                  className="mt-6 inline-flex text-sm font-bold text-accent hover:text-primary-text"
                >
                  اذهب إلى المعرض ←
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
