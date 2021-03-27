import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { LeftForm, RightPreview } from "../Generic/Grid";
import { addOrUpdateImage } from "../store/templates";
import PatternTemplateBack from "./PatternTemplateBack";
import Nav from "./Nav";
import { checkValidity, loadImageAsync } from "./helper";
import { useTemplate } from "../hooks";

export default function StepDImage({ lid = false }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { key } = useParams();
  const { template, data: pattern } = useTemplate();
  const baseUrl = "/edit/" + template.key;

  const initialState =
    key !== undefined
      ? lid
        ? pattern.lid.images[key]
        : pattern.base.images[key]
      : {
          content: null,
          originalWidth: null,
          originalHeight: null,
          face: "0",
          size: "auto",
          width: "",
          height: "",
          horizontal: "center",
          vertical: "middle",
          marginHorizontal: 0,
          marginVertical: 0,
        };

  const [redirect, setRedirect] = useState(false);
  const [state, setState] = useState(initialState);

  function handleInputChange(event) {
    const value = checkValidity(event.target);
    setState({ ...state, [event.target.name]: value });
  }

  function handleSizeChange(event) {
    const checked = event.target.checked;
    setState({ ...state, size: checked ? "auto" : "manual" });
  }

  function handleImageChange(event) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        loadImageAsync(reader.result)
          .then((img) => {
            setState({
              ...state,
              content: reader.result,
              originalWidth: img.width,
              originalHeight: img.height,
            });
          })
          .catch((error) => {
            console.error("Can't load properly the image", error);
            setState({
              ...state,
              content: null,
              originalWidth: null,
              originalHeight: null,
            });
          });
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      setState({
        ...state,
        content: null,
        originalWidth: null,
        originalHeight: null,
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addOrUpdateImage(template.key, lid ? "lid" : "base", state));
    setRedirect(true);
  }

  return (
    <div className="row">
      <Nav />
      <LeftForm>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="content">{t("pattern.stepDImage.content")}</label>
            <input
              className="form-control"
              type="file"
              name="content"
              id="content"
              accept="image/png, image/jpeg, image/svg+xml"
              required={state.content === null}
              onChange={handleImageChange}
            />
          </div>
          <div className="mb-3">
            <label>{t("pattern.stepDImage.size")}</label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="size"
                name="size"
                checked={state.size === "auto"}
                onChange={handleSizeChange}
              />
              <label className="form-check-label" htmlFor="size">
                {t("pattern.stepDImage.sizeAuto")}
              </label>
            </div>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                name="width"
                placeholder={t("pattern.stepDImage.width")}
                disabled={state.size === "auto"}
                required={state.size === "manual"}
                min="0"
                step="0.01"
                value={state.width}
                onChange={handleInputChange}
              />
              <input
                type="number"
                className="form-control"
                name="height"
                placeholder={t("pattern.stepDImage.height")}
                disabled={state.size === "auto"}
                required={state.size === "manual"}
                min="0"
                step="0.01"
                value={state.height}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <fieldset>
            <legend>{t("pattern.stepDImage.positioning")}</legend>
            <div className="mb-3">
              <label htmlFor="face">{t("pattern.stepDImage.face")}</label>
              <select
                className="form-select"
                name="face"
                required
                value={state.face}
                onChange={handleInputChange}
              >
                <option value="0">{t("pattern.face.0")}</option>
                <option value="1">{t("pattern.face.1")}</option>
                <option value="2">{t("pattern.face.2")}</option>
                <option value="3">{t("pattern.face.3")}</option>
                <option value="4">{t("pattern.face.4")}</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="horizontal">
                {t("pattern.stepDImage.horizontal")}
              </label>
              <div className="input-group">
                <select
                  className="form-select"
                  name="horizontal"
                  required
                  value={state.horizontal}
                  onChange={handleInputChange}
                >
                  <option value="left">{t("pattern.horizontal.left")}</option>
                  <option value="center">
                    {t("pattern.horizontal.center")}
                  </option>
                  <option value="right">{t("pattern.horizontal.right")}</option>
                </select>
                <select
                  className="form-select"
                  name="vertical"
                  required
                  value={state.vertical}
                  onChange={handleInputChange}
                >
                  <option value="top">{t("pattern.vertical.top")}</option>
                  <option value="middle">{t("pattern.vertical.middle")}</option>
                  <option value="bottom">{t("pattern.vertical.bottom")}</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="marginHorizontal">
                {t("pattern.stepDImage.margins")}
              </label>
              <div className="input-group">
                <input
                  type="number"
                  name="marginHorizontal"
                  className="form-control"
                  required
                  step="0.01"
                  value={state.marginHorizontal}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="marginVertical"
                  className="form-control"
                  required
                  step="0.01"
                  value={state.marginVertical}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </fieldset>
          <div className="mb-3 mt-5 d-flex">
            <Link
              className="btn btn-link"
              to={`${baseUrl}/${lid ? "lid" : "base"}`}
            >
              {t("pattern.stepDImage.cancel")}
            </Link>
            <button type="submit" className="btn btn-primary ms-auto">
              {t("pattern.stepDImage.submit")}
            </button>
            {redirect && <Redirect to={`${baseUrl}/${lid ? "lid" : "base"}`} />}
          </div>
        </form>
      </LeftForm>
      <RightPreview>
        <PatternTemplateBack lid={lid} image={state} />
      </RightPreview>
    </div>
  );
}
