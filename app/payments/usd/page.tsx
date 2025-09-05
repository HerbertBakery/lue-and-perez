import { Suspense } from "react";
import UsdContent from "./UsdContent";

export const dynamic = "force-dynamic"; // avoid prerender issues

export default function Page() {
  return (
    <Suspense fallback={null}>
      <UsdContent />
    </Suspense>
  );
}
