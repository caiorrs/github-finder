import AlertContext from "../../context/alert/AlertContext";
import { useContext } from "react";

const Alert = () => {
  const { alert } = useContext(AlertContext);

  return alert !== null ? (
    <p className="flex items-start margin-bottom-4 space-x-2">
      {
        <div className={`alert alert-${alert.type}`}>
          <i className="fas fa-info-circle" /> {alert.msg}
        </div>
      }
    </p>
  ) : null;
};

export default Alert;
