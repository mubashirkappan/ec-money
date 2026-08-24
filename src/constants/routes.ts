export const ROUTES = {
  LOGIN: {
    path: "/login",
    userType: "all",
    displayName: "Login"
  },
  
  FORGOT_PASSWORD: {
    path: "/fogot-password",
    userType: "all",
    displayName: "Fogot Password"
  },

  USER_DASHBAORD: {
    path: "/user-dashboard",
    userType: "user",
    displayName: "User Dashboard"
  },

  ADMIN_DASHBAORD: {
    path: "/admin-dashboard",
    userType: "admin",
    displayName: "Admin Dashboard"
  },

  CUSTOMERS: {
    path: "/customers",
    userType: "admin",
    displayName: "Customers"
  },

  WALLET_CREDIT: {
    path: "/wallet-credit",
    userType: "admin",
    displayName: "Wallet Credit"
  },

  SEND_MONEY: {
    path: "/send-money",
    userType: "user",
    displayName: "Send Money"
  },

  BENEFICIARY: {
    path: "/beneficiary",
    userType: "user",
    displayName: "Beneficiaries"
  },

  TRANSACTIONS: {
    path: "/transactions",
    userType: "user",
    displayName: "Transactions"
  },

  SETTINGS: {
    path: "/settings",
    userType: "all",
    displayName: "Settings"
  },

  PROFILE: {
    path: "/profile",
    userType: "all",
    displayName: "Profile"
  },

} as const;