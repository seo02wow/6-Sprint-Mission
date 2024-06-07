import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "@/lib/axios";
import { LoginValues } from "@/types/login";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

interface AuthContextType {
  user: any;
  login: (values: LoginValues) => Promise<void>;
  isPending: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  isPending: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [values, setValues] = useState({
    user: null,
    isPending: true,
  });

  async function getMe() {
    setValues((prevValues) => ({
      ...prevValues,
      isPending: true,
    }));
    let nextUser: any;
    try {
      const res = await axios.get("/users/me");
      nextUser = res.data;
    } catch (e: any) {
      if (e.response?.status === 401) {
        console.log("토큰만료");
        return;
      }
    } finally {
      setValues((prevValues) => ({
        ...prevValues,
        user: nextUser,
        isPending: false,
      }));
    }
  }

  async function login({ email, password }: LoginValues) {
    try {
      const response = await axios.post("/auth/signIn", {
        email,
        password,
      });
      const { accessToken, refreshToken } = response.data;
      setCookie("accessToken", accessToken, { maxAge: 60 * 60 * 24 });
      setCookie("refreshToken", refreshToken, { maxAge: 60 * 60 * 24 });
      await getMe();
    } catch (e) {}
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: values.user, isPending: values.isPending, login }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required?: boolean) {
  const context = useContext(AuthContext);
  const router = useRouter();
  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  useEffect(() => {
    if (required && context.user && !context.isPending) {
      router.push("/login");
    }
  }, [context.user, context.isPending, required, router]);

  return context;
}
