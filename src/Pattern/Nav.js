import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { isGeneralValid } from "./helper";
import "./Nav.css";
import { useTemplate } from "../hooks";

function BreadcrumbItem({ exact = false, path, title, withLink }) {
  const paths = Array.isArray(path) ? path : [path];
  const location = useLocation();
  const currentPath = location.pathname;

  const active = exact
    ? paths.includes(currentPath)
    : paths.some((p) => currentPath.startsWith(p));
  return (
    <li
      className={classNames(
        "breadcrumb-item d-flex align-bottom",
        { "h4 active": active },
        { "mt-1": !active }
      )}
    >
      {withLink && !active && <Link to={paths[0]}>{title}</Link>}
      {!(withLink && !active) && title}
    </li>
  );
}

export default function Nav() {
  const { t } = useTranslation();
  const { template, data: pattern } = useTemplate();
  const path = "/edit/" + template.key;

  return (
    <nav className="nav-steps" aria-label="breadcrumb">
      <ol className="breadcrumb">
        <BreadcrumbItem
          exact
          path={`${path}`}
          title={t("pattern.stepAGeneral.title")}
          withLink={isGeneralValid(pattern)}
        />
        {!pattern.withLid && pattern.withDesign && (
          <BreadcrumbItem
            path={`${path}/base`}
            title={t("pattern.stepBDesign.box.title")}
            withLink={isGeneralValid(pattern)}
          />
        )}
        {pattern.withLid && pattern.withDesign && (
          <BreadcrumbItem
            path={`${path}/base`}
            title={t("pattern.stepBDesign.base.title")}
            withLink={isGeneralValid(pattern)}
          />
        )}
        {pattern.withLid && pattern.withDesign && (
          <BreadcrumbItem
            path={`${path}/lid`}
            title={t("pattern.stepBDesign.lid.title")}
            withLink={isGeneralValid(pattern)}
          />
        )}
        <BreadcrumbItem
          path={`${path}/generate`}
          title={t("pattern.stepZGenerate.title")}
          withLink={isGeneralValid(pattern)}
        />
        {process.env.NODE_ENV === "development" && (
          <BreadcrumbItem
            path={`${path}/debug`}
            title={t("pattern.stepYDebug.title")}
            withLink={true}
          />
        )}
      </ol>
    </nav>
  );
}
