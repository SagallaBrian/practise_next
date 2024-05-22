import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthIndex() {
  // Option 2: Client-side redirect as a fallback
  const router = useRouter();

  useEffect(() => {
    router.replace('/auth/login');
  }, [router]);

  return null;
}
