type Item = {
  question: string;
  answer: string;
};

export default function FaqList({ items }: { items: Item[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details
          key={item.question}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <summary className="cursor-pointer list-none font-semibold text-slate-900">
            {item.question}
          </summary>
          <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
