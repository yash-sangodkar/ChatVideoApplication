import { useRef, useState, useContext } from "react";
import userService from "../../services/UserService";
import { LoadingContext } from "../context/LoaderProvider";
import { UserContext } from "../context/UserProvider";
import type { UserCredentials } from "../../types/global";

interface LoginRegisterModalProps {
  onSetIsUserLoggedIn: (loggedIn: boolean) => void;
}

function LoginRegisterModal({ onSetIsUserLoggedIn }: LoginRegisterModalProps) {
  const [isLoginMode, setLoginMode] = useState(true);
  const setIsLoading = useContext(LoadingContext)?.setLoader;
  const setUserDetails = useContext(UserContext)?.setUserDetails;
  const usernmaeRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function onLoginOrRegisterBtnClick(): Promise<void> {
    if (!isLoginMode) {
      setIsLoading?.(true);
      const isRegistered = await userService.registerUser({
        username: usernmaeRef.current?.value || "",
        password: passwordRef.current?.value || "",
      } as UserCredentials);
      setIsLoading?.(false);

      if (isRegistered) setLoginMode(false);
      else alert("Registration failed. Please try a different username.");
    } else {
      setIsLoading?.(true);
      const user = await userService.loginUser({
        username: usernmaeRef.current?.value || "",
        password: passwordRef.current?.value || "",
      } as UserCredentials);
      setIsLoading?.(false);

      if (user) {
        setUserDetails?.(user);
        onSetIsUserLoggedIn(true);
      } else alert("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 z-30 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <div className="text-center font-bold text-xl mb-4">
          {isLoginMode ? "Sign In or Register" : "Register"}
        </div>
        <form className="space-y-4">
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none"
            type="text"
            placeholder="Username"
            autoComplete="on"
            ref={usernmaeRef}
          />
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none"
            type="password"
            placeholder="Password"
            autoComplete="on"
            ref={passwordRef}
          />
          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
            onClick={async () => await onLoginOrRegisterBtnClick()}
          >
            {isLoginMode ? "Login" : "Register"}
          </button>
        </form>
        <div className="mt-4 text-center text-gray-500 text-sm">
          {isLoginMode ? "Need an account?" : "Already have an account?"}
          <button
            type="button"
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => setLoginMode((prevState) => !prevState)}
          >
            {isLoginMode ? "Register" : " Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginRegisterModal;
