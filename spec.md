# Specification

## Summary
**Goal:** Fix the broken user registration flow so new users can successfully register with a username and password.

**Planned changes:**
- Fix the backend Motoko `registerUser` function to correctly store credentials and return a success result without errors or canister traps
- Ensure duplicate username attempts return an appropriate error response (not a trap), while keeping `Akgamer4354` blocked from registration
- Fix the frontend `Registration.tsx` and `useQueries.ts` registration hook to correctly handle backend responses
- Display specific, readable error messages for known errors (e.g., username already taken) and user-friendly messages for network/canister errors
- Redirect users to the login page upon successful registration
- Disable the registration button while the request is in-flight to prevent duplicate submissions

**User-visible outcome:** New users can register with a username and password without seeing "Registration failed. Please try again." — successful registration redirects to the login page, and meaningful error messages are shown for issues like duplicate usernames.
