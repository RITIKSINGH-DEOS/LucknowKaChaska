// ========================================================
// File: src/lib/auth-config.ts
// Purpose: Admin Login Credentials Configuration
//
// 📌 RITIK: Aap yahan se apna Email aur Password kabhi bhi
//    manually change kar sakte hain. Kisi aur file ko
//    chhedne ki zaroorat nahi hai!
// ========================================================

export const ADMIN_CREDENTIALS = {
  // Aapka Admin Email yahan likhein:
  email: process.env.ADMIN_EMAIL || "businessritiksinghdeos@gmail.com",

  // Aapka Admin Password yahan likhein:
  password: process.env.ADMIN_PASSWORD || "Confirmr450",
};

/**
 * Validates provided credentials against configured master credentials.
 */
export function verifyCredentials(emailInput: string, passwordInput: string): boolean {
  const cleanEmail = emailInput.trim().toLowerCase();
  const cleanPassword = passwordInput.trim();

  return (
    cleanEmail === ADMIN_CREDENTIALS.email.trim().toLowerCase() &&
    cleanPassword === ADMIN_CREDENTIALS.password.trim()
  );
}
