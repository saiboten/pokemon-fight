type Routes = Record<string, string | { href: string; protected: boolean }>;

export const advancedRoutes = {
  overview: "/overview",
  admin: {
    href: "/admin",
    protected: true,
  },
  details: "/pokemon/:id",
} as const satisfies Routes;

advancedRoutes.admin.href;
advancedRoutes.overview;
