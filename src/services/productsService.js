import { supabase } from "../lib/supabaseClient";
// جلب كل المنتجات بدون فلترة
export const getAllProducts = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching all products:", error.message);
    throw error;
  }
};

// جلب آخر 4 منتجات للصفحة الرئيسية
export const getLatestProducts = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(4);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching latest products:", error.message);
    throw error;
  }
};

// جلب المنتجات حسب الفئة فقط (Category)
export const getProductsByCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(
      `Error fetching products by category (${category}):`,
      error.message
    );
    throw error;
  }
};
