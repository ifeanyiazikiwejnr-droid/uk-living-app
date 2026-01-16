import ListScreen from "./ListScreen";

export default function AccommodationsScreen() {
  return (
    <ListScreen
      title="Accommodations"
      endpoint="/accommodations"
      line1={(x) => x.name}
      line2={(x) => `${x.city} • £${x.price}`}
      link={(x) => x.link}
    />
  );
}
