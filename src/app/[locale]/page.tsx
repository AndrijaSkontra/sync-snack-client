import { useTranslations } from "next-intl";
import { Link } from "@/routing";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return <h1>{t("title")}</h1>;
}
