import { useNavigate } from "react-router-dom";

export const EmployeeItem = ({ employee, handleDelete }) => {
  const navigate = useNavigate();
  const today = new Date();

  const expiretionDate = () => {
    const parseDate = (date) => {
      const d = new Date(date);
      return isNaN(d.getTime()) ? null : d;
    };

    const HasVacation = employee.vacations.length > 0;
    let expiration;

    if (HasVacation) {
      const last = employee.vacations.length - 1;
      const lastVacationDate = parseDate(employee.vacations[last].endDate);
      if (lastVacationDate) expiration = addMonthsToDate(lastVacationDate, 24);
    }

    if (!expiration) {
      const admissionDateParsed = parseDate(employee.admissionDate);
      expiration = admissionDateParsed
        ? addMonthsToDate(admissionDateParsed, 24)
        : null;
    }

    if (expiration) expiration.setDate(expiration.getDate() - 1);

    const expiredDays =
      expiration != null
        ? Math.max(0, Math.floor((today - expiration) / (1000 * 60 * 60 * 24)))
        : 0;

    return {
      expirationDate: expiration,
      expiredDays,
    };
  };

  const addMonthsToDate = (baseDate, monthsToAdd) => {
    const date = new Date(baseDate);
    date.setMonth(date.getMonth() + monthsToAdd);
    return date;
  };

  const hasVacation = () => {
    const { expirationDate } = expiretionDate();

    const adjustedExpiration = expirationDate
      ? new Date(expirationDate.setMonth(expirationDate.getMonth() - 12))
      : null;

    const expirationReached = adjustedExpiration && today >= adjustedExpiration;
    return employee.isPendingVacation || expirationReached;
  };

  return (
    <tr scope="row">
      <td>{employee.name}</td>
      <td>
        <input
          type="date"
          value={employee.admissionDate.slice(0, 10)}
          name="admissionDate"
          disabled
          readOnly={true}
        />
      </td>
      <td>
        <input
          type="date"
          name="expirationDate"
          disabled
          readOnly={true}
          value={
            expiretionDate().expirationDate &&
            expiretionDate().expirationDate.toISOString().slice(0, 10)
          }
        />
      </td>
      <td
        name="expiredDays"
        className={expiretionDate().expiredDays > 0 ? "expiredDay" : undefined}
      >
        Passaram {expiretionDate().expiredDays} dia(s)
      </td>
      <td
        className={
          hasVacation()
            ? "employee-situation has-vacation"
            : "employee-situation no-vacation"
        }
      >
        <div>
          <span className="material-symbols-outlined">
            {hasVacation() ? "check_circle" : "cancel"}
          </span>
          <span>
            {hasVacation() ? "Direito a férias" : "Sem direito a férias"}
          </span>
        </div>
      </td>
      <td className="td-actions">
        <button
          className="bg-hover-green color-green"
          onClick={() => navigate(`/app/editar-funcionario/${employee.id}`)}
          title="Editar"
        >
          <span className="material-symbols-outlined">person_edit</span>
        </button>
        <button
          className="bg-hover-blue color-blue"
          title="Exibir histórico de férias"
          onClick={() =>
            navigate(`/app/historico-de-ferias/funcionario/${employee.id}`)
          }
        >
          <span className="material-symbols-outlined">event_available</span>
        </button>
        <button
          className="bg-hover-danger color-danger"
          title="Excluir"
          onClick={handleDelete}
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </td>
    </tr>
  );
};
