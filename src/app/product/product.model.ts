export interface Product {
  id?: number;
  name: string;
  code: string;
  description?: string;
  images?: Array<string | { name: string; url: string }>;
}
