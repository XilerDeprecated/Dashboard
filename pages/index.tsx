import Link from "next/link";

export const Main: React.FC = () => {
  return (
    <div>
      Dashboard
      <Link href="/login">
        <a>Sign in</a>
      </Link>
    </div>
  );
};
export default Main;
