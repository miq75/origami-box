import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ColorPicker from "../Generic/ColorPicker";
import { LeftForm, RightPreview } from "../Generic/Grid";
import { updateDetail, deleteText, deleteImage } from "../store/templates";
import PatternTemplateBack from "./PatternTemplateBack";
import Nav from "./Nav";
import { useTemplate } from "../hooks";

export default function StepBDesign({ lid = false }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { template, data: pattern } = useTemplate();
  const block = lid ? pattern.lid : pattern.base;
  const baseUrl = "/edit/" + template.key;

  function handleBackgroundColorChange(color) {
    dispatch(updateDetail(template.key, block.key, "background", color.hex));
  }

  function handleBackgroundImageChange(event) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          updateDetail(
            template.key,
            block.key,
            "backgroundImage",
            reader.result
          )
        );
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      dispatch(updateDetail(template.key, block.key, "backgroundImage", null));
    }
  }

  function handleTextDelete(key) {
    dispatch(deleteText(template.key, block.key, key));
  }

  function handleImageDelete(key) {
    dispatch(deleteImage(template.key, block.key, key));
  }

  return (
    <div className="row">
      <Nav />
      <LeftForm>
        <div className="mb-3">
          <label htmlFor="backgroundColor" className="form-label">
            {t("pattern.stepBDesign.backgroundColor")}
          </label>
          <ColorPicker
            name="backgroundColor"
            style={{ maxWidth: "3rem" }}
            color={block.background}
            onColorChange={handleBackgroundColorChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="backgroundImage" className="form-label">
            {t("pattern.stepBDesign.backgroundImage")}
          </label>
          <input
            className="form-control"
            type="file"
            name="backgroundImage"
            id="backgroundImage"
            accept="image/png, image/jpeg, image/svg+xml"
            onChange={handleBackgroundImageChange}
          />
        </div>
        <div className="mb-3">
          <table className="table">
            <thead>
              <tr>
                <th>{t("pattern.stepBDesign.textContent")}</th>
                <th>{t("pattern.stepBDesign.textFace")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(block.texts).map((key) => (
                <tr key={key} className="align-middle">
                  <td>
                    {block.texts[key].content.split("\n").map((line, index) => {
                      return <div key={index}>{line}</div>;
                    })}
                  </td>
                  <td>{t(`pattern.face.${block.texts[key].face}`)}</td>
                  <td className="text-end">
                    <Link
                      className="btn btn-outline-primary ms-1 btn-sm"
                      title={t("pattern.stepBDesign.textEdit")}
                      to={`${baseUrl}/${block.key}/text/${key}`}
                    >
                      <i className="fas fa-pen" style={{ width: "14px" }}></i>
                    </Link>
                    <button
                      className="btn btn-outline-danger ms-1 btn-sm"
                      title={t("pattern.stepBDesign.textDelete")}
                      onClick={() => handleTextDelete(key)}
                    >
                      <i className="fas fa-times" style={{ width: "14px" }}></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex">
            <Link
              className="btn btn-outline-primary"
              to={`${baseUrl}/${block.key}/text`}
            >
              {t("pattern.stepCText.linkTo")}
            </Link>
          </div>
        </div>
        <div className="mb-3">
          <table className="table">
            <thead>
              <tr>
                <th>{t("pattern.stepBDesign.imageContent")}</th>
                <th>{t("pattern.stepBDesign.imageFace")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(block.images).map((key) => (
                <tr key={key} className="align-middle">
                  <td>
                    <img
                      alt=""
                      src={block.images[key].content}
                      style={{ height: "2rem" }}
                    />
                  </td>
                  <td>{t(`pattern.face.${block.images[key].face}`)}</td>
                  <td className="text-end">
                    <Link
                      className="btn btn-outline-primary ms-1 btn-sm"
                      title={t("pattern.stepBDesign.imageEdit")}
                      to={`${baseUrl}/${block.key}/image/${key}`}
                    >
                      <i className="fas fa-pen" style={{ width: "14px" }}></i>
                    </Link>
                    <button
                      className="btn btn-outline-danger ms-1 btn-sm"
                      title={t("pattern.stepBDesign.imageDelete")}
                      onClick={() => handleImageDelete(key)}
                    >
                      <i className="fas fa-times" style={{ width: "14px" }}></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex">
            <Link
              className="btn btn-outline-primary"
              to={`${baseUrl}/${block.key}/image`}
            >
              {t("pattern.stepDImage.linkTo")}
            </Link>
          </div>
        </div>
        <div className="mb-3 mt-5 d-flex">
          {!lid && pattern.withLid && (
            <Link className="btn btn-primary ms-auto" to={`${baseUrl}/lid`}>
              {t("pattern.stepBDesign.lid.linkTo")}
            </Link>
          )}
          {(lid || !pattern.withLid) && (
            <Link
              className="btn btn-primary ms-auto"
              to={`${baseUrl}/generate`}
            >
              {t("pattern.stepZGenerate.linkTo")}
            </Link>
          )}
        </div>
      </LeftForm>
      <RightPreview>
        <PatternTemplateBack lid={lid} />
      </RightPreview>
    </div>
  );
}
