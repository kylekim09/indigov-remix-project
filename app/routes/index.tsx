import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Indigov Project" },
    { name: "Kyle Kim's Indigov Takehome", content: "Welcome to Indigov!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Kyle Kim's Take Home Project</h1>
      <Link to="constituents/upload">Upload Constituents</Link>
    </div>
  );
}
