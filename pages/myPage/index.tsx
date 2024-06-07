import { useAuth } from "@/contexts/AuthProvider";

export default function MyPage() {
  const { user } = useAuth(true);
  return (
    <>
      <>마이페이지</>
    </>
  );
}
