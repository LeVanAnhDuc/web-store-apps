// libs
import { jwtDecode } from "jwt-decode";
// types
import type { DecodedIdToken } from "@/types/User";
// stores
import { useAuthStore } from "@/stores";
// others
import { getInitials } from "@/utils";

const useUserInfo = () => {
  const idToken = useAuthStore((state) => state.tokens?.idToken);

  if (!idToken) return null;

  try {
    const payload = jwtDecode<DecodedIdToken>(idToken);
    const fullName = payload.name ?? payload.email;

    return {
      email: payload.email,
      fullName,
      avatar: payload.picture ?? null,
      initials: getInitials(fullName)
    };
  } catch {
    return null;
  }
};

export default useUserInfo;
