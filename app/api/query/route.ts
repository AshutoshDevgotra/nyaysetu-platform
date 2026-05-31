
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { query } = await req.json();

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      return NextResponse.json(
        { error: "Backend URL not configured" },
        { status: 500 }
      );
    }

    const targetUrl = backendUrl.endsWith("/") ? `${backendUrl}ask` : `${backendUrl}/ask`;

    console.log(`Forwarding query to: ${targetUrl}`);

    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      attempt++;
      try {
        const apiRes = await fetch(targetUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: query }),
        });

        if (!apiRes.ok) {
          const errorText = await apiRes.text();
          let isRateLimit = apiRes.status === 429 || apiRes.status === 503;

          // Check for backend-returned JSON error indicating rate limit
          try {
            const errorJson = JSON.parse(errorText);
            if (errorJson.error && (
              String(errorJson.error).includes("429") ||
              String(errorJson.error).toLowerCase().includes("quota exceeded")
            )) {
              isRateLimit = true;
            }
          } catch {
            // Not JSON, ignore
          }

          if (isRateLimit && attempt < maxRetries) {
            const delay = Math.pow(2, attempt) * 1000; // Exponential backoff: 2s, 4s, 8s...
            console.warn(`Attempt ${attempt} failed with rate limit. Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }

          console.error("Backend error:", errorText);

          // Forward the status code and error if possible
          return NextResponse.json(
            // Try to return the parsed JSON if available, otherwise raw text
            (() => {
              try { return JSON.parse(errorText) }
              catch { return { error: `Backend error: ${apiRes.status} ${apiRes.statusText}`, details: errorText } }
            })(),
            { status: apiRes.status }
          );
        }

        const data = await apiRes.json();
        return NextResponse.json(data);

      } catch (innerError) {
        console.error(`Attempt ${attempt} network error:`, innerError);
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        throw innerError;
      }
    }
  } catch (error) {
    console.error("API Proxy Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
