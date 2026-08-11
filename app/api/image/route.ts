import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const prompt = formData.get("prompt");
    const imageFile = formData.get("image");

    const apiKey = process.env.STABILITY_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "STABILITY_API_KEY is not configured." },
        { status: 500 }
      );
    }

    if (typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { error: "Image prompt is required." },
        { status: 400 }
      );
    }

    if (!(imageFile instanceof File)) {
      return NextResponse.json(
        { error: "Image is required." },
        { status: 400 }
      );
    }

    const stabilityForm = new FormData();

    stabilityForm.append("prompt", prompt);
    stabilityForm.append("image", imageFile);
    stabilityForm.append("strength", "0.35");
    stabilityForm.append("mode", "image-to-image");
    stabilityForm.append("output_format", "png");

    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/sd3",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "image/*",
        },
        body: stabilityForm,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error("Stability API error:", errorText);

      return NextResponse.json(
        {
          error: "Image generation failed.",
          details: errorText,
        },
        { status: response.status }
      );
    }

    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    return NextResponse.json({
      image: `data:image/png;base64,${base64Image}`,
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