import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import classNames from "classnames/dedupe";
import { LeftForm, RightPreview } from "../Generic/Grid";
import Nav from "./Nav";
import PatternTemplateFront from "./PatternTemplateFront";
import { checkValidity } from "./helper";
import {
  /*updateDetail,*/ updateData,
  updateTemplate,
} from "../store/templates";
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
              {parameters.map((d) => (
                <div>
                  <label className="form-check-label" htmlFor="withDesign">
                    {t("pattern.dimensions." + d.label)}
                  </label>
                  <input
                    key={d.label}
                    name={d.label}
                    type="number"
                    className="form-control"
                    required
                    min="5"
                    step="0.05"
                    //placeholder={d.default}
                    value={pattern[d.label]}
                    onChange={handleInputChange}
                  />
                </div>
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
          <div className="mb-3 mt-5 d-flex">
            {pattern.withDesign && (
              <Link
                className={classNames("btn btn-primary ms-auto", {
                  disabled: !valid,
                })}
                to={`${url}/base`}
              >
                {t("pattern.stepBDesign.box.linkTo")}
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
        <PatternTemplateFront />
      </RightPreview>
    </div>
  );
}
