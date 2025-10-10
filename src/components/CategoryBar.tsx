import { getVideoCategories } from "@/libs/youtube";
import CategoryBarClient from "./Category";

export default async function CategoryBar() {
  const categories = await getVideoCategories("VN");

  const final = [{ id: "all", title: "All" }, ...categories];

  return <CategoryBarClient categories={final} />;
}
