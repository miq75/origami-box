import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import classNames from "classnames/dedupe";
import { LeftForm, RightPreview } from "../Generic/Grid";
import Nav from "./Nav";
import PatternTemplateFront from "./PatternTemplateFront";
import { checkValidity } from "./helper";
import { updateDetail, updateData, updateTemplate } from "../store/templates";
import { useTemplate } from "../hooks";

import { getLocalTemplates } from "../store"; // ajout MiQ

export default function StepAGeneral() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [valid, setValid] = useState(false);
  const form = useRef(null);
  const { template, data: pattern } = useTemplate();
  const { url } = useRouteMatch();
  const parameters = useSelector(getLocalTemplates).pattern.parameters; // ajout MiQ

  useEffect(() => {
    setValid(form.current.checkValidity());
  }, [form, pattern]);

  function handleTemplateInputChange(event) {
    const value = checkValidity(event.target);
    dispatch(updateTemplate(template.key, event.target.name, value));
  }

  function handleInputChange(event) {
    const value = checkValidity(event.target);
    dispatch(updateData(template.key, event.target.name, value));
  }

  function handleLidInputChange(event) {
    const value = checkValidity(event.target);
    dispatch(updateDetail(template.key, "lid", event.target.name, value));
  }

  function handleCheckedChange(event) {
    dispatch(updateData(template.key, event.target.name, event.target.checked));
  }

  return (
    <div className="row">
      <Nav />
      <LeftForm>
        <form ref={form} noValidate>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              {t("template.title")}
            </label>
            <input
              name="title"
              type="text"
              className="form-control"
              autoFocus
              value={template.title}
              onChange={handleTemplateInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="length" className="form-label">
              {t("pattern.dimensions.label")}
            </label>
            {/* début transformation de MiQ 1 */}
            {/* (factorisation de 3 copier-coller des 3 mesures d'une boite
     en une boucle sur les mesures définies dans le pattern. */}
            <div className="input-group">
              {" "}
              {parameters.map((d) => (
                <input
                  key={d.label}
                  name={d.label}
                  type="number"
                  className="form-control"
                  style={{ width: "calc(100%/length(parameters))" }}
                  required
                  min="1"
                  step="0.01"
                  placeholder={t("pattern.dimensions." + d.label)}
                  aria-label={t("pattern.dimensions." + d.label)}
                  value={pattern[d.label]}
                  onChange={handleInputChange}
                />
              ))}{" "}
            </div>
            {/* fin transformation de MiQ 1 */}
          </div>
          <div className="mb-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="withDesign"
                name="withDesign"
                checked={pattern.withDesign}
                onChange={handleCheckedChange}
              />
              <label className="form-check-label" htmlFor="withDesign">
                {t("pattern.stepAGeneral.withDesign")}
              </label>
            </div>
            <div className="text-muted">
              {t(
                `pattern.stepAGeneral.withDesign${
                  pattern.withDesign ? "On" : "Off"
                }`
              )}
            </div>
          </div>
          <div className="mb-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="withLid"
                name="withLid"
                checked={pattern.withLid}
                onChange={handleCheckedChange}
              />
              <label className="form-check-label" htmlFor="withLid">
                {t("pattern.stepAGeneral.withLid")}
              </label>
            </div>
            <div className="text-muted">
              {t(
                `pattern.stepAGeneral.withLid${pattern.withLid ? "On" : "Off"}`
              )}
            </div>
          </div>
          {pattern.withLid && (
            <div className="mb-3">
              <label htmlFor="delta" className="form-label">
                {t("pattern.stepAGeneral.delta")}
              </label>
              <input
                className="form-control"
                type="number"
                name="delta"
                id="delta"
                required
                min="0"
                max="10"
                step="0.01"
                value={pattern.lid.delta}
                onChange={handleLidInputChange}
              />
              <div className="text-muted">
                {t("pattern.stepAGeneral.deltaExplanation")}
              </div>
            </div>
          )}
          {pattern.withLid && (
            <div className="mb-3">
              <label htmlFor="lidHeight" className="form-label">
                {t("pattern.stepAGeneral.lidHeight")}
              </label>
              <input
                className="form-control"
                type="number"
                name="height"
                id="lidHeight"
                min="0"
                max={pattern.height}
                step="0.01"
                placeholder={t("pattern.stepAGeneral.lidHeightAuto")}
                value={pattern.lid.height}
                onChange={handleLidInputChange}
              />
              {pattern.lid.height === "" && (
                <div className="text-muted">
                  {t("pattern.stepAGeneral.lidHeightExplanation")}
                </div>
              )}
            </div>
          )}
          <div className="mb-3 mt-5 d-flex">
            {pattern.withDesign && !pattern.withLid && (
              <Link
                className={classNames("btn btn-primary ms-auto", {
                  disabled: !valid,
                })}
                to={`${url}/base`}
              >
                {t("pattern.stepBDesign.box.linkTo")}
              </Link>
            )}
            {pattern.withDesign && pattern.withLid && (
              <Link
                className={classNames("btn btn-primary ms-auto", {
                  disabled: !valid,
                })}
                to={`${url}/base`}
              >
                {t("pattern.stepBDesign.base.linkTo")}
              </Link>
            )}
            {!pattern.withDesign && (
              <Link
                className={classNames("btn btn-primary ms-auto", {
                  disabled: !valid,
                })}
                to={`${url}/generate`}
              >
                {t("pattern.stepZGenerate.linkTo")}
              </Link>
            )}
          </div>
        </form>
      </LeftForm>
      <RightPreview>
        {pattern.withLid && (
          <div className="row">
            <div className="col-12 col-lg-6 mb-3">
              <PatternTemplateFront />
            </div>
            <div className="col-12 col-lg-6 mb-3">
              <PatternTemplateFront lid />
            </div>
          </div>
        )}
        {!pattern.withLid && <PatternTemplateFront />}
      </RightPreview>
    </div>
  );
}
