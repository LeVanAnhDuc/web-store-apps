// libs
import { jwtDecode } from "jwt-decode";
// stores
import { useAuthStore } from "@/stores";
// others
import { getInitials } from "@/utils";

interface DecodedIdToken {
  userId: string;
  authId: string;
  email: string;
  roles: string;
  fullName: string;
  avatar?: string | null;
}

export interface UserInfo {
  email: string;
  fullName: string;
  avatar?: string | null;
  initials: string;
}

const useUserInfo = (): UserInfo | null => {
  const idToken = useAuthStore((state) => state.tokens?.idToken);

  if (!idToken) return null;

  try {
    const payload = jwtDecode<DecodedIdToken>(idToken);

    return {
      email: payload.email,
      fullName: payload.fullName,
      avatar: payload.avatar,
      initials: getInitials(payload.fullName)
    };
  } catch {
    return null;
  }
};

export default useUserInfo;
