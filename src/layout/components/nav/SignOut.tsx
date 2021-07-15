import { logout } from "@utils/requests";
import { useRouter } from "next/router";

export const SignOut: React.FC = ({ children }) => {
  const router = useRouter();

  return (
    <div
      title="Sign Out"
      onClick={() => {
        logout();
        router.push("/login");
      }}
    >
      {children}
    </div>
  );
};
