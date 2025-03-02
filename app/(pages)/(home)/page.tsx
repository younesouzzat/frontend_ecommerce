import { BrandCarousel } from "./brands";
import FeaturedProduct from "./FeaturedProduct";
import FirstBanner from "./FirstBanner";
import HomeSlider from "./HomeSlider";
import HotSells from "./HotSells";
import RecentProduct from "./RecentProduct";
import ThreeBanners from "./ThreeBanners";


export default function Home() {
  return (
    <div>
      <HomeSlider />
      <FirstBanner />
      <RecentProduct />
      <FeaturedProduct />
      <ThreeBanners />
      <HotSells />
      <BrandCarousel />
    </div>
  );
}
