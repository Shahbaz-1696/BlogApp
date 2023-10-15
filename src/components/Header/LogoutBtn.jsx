import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => console.log(error));
  };
  return (
    <button
    onClick={handleLogout} 
    className="inline-block px-6 py-2 duration-200 rounded-full hover: bg-blue-100">
      Logout
    </button>
  );
}

export default LogoutBtn;
