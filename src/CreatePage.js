import * as THREE from "three";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Canvas, useFrame } from "react-three-fiber";
import { v4 as uuidv4 } from "uuid";
import { create } from "./store/templates";

function BoxMaterial() {
  return <meshStandardMaterial color="#FCB900" side={THREE.DoubleSide} />;
}

function BottomTriangle(props) {
  const positions = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, 0, 1],
    [-1, 0, 0],
  ].flat();

  const normals = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ].flat();

  return (
    <group {...props}>
      <mesh rotation={[-0.2, 0, 0]}>
        <bufferGeometry>
          <float32BufferAttribute
            attachObject={["attributes", "position"]}
            args={[positions, 3]}
          />
          <float32BufferAttribute
            attachObject={["attributes", "normal"]}
            args={[normals, 3]}
          />
        </bufferGeometry>
        <BoxMaterial />
      </mesh>
    </group>
  );
}

function Side(props) {
  return (
    <group {...props}>
      <mesh>
        <planeBufferGeometry args={[2, 1]} />
        <BoxMaterial />
      </mesh>
    </group>
  );
}

function PatternBox(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <group {...props} ref={mesh}>
      <group name="bottom" position={[0, -0.5, 0]}>
        <BottomTriangle position={[0, 0, -1]} rotation={[0, 0, 0]} />
        <BottomTriangle position={[0, 0, 1]} rotation={[0, Math.PI, 0]} />
        <BottomTriangle position={[-1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        <BottomTriangle position={[1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      </group>
      <Side position={[0, 0, 1]} />
      <Side position={[0, 0, -1]} rotation={[0, Math.PI, 0]} />
      <Side position={[1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Side position={[-1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
    </group>
  );
}

export default function CreatePage() {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState(null);
  const dispatch = useDispatch();

  function handleCreate() {
    const key = uuidv4();
    dispatch(create(key));
    setRedirect("/edit/" + key);
  }

  if (redirect !== null) {
    return <Redirect to={redirect} />;
  } else {
    return (
      <div className="container">
        <h1>{t("create.title")}</h1>
        <div className="row">
          <div className="card col-6">
            <div className="row g-0">
              <div className="col-4">
                <Canvas>
                  <ambientLight />
                  <pointLight position={[10, 10, 10]} />
                  <pointLight position={[-10, 10, 10]} />
                  <PatternBox
                    position={[0, 0, -1]}
                    scale={[2, 2, 2]}
                    rotation={[0.7, 0, 0]}
                  />
                </Canvas>
              </div>
              <div className="col-8">
                <div className="card-body">
                  <h5 className="card-title">{t("create.pattern.title")}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {t("create.pattern.subtitle")}
                  </h6>
                  <p className="card-text">{t("create.pattern.description")}</p>
                  <button
                    onClick={handleCreate}
                    className="btn btn-primary stretched-link"
                  >
                    {t("create.pattern.button")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
