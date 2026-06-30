'use client';

import { useEffect } from 'react';

export default function HomeViewTracker() {
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page: 'home' }),
    }).catch(() => {
      // تجاهل الأخطاء بصمت لحين ربط Supabase فعلياً
    });
  }, []);

  return null;
}
