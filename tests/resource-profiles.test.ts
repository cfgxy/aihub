import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

describe("资源详情内容", () => {
  it("七个种子均有完整正文和本地视觉素材", () => {
    for (const resource of resourceSeeds) {
      const profile = getResourceProfile(resource.slug);
      expect(profile, `${resource.name} 缺少详情内容`).toBeDefined();
      expect(profile!.overview.length).toBeGreaterThanOrEqual(2);
      expect(profile!.highlights.length).toBeGreaterThanOrEqual(3);
      expect(profile!.bestFor.length).toBeGreaterThan(10);
      expect(fs.existsSync(path.join(process.cwd(), "public", profile!.image))).toBe(true);
    }
  });
});
