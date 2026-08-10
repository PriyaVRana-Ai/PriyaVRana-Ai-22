import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const apiKey = process.env.STABILITY_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "STABILITY_API_KEY is not configured.",
        },
        { status: 500 }
      );
    }

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        {
          error: "Image prompt is required.",
        },
        { status: 400 }
      );
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("output_format", "png");

    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "image/*",
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error("Stability error:", errorText);

      return NextResponse.json(
        {
          error: "Image generation failed.",
        },
        { status: response.status }
      );
    }

    const imageBuffer = await response.arrayBuffer();

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Image API error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while generating the image.",
      },
      { status: 500 }
    );
  }
}