import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const promptValue = formData.get("prompt");
    const imageFile = formData.get("image");

    if (typeof promptValue !== "string" || !promptValue.trim()) {
      return NextResponse.json(
        { error: "Image prompt is required." },
        { status: 400 }
      );
    }

    const prompt = promptValue.trim();

    const apiKey = process.env.POLLINATIONS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "POLLINATIONS_API_KEY is not configured.",
        },
        { status: 500 }
      );
    }

    /*
     * Text-to-image
     */
    if (!(imageFile instanceof File)) {
      const imageUrl =
        `https://gen.pollinations.ai/image/` +
        `${encodeURIComponent(prompt)}` +
        `?model=flux&width=1024&height=1024`;

      const response = await fetch(imageUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();

        console.error(
          "Pollinations image error:",
          errorText
        );

        return NextResponse.json(
          {
            error: "Image generation failed.",
            details: errorText,
          },
          { status: response.status }
        );
      }

      const imageBuffer = await response.arrayBuffer();

      const base64Image =
        Buffer.from(imageBuffer).toString("base64");

      const contentType =
        response.headers.get("content-type") ||
        "image/png";

      return NextResponse.json({
        image: `data:${contentType};base64,${base64Image}`,
      });
    }

    /*
     * Reference-image editing
     *
     * Pollinations supports image inputs for
     * image-capable models. We first convert the
     * uploaded file to a data URL.
     */
    const imageBuffer = await imageFile.arrayBuffer();

    const base64Input =
      Buffer.from(imageBuffer).toString("base64");

    const inputContentType =
      imageFile.type || "image/png";

    const imageDataUrl =
      `data:${inputContentType};base64,${base64Input}`;

    const editResponse = await fetch(
      "https://gen.pollinations.ai/v1/images/edits",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "kontext",
          prompt,
          image: imageDataUrl,
        }),
      }
    );

    if (!editResponse.ok) {
      const errorText = await editResponse.text();

      console.error(
        "Pollinations edit error:",
        errorText
      );

      return NextResponse.json(
        {
          error: "Image editing failed.",
          details: errorText,
        },
        { status: editResponse.status }
      );
    }

    const editData = await editResponse.json();

    /*
     * Different API responses can expose the generated
     * image as a URL or base64 data.
     */
    const generatedImage =
      editData?.data?.[0]?.url ||
      editData?.data?.[0]?.b64_json ||
      editData?.image ||
      editData?.url;

    if (!generatedImage) {
      console.error(
        "Unexpected Pollinations response:",
        editData
      );

      return NextResponse.json(
        {
          error: "AI ne image return nahi ki.",
        },
        { status: 500 }
      );
    }

    if (generatedImage.startsWith("data:")) {
      return NextResponse.json({
        image: generatedImage,
      });
    }

    if (generatedImage.startsWith("http")) {
      const generatedResponse =
        await fetch(generatedImage);

      if (!generatedResponse.ok) {
        throw new Error(
          "Generated image download failed."
        );
      }

      const generatedBuffer =
        await generatedResponse.arrayBuffer();

      const generatedType =
        generatedResponse.headers.get("content-type") ||
        "image/png";

      const generatedBase64 =
        Buffer.from(generatedBuffer).toString("base64");

      return NextResponse.json({
        image:
          `data:${generatedType};base64,${generatedBase64}`,
      });
    }

    return NextResponse.json({
      image: `data:image/png;base64,${generatedImage}`,
    });
  } catch (error) {
    console.error("Image API error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while generating the image.",
      },
      { status: 500 }
    );
  }
}