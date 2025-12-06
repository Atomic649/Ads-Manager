// Mock data and placeholder fetchers for Boost Ads System

export type Category = { id: number; name: string };
export type Product = {
  id: number;
  title: string;
  description: string;
  image?: string;
  callToAction?: string;
  categoryId: number;
  boosted?: boolean;
};

export type Campaign = {
  id: number;
  name?: string;
  productId: number;
  budget: number;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
  impressions: number;
  clicks: number;
  ctr: number;
  spent: number;
};

export type DailyMetric = { date: string; impressions: number; clicks: number; spent: number };

export const CATEGORIES: Category[] = [
  { id: 1, name: 'Office' },
  { id: 2, name: 'Coach' },
  { id: 3, name: 'Bank' },
];

export const PRODUCTS: Product[] = [
  { id: 101, title: 'สำนักงานให้เช่า', description: 'ใกล้รถไฟฟ้า มีที่จอด', image: 'https://picsum.photos/seed/office/600/400', categoryId: 1, boosted: true },
  { id: 102, title: 'ที่ปรึกษาธุรกิจ', description: 'ปรับกลยุทธ์ เพิ่มยอดขาย', image: 'https://picsum.photos/seed/coach/600/400', categoryId: 2 },
  { id: 103, title: 'สินเชื่อธุรกิจ SME', description: 'ดอกเบี้ยพิเศษ วงเงินสูง', image: 'https://picsum.photos/seed/bank/600/400', categoryId: 3 },
];

export const CAMPAIGNS: Campaign[] = [
  { id: 9001, name: 'Office Boost 30D', productId: 101, budget: 499, status: 'ACTIVE', impressions: 12450, clicks: 356, ctr: 2.86, spent: 287 },
];

export const DAILY: DailyMetric[] = [
  { date: '2025-12-01', impressions: 600, clicks: 18, spent: 12 },
  { date: '2025-12-02', impressions: 980, clicks: 32, spent: 19 },
  { date: '2025-12-03', impressions: 1200, clicks: 40, spent: 24 },
  { date: '2025-12-04', impressions: 1500, clicks: 51, spent: 31 },
];

// Placeholder async functions (simulate API)
export const fetchCategories = async (): Promise<Category[]> => {
  await new Promise((r) => setTimeout(r, 300));
  return CATEGORIES;
};
export const fetchProducts = async (): Promise<Product[]> => {
  await new Promise((r) => setTimeout(r, 300));
  return PRODUCTS;
};
export const fetchCampaigns = async (): Promise<Campaign[]> => {
  await new Promise((r) => setTimeout(r, 300));
  return CAMPAIGNS;
};
export const fetchDailyMetrics = async (campaignId: number): Promise<DailyMetric[]> => {
  await new Promise((r) => setTimeout(r, 300));
  return DAILY;
};
