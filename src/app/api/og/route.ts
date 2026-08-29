import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "homepage";
  const name = searchParams.get("name") || "";
  const description = searchParams.get("description") || "";

  const fontRes = await fetch(
    "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.woff2"
  );
  const fontData = await fontRes.arrayBuffer();

  let title = "CodeLand";
  let subtitle = "The legendary developer platform";

  if (type === "repo") {
    title = name || "Repository";
    subtitle = description || "CodeLand";
  } else if (type === "profile") {
    title = name || "User";
    subtitle = description || "CodeLand";
  }

  const html = {
    type: "div" as const,
    props: {
      children: [
        {
          type: "div" as const,
          props: {
            children: [
              {
                type: "div" as const,
                props: {
                  children: [
                    {
                      type: "span" as const,
                      props: { children: "{}", style: { fontSize: "18px", color: "white", fontWeight: "bold" } },
                    },
                  ],
                  style: { width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg,#8b5cf6,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center" },
                },
              },
              {
                type: "span" as const,
                props: { children: "CodeLand", style: { fontSize: "24px", fontWeight: "bold", color: "white" } },
              },
            ],
            style: { position: "absolute", top: "40px", left: "60px", display: "flex", alignItems: "center", gap: "12px" },
          },
        },
        {
          type: "div" as const,
          props: {
            children: [
              {
                type: "div" as const,
                props: { children: title, style: { fontSize: "56px", fontWeight: "bold", color: "white", lineHeight: "1.1", marginBottom: "20px" } },
              },
              {
                type: "div" as const,
                props: { children: subtitle, style: { fontSize: "24px", color: "#9ca3af", maxWidth: "600px", lineHeight: "1.4" } },
              },
            ],
            style: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginTop: "20px" },
          },
        },
        {
          type: "div" as const,
          props: {
            children: [{ type: "span" as const, props: { children: "codeland.dev" } }],
            style: { position: "absolute", bottom: "40px", right: "60px", fontSize: "18px", color: "#6b7280" },
          },
        },
      ],
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0f",
        fontFamily: "Inter",
        padding: "60px",
        position: "relative",
      },
    },
  };

  return new ImageResponse(html as any, {
    width: 1200,
    height: 630,
    fonts: [{ name: "Inter", data: fontData, style: "normal" }],
  });
}
