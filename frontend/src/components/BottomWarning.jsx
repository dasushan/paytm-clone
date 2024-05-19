import { Link } from 'react-router-dom';
export const ButtomWarning = ({ label, buttonText, to }) => {
  return (
    <div className="text-sm flex justify-center py-2">
      <div>{label}</div>
      <Link className="pl-1 pointer underline cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
  );
};
