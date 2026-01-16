import ListScreen from "./ListScreen";

export default function JobsScreen() {
  return (
    <ListScreen
      title="Jobs"
      endpoint="/jobs"
      line1={(x) => x.title}
      line2={(x) => x.company}
      link={(x) => x.link}
    />
  );
}
