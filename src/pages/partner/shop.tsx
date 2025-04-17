import { useParams } from "react-router-dom";
import ShopProfile from "@/components/partner/ShopProfile";

export default function ShopPage() {
  const { shopId } = useParams<{ shopId: string }>();
  return <ShopProfile shopId={parseInt(shopId || "0")} />;
}
