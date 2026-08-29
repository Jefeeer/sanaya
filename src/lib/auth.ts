import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

/**
 * Auth.js (v5). Credentials + JWT sessions. role & organizationId ride on the
 * token so server components and API routes can authorize without a DB hit.
 * NOTE: authorization is always re-checked server-side per request — never
 * trust the client. See requireStaff/requireRole below.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (creds) => {
        const email = String(creds?.email ?? "").toLowerCase().trim();
        const password = String(creds?.password ?? "");
        if (!email || !password) return null;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          organizationId: user.organizationId,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.organizationId = user.organizationId;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
        session.user.organizationId = (token.organizationId as string | null) ?? null;
      }
      return session;
    },
  },
});

const STAFF_ROLES = ["SUPER_ADMIN", "ADMIN", "EVENT_COORDINATOR", "FINANCE"];

export function isStaff(role?: string | null): boolean {
  return !!role && STAFF_ROLES.includes(role);
}
