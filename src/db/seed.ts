import { getDb, seedDatabase } from "./index";

seedDatabase(getDb());
console.log("种子数据已就绪。");

