import { useAuth } from "@/contexts/AuthProvider";

export default function MyPage() {
  const { user } = useAuth();
  return (
    <>
      <>마이페이지</>
    </>
  );
}
