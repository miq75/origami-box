import Nav from "./Nav";
import { useTemplate } from "../hooks";
import JsonDisplay from "../Generic/JsonDisplay";

export default function StepYDebug() {
  const { template } = useTemplate();

  return (
    <div className="row">
      <Nav />
      <div className="col-12">
        <JsonDisplay title="template" json={template} />
      </div>
    </div>
  );
}
