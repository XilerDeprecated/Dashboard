import Link from "next/link";
import { useRouter } from "next/router";

export const Main: React.FC = () => {
  const router = useRouter();

  return (
    <div>
      Dashboard
      <Link href="/login">
        <a>Sign in</a>
      </Link>
      <button onClick={() => router.push("/login")}>Sign out</button>
    </div>
  );
};
export default Main;
