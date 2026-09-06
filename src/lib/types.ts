export type ResourceType = {
  id: number;
  key: string;
  name: string;
  description: string;
  sort: number;
  accent: number;
};

export type Category = {
  id: number;
  typeId: number;
  typeKey: string;
  name: string;
  slug: string;
  description: string;
  sort: number;
};

export type Resource = {
  id: number;
  name: string;
  slug: string;
  typeId: number;
  typeKey: string;
  typeName: string;
  typeAccent: number;
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  summary: string;
  description: string;
  tags: string[];
  officialUrl: string;
  sourceUrl: string;
  installGuide: string;
  configText: string;
  iconUrl: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
};

export type ResourceInput = {
  name: string;
  slug: string;
  typeId: number;
  categoryId: number;
  summary: string;
  description: string;
  tags: string[];
  officialUrl: string;
  sourceUrl: string;
  installGuide: string;
  configText: string;
  iconUrl: string;
  status: "draft" | "published";
};

