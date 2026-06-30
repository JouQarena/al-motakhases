# المتخصص

موقع Portfolio عربي RTL لعرض أعمال **المتخصص** في:
- ستائر
- ركنات
- كنب

تم بناء المشروع باستخدام:
- **Next.js 14+ App Router**
- **JavaScript**
- **Tailwind CSS**
- **Supabase**
- **Supabase Storage**
- **Supabase Auth**
- **Vercel**

---

## تشغيل المشروع محليًا

```bash
npm install
npm run dev
```

ثم افتح:

```bash
http://localhost:3000
```

---

## إعداد Supabase

### 1) إنشاء مشروع Supabase
- ادخل إلى Supabase
- أنشئ مشروع جديد
- انسخ القيم التالية من إعدادات المشروع:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

### 2) إعداد قاعدة البيانات
نفّذ ملف:

```bash
supabase/schema.sql
```

من خلال **SQL Editor** داخل Supabase.

### 3) إعداد Storage
ملف `schema.sql` يحتوي على:
- إنشاء الجداول:
  - `works`
  - `page_views`
- إنشاء bucket:
  - `works-images`
- إعداد سياسات الوصول المطلوبة

---

## Environment Variables المطلوبة

أنشئ ملف `.env.local` محليًا بهذه القيم:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

> مهم: يجب استبدال كل القيم التجريبية بالقيم الحقيقية قبل الإطلاق.

---

## خطوات الرفع على GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

---

## خطوات الـ Deployment على Vercel

### 1) رفع المشروع على GitHub
ارفع المشروع إلى مستودع GitHub.

### 2) ربط المشروع بـ Vercel
- ادخل إلى Vercel
- اختر **Add New Project**
- اربط مستودع GitHub الخاص بالمشروع
- اختر المشروع `al-motakhases`

### 3) إضافة Environment Variables على Vercel
أضف المتغيرات التالية داخل إعدادات المشروع على Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

يفضل إضافتها في:
- Production
- Preview
- Development

### 4) Deploy
بعد حفظ المتغيرات:
- اضغط **Deploy**

---

## التحقق قبل الإطلاق

تأكد من الآتي:
- تم استبدال أرقام التواصل والروابط placeholder بالبيانات الحقيقية
- تم ربط Supabase بالقيم الصحيحة
- تم تنفيذ `schema.sql`
- تم إنشاء bucket باسم `works-images`
- تم التأكد من صلاحيات Storage
- تم اختبار:
  - الصفحة الرئيسية
  - معرض الأعمال
  - من نحن
  - تواصل معنا
  - لوحة التحكم
- تم اختبار رفع الصور وإخفائها وحذفها
- تم التأكد من تسجيل الزيارات في `page_views`

---

## Build Verification

تم التحقق من نجاح البناء محليًا عبر:

```bash
npm run build
```

---

## ملاحظات مهمة

- الصور يتم رفعها إلى **Supabase Storage** ويتم حفظ الرابط داخل جدول `works`.
- لوحة التحكم تحتاج تفعيل وإعداد بيانات الدخول الحقيقية في Supabase Auth.
- بيانات placeholders الحالية يجب تغييرها قبل إطلاق الموقع.

### البيانات placeholder الحالية
- واتساب: `+201000000000`
- تليفون: `+201000000000`
- فيسبوك: `https://facebook.com/almotakhases`
- بريد الأدمن: `admin@almotakhases.com`

---

## الأوامر المهمة

```bash
npm install
npm run dev
npm run build
npm run start
```
