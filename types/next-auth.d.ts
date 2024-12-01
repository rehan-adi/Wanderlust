import { Session } from "next-auth";
import { User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      image: string | null;
    };
  }

  interface JWT {
    id: string;
  }
}
