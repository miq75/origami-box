import JsonDisplay from "./Generic/JsonDisplay";

export default function ProcessPage() {
  return (
    <div className="container">
      <h1>Defined process variables</h1>
      <JsonDisplay json={process.env} title="process.env" />
    </div>
  );
}
