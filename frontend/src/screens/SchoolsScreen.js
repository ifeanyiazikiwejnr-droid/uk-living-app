import ListScreen from "./ListScreen";

export default function SchoolsScreen() {
  return (
    <ListScreen
      title="Schools"
      endpoint="/schools"
      line1={(x) => x.name}
      line2={(x) => `${x.city} • ${x.type}`}
      link={(x) => x.link}
    />
  );
}
