import { Suspense } from "react";
import UsdContent from "./UsdContent";

export const dynamic = "force-dynamic"; // avoids prerender issues

export default function Page() {
  return (
    <Suspense fallback={null}>
      <UsdContent />
    </Suspense>
  );
}
