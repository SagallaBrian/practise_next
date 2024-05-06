import { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h4>Authloayout</h4>
      {children}
    </div>
  );
}

export default AuthLayout;
