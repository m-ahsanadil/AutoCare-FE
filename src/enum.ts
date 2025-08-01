// =======================
// USER & ROLES
// =======================
export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  MECHANIC = "mechanic",
  RECEPTIONIST = "receptionist",
  CUSTOMER = "customer",
}

export const UserRoleValues = Object.values(UserRole);
