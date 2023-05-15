import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { Navbar } from "./Pages/Navbar/Navbar";

export const PrivateRouter = ({children}) => {
    const userLoggedIn  = useSelector(state=> state.userReducer.user)
    if (userLoggedIn?.data?.token) {
      return (
        <>
          <Navbar />
          {children}
        </>
      );
    } else {
      return <Navigate to="/login" />;
    }
}