import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();

    if (!requestBody.userId || !requestBody.accessToken) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing userId or accessToken" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const urlGraphFacebook = `https://graph.facebook.com/v12.0/${requestBody.userId}?fields=id,name,picture,email&access_token=${requestBody.accessToken}`;
    const fbResponse = await fetch(urlGraphFacebook);

    if (!fbResponse.ok) {
      const fbError = await fbResponse.json();
      console.error("Facebook API error:", fbError);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to fetch user data from Facebook" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const fbData = await fbResponse.json();

    const backendPayload = {
      email: fbData.email,
      name: fbData.name,
      social_id: fbData.id,
      social_type: "facebook",
    };

    const authBackend = `${process.env.NEXT_PUBLIC_API_URL}auth/facebook/callback`;
    const backendResponse = await fetch(authBackend, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backendPayload),
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      console.error("Backend error:", errorData);
      return new Response(
        JSON.stringify({ success: false, error: "Backend authentication failed" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const backendData = await backendResponse.json();

    return new Response(JSON.stringify({ success: true, data: backendData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Social login error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
