export default function RequestedPrCard({ requestedCount = 0 }) {
  return (
    <section className="border rounded-xl p-4 h-full flex flex-col">
      <h2 className="font-bold text-2xl pb-3">Requested PR</h2>

      <div className="flex items-end justify-between">
        <div className="text-lg text-gray-500">How many?</div>
        <div className="text-3xl font-bold">{requestedCount}</div>
      </div>
    </section>
  );
}
