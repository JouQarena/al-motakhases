'use client';

import { useEffect, useState } from 'react';

const categories = ['ستائر', 'ركنات', 'كنب'];

export default function AdminDashboardClient() {
  const [stats, setStats] = useState([]);
  const [works, setWorks] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingWorks, setLoadingWorks] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [editingWorkId, setEditingWorkId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', category: '', imageFile: null });

  const loadStats = async () => {
    setLoadingStats(true);
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      setStats(data.stats || []);
    } catch {
      setStats([]);
    } finally {
      setLoadingStats(false);
    }
  };

  const loadWorks = async () => {
    setLoadingWorks(true);
    try {
      const response = await fetch('/api/admin/works');
      const data = await response.json();
      setWorks(data.works || []);
    } catch {
      setWorks([]);
    } finally {
      setLoadingWorks(false);
    }
  };

  useEffect(() => {
    loadStats();
    loadWorks();
  }, []);

  const readResponseSafely = async (response) => {
    const text = await response.text();
    if (!text) return {};
    try {
      return JSON.parse(text);
    } catch {
      return { error: 'استجابة غير صالحة من السيرفر.' };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await readResponseSafely(response);

      if (!response.ok) {
        throw new Error(data.details ? `${data.error} — ${data.details}` : data.error || 'حدث خطأ أثناء الرفع.');
      }

      setMessage('تم رفع الصورة وإضافة العمل بنجاح.');
      form.reset();
      await Promise.all([loadWorks(), loadStats()]);
    } catch (error) {
      setMessage(error.message || 'تعذر تنفيذ العملية.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleVisibility = async (id, visible) => {
    try {
      const response = await fetch('/api/admin/works', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, visible: !visible }),
      });

      const data = await readResponseSafely(response);

      if (!response.ok) {
        throw new Error(data.error || 'تعذر تحديث حالة الظهور.');
      }

      setMessage('تم تحديث حالة الظهور.');
      await loadWorks();
    } catch (error) {
      setMessage(error.message || 'تعذر تحديث حالة الظهور.');
    }
  };

  const deleteWork = async (id) => {
    const confirmed = window.confirm('هل أنت متأكد من حذف هذا العمل؟');
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/works?id=${id}`, {
        method: 'DELETE',
      });

      const data = await readResponseSafely(response);

      if (!response.ok) {
        throw new Error(data.error || 'تعذر حذف العمل.');
      }

      setMessage('تم حذف العمل بنجاح.');
      await Promise.all([loadWorks(), loadStats()]);
    } catch (error) {
      setMessage(error.message || 'تعذر حذف العمل.');
    }
  };

  const startEditing = (work) => {
    setEditingWorkId(work.id);
    setEditForm({
      title: work.title,
      category: work.category,
      imageFile: null,
    });
    setMessage('');
  };

  const cancelEditing = () => {
    setEditingWorkId(null);
    setEditForm({ title: '', category: '', imageFile: null });
  };

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const saveEdit = async () => {
    if (!editingWorkId) return;

    try {
      let replaceImage;
      if (editForm.imageFile) {
        const dataUrl = await fileToDataUrl(editForm.imageFile);
        replaceImage = {
          base64: dataUrl,
          contentType: editForm.imageFile.type,
        };
      }

      const response = await fetch('/api/admin/works', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingWorkId,
          title: editForm.title,
          category: editForm.category,
          replaceImage,
        }),
      });

      const data = await readResponseSafely(response);

      if (!response.ok) {
        throw new Error(data.error || 'تعذر تعديل العمل.');
      }

      setMessage('تم تعديل العمل بنجاح.');
      cancelEditing();
      await loadWorks();
    } catch (error) {
      setMessage(error.message || 'تعذر تعديل العمل.');
    }
  };

  const logout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <main className="px-4 py-28 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="flex flex-col gap-4 rounded-[4px] border border-soft-divider bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-body text-sm tracking-[0.2em] text-accent">لوحة التحكم</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-primary-text">إدارة الأعمال والإحصائيات</h1>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex rounded-[4px] border border-soft-divider px-5 py-3 text-sm font-bold text-primary-text hover:border-accent hover:text-accent"
          >
            تسجيل الخروج
          </button>
        </div>

        <section>
          <div className="mb-5">
            <h2 className="font-display text-2xl font-bold text-primary-text">إحصائيات الزيارات</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {(loadingStats ? Array.from({ length: 4 }) : stats).map((item, index) => (
              <div key={item?.page || index} className="rounded-[4px] border border-soft-divider bg-white p-6 shadow-sm">
                {loadingStats ? (
                  <div className="space-y-3">
                    <div className="h-4 w-24 animate-pulse rounded bg-primary-background" />
                    <div className="h-8 w-16 animate-pulse rounded bg-primary-background" />
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-primary-text/65">{item.page === 'home' ? 'الرئيسية' : item.page}</p>
                    <p className="mt-2 font-display text-4xl font-bold text-accent">{item.count}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[4px] border border-soft-divider bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-primary-text">رفع صورة جديدة</h2>
            <p className="mt-2 text-sm text-primary-text/70">ارفع صورة جديدة مع العنوان والتصنيف المناسب.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-primary-text">اسم العمل</label>
              <input type="text" name="title" required className="w-full rounded-[4px] border border-soft-divider px-4 py-3 outline-none focus:border-accent" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-primary-text">التصنيف</label>
              <select name="category" required className="w-full rounded-[4px] border border-soft-divider px-4 py-3 outline-none focus:border-accent">
                <option value="">اختر التصنيف</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-primary-text">الصورة</label>
              <input type="file" name="image" accept="image/*" required className="w-full rounded-[4px] border border-soft-divider px-4 py-3 text-sm file:ml-4 file:rounded-[4px] file:border-0 file:bg-accent file:px-4 file:py-2 file:font-bold file:text-white" />
            </div>

            <div className="md:col-span-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <button type="submit" disabled={submitting} className="inline-flex w-full justify-center rounded-[4px] bg-accent px-5 py-3 text-sm font-bold text-white hover:bg-primary-text disabled:cursor-not-allowed disabled:opacity-60 md:w-auto">
                {submitting ? 'جارٍ الرفع...' : 'رفع الصورة'}
              </button>

              {message && <p className="text-sm text-primary-text/75">{message}</p>}
            </div>
          </form>
        </section>

        <section className="rounded-[4px] border border-soft-divider bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-primary-text">الصور الحالية</h2>
          </div>

          {loadingWorks ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-24 animate-pulse rounded-[4px] bg-primary-background" />
              ))}
            </div>
          ) : works.length > 0 ? (
            <div className="space-y-4">
              {works.map((work) => {
                const isEditing = editingWorkId === work.id;

                return (
                  <div key={work.id} className="rounded-[4px] border border-soft-divider p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-20 w-20 overflow-hidden rounded-[4px] bg-primary-background">
                          {work.image_url ? <img src={work.image_url} alt={work.title} className="h-full w-full object-cover" /> : null}
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-bold text-primary-text">{work.title}</h3>
                          <p className="mt-1 text-sm text-primary-text/70">{work.category}</p>
                          <p className="mt-1 text-xs text-primary-text/55">الحالة: {work.visible ? 'ظاهر في المعرض' : 'مخفي'}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button type="button" onClick={() => toggleVisibility(work.id, work.visible)} className="rounded-[4px] border border-soft-divider px-4 py-2 text-sm font-bold text-primary-text hover:border-accent hover:text-accent">
                          {work.visible ? 'إخفاء' : 'إظهار'}
                        </button>
                        <button type="button" onClick={() => startEditing(work)} className="rounded-[4px] border border-accent px-4 py-2 text-sm font-bold text-accent hover:bg-accent hover:text-white">
                          تعديل
                        </button>
                        <button type="button" onClick={() => deleteWork(work.id)} className="rounded-[4px] bg-primary-text px-4 py-2 text-sm font-bold text-white hover:bg-accent">
                          حذف
                        </button>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="mt-5 grid gap-4 border-t border-soft-divider pt-5 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-bold text-primary-text">اسم العمل</label>
                          <input
                            type="text"
                            value={editForm.title}
                            onChange={(event) => setEditForm((prev) => ({ ...prev, title: event.target.value }))}
                            className="w-full rounded-[4px] border border-soft-divider px-4 py-3 outline-none focus:border-accent"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-bold text-primary-text">التصنيف</label>
                          <select
                            value={editForm.category}
                            onChange={(event) => setEditForm((prev) => ({ ...prev, category: event.target.value }))}
                            className="w-full rounded-[4px] border border-soft-divider px-4 py-3 outline-none focus:border-accent"
                          >
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label className="mb-2 block text-sm font-bold text-primary-text">استبدال الصورة (اختياري)</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => setEditForm((prev) => ({ ...prev, imageFile: event.target.files?.[0] || null }))}
                            className="w-full rounded-[4px] border border-soft-divider px-4 py-3 text-sm file:ml-4 file:rounded-[4px] file:border-0 file:bg-accent file:px-4 file:py-2 file:font-bold file:text-white"
                          />
                        </div>

                        <div className="md:col-span-2 flex flex-wrap gap-3">
                          <button type="button" onClick={saveEdit} className="rounded-[4px] bg-accent px-5 py-3 text-sm font-bold text-white hover:bg-primary-text">
                            حفظ التعديل
                          </button>
                          <button type="button" onClick={cancelEditing} className="rounded-[4px] border border-soft-divider px-5 py-3 text-sm font-bold text-primary-text hover:border-accent hover:text-accent">
                            إلغاء
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[4px] border border-dashed border-soft-divider bg-primary-background p-8 text-center text-primary-text/70">
              لا توجد أعمال مضافة حالياً.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
