// components
import PageHeader from "./mains/PageHeader";
import FavoritesGrid from "./mains/FavoritesGrid";

const Favorites = () => (
  <div className="flex flex-col gap-8">
    <PageHeader />
    <FavoritesGrid />
  </div>
);

export default Favorites;
