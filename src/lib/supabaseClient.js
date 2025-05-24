import { createClient } from "@supabase/supabase-js";

// تحميل القيم من متغيرات البيئة (من ملف .env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// تأكيد أن القيم موجودة لتفادي الأخطاء
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL and Key are required. تأكد من ملف .env وأنك أعدت تشغيل الخادم."
  );
}

// إنشاء العميل
export const supabase = createClient(supabaseUrl, supabaseKey);
