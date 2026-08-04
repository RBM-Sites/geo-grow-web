import { useState, useEffect } from "react";

export default function GoogleReviews({
  placeId,
  apiBase,
  layout = "carousel",
  theme = "light",
  accent = "#4285F4",
  minRating = 1,
  maxReviews = 5,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!placeId || !apiBase) return;
    let cancelled = false;
    fetch(`${apiBase}?place_id=${placeId}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setData(d.result);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [placeId, apiBase]);

  const bg = theme === "dark" ? "#111827" : "#f9fafb";
  const cardBg = theme === "dark" ? "#1f2937" : "#fff";
  const text = theme === "dark" ? "#f3f4f6" : "#1f2937";
  const sub = theme === "dark" ? "#9ca3af" : "#6b7280";
  const border = theme === "dark" ? "#374151" : "#e5e7eb";
  const empty = "#d1d5db";

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "24px", color: sub, background: bg }}>
        Loading reviews...
      </div>
    );
  }
  if (!data) return null;

  const reviews = (data.reviews || [])
    .filter((r) => r.rating >= minRating)
    .slice(0, maxReviews);

  const Star = ({ filled }) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? accent : "none"}
      stroke={filled ? accent : empty}
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.35l-5.81 3.05 1.11-6.47-4.7-4.58 6.5-.95L12 2.5z" />
    </svg>
  );

  const StarRow = ({ value }) => (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} filled={i <= Math.round(value || 0)} />
      ))}
    </div>
  );

  const initials = (name) =>
    (name || "")
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const ReviewCard = ({ review }) => (
    <div
      style={{
        background: cardBg,
        border: `1px solid ${border}`,
        borderRadius: "8px",
        padding: "16px",
        minWidth: "280px",
        maxWidth: "340px",
        flex: "1 1 280px",
        scrollSnapAlign: "start",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            minWidth: "36px",
            borderRadius: "9999px",
            background: accent,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {initials(review.author_name)}
        </div>
        <div>
          <p style={{ margin: 0, color: text, fontSize: "14px", fontWeight: 500 }}>
            {review.author_name}
          </p>
          <p style={{ margin: 0, color: sub, fontSize: "12px" }}>
            {review.relative_time_description}
          </p>
        </div>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <StarRow value={review.rating} />
      </div>
      <p style={{ margin: 0, color: sub, fontSize: "14px", lineHeight: 1.5 }}>{review.text}</p>
    </div>
  );

  return (
    <div style={{ background: bg, borderRadius: "8px", padding: "8px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <span style={{ color: text, fontSize: "30px", fontWeight: 700, lineHeight: 1 }}>
          {data.rating}
        </span>
        <StarRow value={data.rating} />
        <span style={{ color: sub, fontSize: "14px" }}>({data.user_ratings_total} reviews)</span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
          overflowX: layout === "carousel" ? "auto" : "visible",
          flexWrap: layout === "carousel" ? "nowrap" : "wrap",
          scrollSnapType: "x mandatory",
          padding: "4px",
          justifyContent: "flex-start",
        }}
      >
        {reviews.map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
      </div>

      <p style={{ textAlign: "center", color: sub, fontSize: "12px", margin: "16px 0 0" }}>
        Powered by Google Reviews
      </p>
    </div>
  );
}
