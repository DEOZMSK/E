export function isTrainersRoute(pathname: string | null): boolean {
  if (!pathname) {
    return false;
  }

  return pathname === "/trainers" || pathname.startsWith("/trainers/");
}
