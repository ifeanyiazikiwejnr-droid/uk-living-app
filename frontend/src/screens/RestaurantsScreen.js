import ListScreen from "./ListScreen";

export default function RestaurantsScreen() {
  return (
    <ListScreen
      title="Restaurants"
      endpoint="/restaurants"
      line1={(x) => x.name}
      line2={(x) => `${x.city} • ${x.cuisine}`}
      link={(x) => x.link}
    />
  );
}
