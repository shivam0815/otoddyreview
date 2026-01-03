import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { api } from "../lib/api";

function StarRating({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= value;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className="p-2 rounded-xl bg-white border border-sky-200 hover:bg-sky-50 transition focus:outline-none focus:ring-2 focus:ring-sky-400/40"
          >
            <Star
              className={`h-6 w-6 ${
                active
                  ? "text-sky-500 fill-sky-500"
                  : "text-sky-300"
              }`}
            />
          </button>
        );
      })}
      <span className="ml-2 text-sm font-medium text-slate-600">
        {value}/5
      </span>
    </div>
  );
}


function Select5({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-sm font-semibold text-slate-700 mb-2">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-xl border border-cyan-400/20 bg-[#071426] px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-400/40"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n} className="bg-[#071426]">
            {n}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function ReviewPage() {
  const nav = useNavigate();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [punctuality, setPunctuality] = useState(5);
  const [behaviour, setBehaviour] = useState(5);
  const [driving, setDriving] = useState(5);

  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (submitting) return;

    try {
      setSubmitting(true);
      setErr("");

      await api.post("/api/reviews/submit", {
        rating,
        comment,
        punctuality,
        behaviour,
        driving,
      });

      nav("/review/thanks");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Submit failed");
    } finally {
      setSubmitting(false);
    }
  }

 return (
  <main className="min-h-screen relative overflow-hidden">
    {/* 🔵 FULL BLUE / AQUA BACKGROUND */}
    <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-cyan-400 to-emerald-300" />

    {/* Soft glow layers */}
    <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
    <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-white/20 blur-3xl" />

    <section className="relative mx-auto max-w-2xl px-4 py-10">
      {/* CARD */}
      <div className="rounded-3xl bg-white/95 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
        {/* Header */}
       <div className="p-6 sm:p-8 border-b border-sky-100">
  <div className="flex items-center gap-3">
    {/* LOGO */}
    <img
      src="/logo.png"
      alt="Otoddy"
      className="h-10 w-10 rounded-xl object-contain"
    />

    <div className="flex-1">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
        Rate your ride
      </h1>
      <p className="mt-1 text-sm sm:text-base text-slate-600">
        Help Otoddy improve the driver experience
      </p>
    </div>

    <span className="text-xs text-slate-500">Otoddy</span>
  </div>
</div>


        <form onSubmit={submit} className="p-6 sm:p-8 space-y-6">
          {err && (
            <div className="rounded-2xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">
              {err}
            </div>
          )}

          {/* Overall Rating */}
          <div className="rounded-2xl border border-sky-200 bg-white p-4">

            <div className="text-sm font-semibold text-slate-700 mb-2">
              Overall rating
            </div>
            <StarRating value={rating} onChange={setRating} />
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select5 label="Punctuality" value={punctuality} onChange={setPunctuality} />
            <Select5 label="Behaviour" value={behaviour} onChange={setBehaviour} />
            <Select5 label="Driving" value={driving} onChange={setDriving} />
          </div>

          {/* Comment */}
          <div className="rounded-2xl border border-sky-200 bg-white p-4">

            <div className="text-sm font-semibold text-slate-700 mb-2">
              Comment (optional)
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              maxLength={600}
              placeholder="Share your experience…"
              className="w-full resize-none bg-transparent text-slate-900 placeholder:text-slate-400 outline-none"
            />
            <div className="mt-2 text-xs text-slate-500 flex justify-between">
              <span>Keep it short and helpful</span>
              <span>{comment.length}/600</span>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl px-4 py-3 font-bold text-white
                       bg-gradient-to-r from-sky-500 to-cyan-400
                       hover:from-sky-400 hover:to-cyan-300
                       active:scale-[0.99] transition
                       shadow-[0_12px_30px_rgba(14,165,233,0.45)]
                       disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit review"}
          </button>
        </form>
      </div>
    </section>
  </main>
);

}
