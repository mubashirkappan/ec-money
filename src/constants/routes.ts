export const ROUTES = {
  // COMMON STARTS
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

  DASHBAORD: {
    path: "/dashboard",
    userType: "all",
    displayName: "Dashboard"
  },
  // COMMON ENDS

  // ADMIN STARTS
  CUSTOMERS: {
    path: "/customers",
    userType: "admin",
    displayName: "Customers"
  },

  WALLET_CREDIT: {
    path: "/wallet-credit",
    userType: "admin",
    displayName: "Wallet Credits"
  },
  // ADMIN ENDS

  // USER STARTS
  SEND_MONEY: {
    path: "/payment",
    userType: "user",
    displayName: "Send Money"
  },

  BENEFICIARY: {
    path: "/beneficiaries",
    userType: "user",
    displayName: "Beneficiaries"
  },

  TRANSACTIONS: {
    path: "/transactions",
    userType: "user",
    displayName: "Transactions"
  },
  // USER ENDS

} as const;