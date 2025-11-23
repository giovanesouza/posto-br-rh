import NotFoundImg from "../../../assets/error_404.png";

export const NotFound = () => {
  return (
    <div className="text-align-center color-danger">
      <img
        src={NotFoundImg}
        style={{maxWidth: '600px', width: '100%'}}
        alt="Página não encontrada!"
        title="Página não encontrada!"
      />
    </div>
  );
};
