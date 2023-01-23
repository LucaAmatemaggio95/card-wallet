import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
/**
 * Route used for unmatched routes
 * @returns JSX
 */
const NoMatch = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/cards");
  }, [navigate]);

  return <div>NoMatch</div>;
};

export default NoMatch;
