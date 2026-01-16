import ListScreen from "./ListScreen";

export default function TourismScreen() {
  return (
    <ListScreen
      title="Tourism"
      endpoint="/tourism"
      line1={(x) => x.name}
      line2={(x) => `${x.city} • ${x.description}`}
      link={(x) => x.link}
    />
  );
}
