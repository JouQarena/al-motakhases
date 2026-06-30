const features = [
  {
    title: 'خامات مختارة بعناية',
    description: 'نختار الخامات التي تجمع بين المظهر الراقي والتحمل العملي لتناسب الاستخدام اليومي.',
  },
  {
    title: 'تنفيذ يهتم بالتفاصيل',
    description: 'كل مرحلة من القياس إلى التشطيب تتم بعناية للحفاظ على التناسق والجودة النهائية.',
  },
  {
    title: 'تصميم يناسب ذوقك',
    description: 'نساعدك في الوصول إلى الشكل الأنسب لمساحتك بما يوازن بين الجمال والراحة.',
  },
  {
    title: 'لمسة محلية راقية',
    description: 'نفهم الذوق المصري ونعكسه في حلول هادئة وأنيقة تناسب البيوت العصرية والكلاسيكية.',
  },
];

export const metadata = {
  title: 'من نحن | المتخصص',
  description: 'تعرف على المتخصص ورؤيتنا في تنفيذ الستائر والركنات والكنب.',
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-soft-divider bg-primary-background px-4 pb-10 pt-28 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-body text-sm tracking-[0.2em] text-accent">من نحن</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-primary-text md:text-5xl">
            شغف بالتفاصيل التي تصنع الراحة والأناقة
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-primary-text/80 md:text-lg">
            المتخصص هو اسم يهتم بتقديم حلول متكاملة في الستائر والركنات والكنب، مع تركيز واضح
            على الذوق الهادئ وجودة التنفيذ. نؤمن أن كل مساحة تستحق لمسة مدروسة تُظهر جمالها
            الحقيقي وتمنح أهلها إحساساً بالراحة والانتماء.
          </p>
        </div>
      </section>

      <section className="bg-primary-background px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-primary-text md:text-4xl">
              لماذا يختارنا العملاء؟
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-[4px] border border-soft-divider bg-white p-6 shadow-sm"
                >
                  <h3 className="font-display text-xl font-bold text-primary-text">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-primary-text/75">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[4px] border border-soft-divider bg-white shadow-sm">
            <div
              className="min-h-[420px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(44,36,22,0.12), rgba(44,36,22,0.12)), url('https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1200&q=80')",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
