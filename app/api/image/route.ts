import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const prompt = formData.get("prompt") as string;
    const imageFile = formData.get("image") as File | null;

    const apiKey = process.env.STABILITY_API_KEY; // ya STABILITY_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: "STABILITY_API_KEY is not configured." },
        { status: 500 }
      );
    }

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Image prompt is required." },
        { status: 400 }
      );
    }

    // Stability AI ke liye naya FormData
    const stabilityForm = new FormData();
    stabilityForm.append("prompt", prompt);
    stabilityForm.append("init_image_mode", "IMAGE_STRENGTH");
    stabilityForm.append("image_strength", "0.35"); // 0.2 = halka, 0.6 = zyada change
    stabilityForm.append("output_format", "png");

    // Agar photo upload hui hai to edit karo, nahi to nayi banao
    if (imageFile) {
      stabilityForm.append("init_image", imageFile);
    }

    const response = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json", // v1 endpoint json return karta hai
        },
        body: stabilityForm,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Stability error:", errorText);
      return NextResponse.json(
        { error: "Image generation failed." },
        { status: response.status }
      );
    }

    const result = await response.json();
    const base64Image = result.artifacts[0].base64;

    // Frontend ko base64 me bhejte hain taaki direct <img> me lag jaye
    return NextResponse.json({
      image: `data:image/png;base64,${base64Image}`,
    });
  } catch (error) {
    console.error("Image API error:", error);
    return NextResponse.json(
      { error: "Something went wrong while generating the image." },
      { status: 500 }
    );
  }
}