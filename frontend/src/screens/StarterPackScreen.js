import ListScreen from "./ListScreen";

export default function StarterPackScreen() {
  return (
    <ListScreen
      title="Starter Pack"
      endpoint="/starter-pack"
      line1={(x) => `${x.category}: ${x.name}`}
      line2={() => ""}
      link={(x) => x.link}
    />
  );
}
