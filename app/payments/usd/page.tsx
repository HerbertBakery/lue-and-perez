import UsdContent from "./UsdContent";

// ensure this page is always dynamic (no caching)
export const dynamic = "force-dynamic";

export default function Page() {
  return <UsdContent />;
}
