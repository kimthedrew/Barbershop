import { useState } from "react";

export default function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: POST review to /reviews
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Submit Review</h2>
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="input w-full mb-3"
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>{r} Stars</option>
        ))}
      </select>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment"
        className="input w-full mb-3"
      />
      <button className="btn w-full">Submit Review</button>
    </form>
  );
}
