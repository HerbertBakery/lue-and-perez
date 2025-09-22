export const dynamic = "force-dynamic";

import { Suspense } from "react";
import PaymentsClient from "./PaymentsClient";

export default function PaymentsPage() {
  return (
    <Suspense fallback={<main className="max-w-3xl mx-auto py-10">Loading…</main>}>
      <PaymentsClient />
    </Suspense>
  );
}
