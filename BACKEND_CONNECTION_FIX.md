# Frontend Backend Connection Fix

## Issue
The frontend is getting "Failed to fetch" error because it's trying to connect to the production backend URL (`https://api.growwithgarry.in`) instead of your local backend running on `http://localhost:8082`.

## Solution
Create a `.env.local` file in the frontend directory to configure the local backend URL.

### Steps:
1. Create file: `c:\Users\abc\Desktop\nyaysetu\nyaysetu-platform\.env.local`
2. Add this content:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8082
```
3. Restart the Next.js dev server:
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Why This Works
The frontend code in [`route.ts`](file:///c:/Users/abc/Desktop/nyaysetu/nyaysetu-platform/app/api/query/route.ts#L14-L17) checks for `NEXT_PUBLIC_BACKEND_URL` environment variable:
```typescript
const backendBaseUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.PYTHON_BACKEND_URL ||
  'https://api.growwithgarry.in'; // Default fallback
```

By setting `NEXT_PUBLIC_BACKEND_URL=http://localhost:8082`, the frontend will connect to your local backend instead of the production URL.
