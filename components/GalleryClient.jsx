'use client';

import { useEffect, useMemo, useState } from 'react';
import FadeInSection from './FadeInSection';

const filters = ['الكل', 'ستائر', 'ركنات', 'كنب'];

function PlaceholderVisual({ category }) {
  return (
    <div className="flex h-full min-h-[280px] items-center justify-center bg-[linear-gradient(135deg,#f5f0e8,#e8dccb)] p-8 text-center text-primary-text">
      <div>
        <div className="mx-auto mb-4 h-16 w-16 rounded-full border border-accent/30 bg-white/60" />
        <p className="font-display text-2xl font-bold">{category}</p>
        <p className="mt-2 text-sm text-primary-text/70">سيتم عرض الصورة هنا بعد إضافة الأعمال</p>
      </div>
    </div>
  );
}

export default function GalleryClient() {
  const [works, setWorks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [selectedWork, setSelectedWork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch('/api/works');
        const data = await response.json();
        setWorks(data.works || []);
      } catch {
        setWorks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  useEffect(() => {
    if (activeFilter === 'الكل') return;

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: activeFilter }),
    }).catch(() => {
      // no-op
    });
  }, [activeFilter]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedWork(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const filteredWorks = useMemo(() => {
    if (activeFilter === 'الكل') return works;
    return works.filter((work) => work.category === activeFilter);
  }, [activeFilter, works]);

  return (
    <>
      <section className="border-b border-soft-divider bg-primary-background px-4 pb-8 pt-28 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-body text-sm tracking-[0.2em] text-accent">معرض الأعمال</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-primary-text md:text-5xl">
            أعمالنا تتحدث عن الذوق والجودة
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-primary-text/75 md:text-lg">
            تصفح نماذج مختارة من أعمال المتخصص في الستائر والركنات والكنب، مع تصميم يبرز
            الصورة ويترك لها المساحة الكاملة للتأثير.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-[4px] border px-5 py-2 text-sm font-bold ${
                    isActive
                      ? 'border-accent bg-accent text-white'
                      : 'border-soft-divider bg-white text-primary-text hover:border-accent hover:text-accent'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary-background px-4 py-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-[320px] animate-pulse rounded-[4px] bg-white/70" />
              ))}
            </div>
          ) : filteredWorks.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredWorks.map((work) => (
                <FadeInSection key={work.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedWork(work)}
                    className="group block w-full overflow-hidden rounded-[4px] border border-soft-divider bg-white text-right shadow-sm transition hover:shadow-md"
                  >
                    <div className="relative h-[320px] overflow-hidden bg-primary-background">
                      {work.image_url ? (
                        <img
                          src={work.image_url}
                          alt={work.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <PlaceholderVisual category={work.category} />
                      )}
                    </div>
                    <div className="space-y-2 p-5">
                      <span className="inline-flex rounded-[4px] bg-primary-background px-3 py-1 text-xs font-bold text-accent">
                        {work.category}
                      </span>
                      <h2 className="font-display text-xl font-bold text-primary-text">{work.title}</h2>
                      <p className="text-sm text-primary-text/70">اضغط لعرض الصورة بحجم أكبر</p>
                    </div>
                  </button>
                </FadeInSection>
              ))}
            </div>
          ) : (
            <div className="rounded-[4px] border border-dashed border-soft-divider bg-white p-10 text-center">
              <h2 className="font-display text-2xl font-bold text-primary-text">لا توجد أعمال في هذا القسم حالياً</h2>
              <p className="mt-3 text-primary-text/70">يمكنك إضافة الأعمال لاحقاً من لوحة التحكم.</p>
            </div>
          )}
        </div>
      </section>

      {selectedWork && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-primary-text/80 px-4 py-8"
          onClick={() => setSelectedWork(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-[4px] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedWork(null)}
              className="absolute left-4 top-4 z-10 rounded-full bg-primary-text px-3 py-1 text-sm font-bold text-white hover:bg-accent"
            >
              إغلاق
            </button>

            <div className="relative h-[70vh] bg-primary-background">
              {selectedWork.image_url ? (
                <img
                  src={selectedWork.image_url}
                  alt={selectedWork.title}
                  className="h-full w-full object-contain"
                />
              ) : (
                <PlaceholderVisual category={selectedWork.category} />
              )}
            </div>

            <div className="border-t border-soft-divider p-5">
              <span className="inline-flex rounded-[4px] bg-primary-background px-3 py-1 text-xs font-bold text-accent">
                {selectedWork.category}
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold text-primary-text">{selectedWork.title}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
