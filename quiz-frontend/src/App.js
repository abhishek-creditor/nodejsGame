import React, { useState } from "react";

const API_URL = "http://localhost:3000";

function App() {
  const [step, setStep] = useState("register");
  const [user, setUser] = useState(null);
  const [section, setSection] = useState(null);
  const [selected, setSelected] = useState({});
  const [message, setMessage] = useState("");

  // Register or login
  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const res = await fetch(`${API_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const data = await res.json();
    setUser(data);
    setStep("quiz");
    fetchSection(data.id);
  };

  // Fetch current section
  const fetchSection = async (userId) => {
    setMessage("");
    const res = await fetch(`${API_URL}/quiz/current?userId=${userId}`);
    if (res.ok) {
      const data = await res.json();
      setSection(data);
      setSelected({});
    } else {
      setSection(null);
      setMessage("No unlocked section found or you have completed all sections!");
    }
  };

  // Submit answer
  const handleAnswer = async (questionId, selectedIdx) => {
    const res = await fetch(`${API_URL}/quiz/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        questionId,
        selected: selectedIdx,
      }),
    });
    const data = await res.json();
    setSelected((prev) => ({ ...prev, [questionId]: { selectedIdx, correct: data.correct } }));
    if (data.correct) {
      setMessage("Correct! XP awarded.");
      // Refetch section to check for unlock
      setTimeout(() => fetchSection(user.id), 1000);
    } else {
      setMessage("Incorrect. Try the next question.");
    }
  };

  // UI
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Quiz Game</h1>
      {step === "register" && (
        <form onSubmit={handleRegister}>
          <h2>Register / Login</h2>
          <input name="name" placeholder="Name" required style={{ width: "100%", marginBottom: 8 }} />
          <input name="email" placeholder="Email" type="email" required style={{ width: "100%", marginBottom: 8 }} />
          <button type="submit" style={{ width: "100%" }}>Start</button>
        </form>
      )}

      {step === "quiz" && user && (
        <div>
          <h2>Welcome, {user.name}!</h2>
          {section ? (
            <div>
              <h3>{section.title}</h3>
              {section.questions.map((q, idx) => (
                <div key={q.id} style={{ marginBottom: 24, padding: 12, border: "1px solid #ccc", borderRadius: 8 }}>
                  <div>
                    <b>Q{idx + 1}:</b> {q.text}
                  </div>
                  <div>
                    {q.options.map((opt, i) => (
                      <button
                        key={opt.id}
                        disabled={selected[q.id]}
                        style={{
                          margin: "6px 6px 0 0",
                          background: selected[q.id]?.selectedIdx === i
                            ? (selected[q.id]?.correct ? "#c8f7c5" : "#f7c5c5")
                            : "#eee",
                          border: "1px solid #aaa",
                          borderRadius: 4,
                          padding: "6px 12px",
                          cursor: selected[q.id] ? "not-allowed" : "pointer"
                        }}
                        onClick={() => handleAnswer(q.id, i)}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                  {selected[q.id] && (
                    <div style={{ marginTop: 8 }}>
                      {selected[q.id].correct ? "✅ Correct!" : "❌ Incorrect."}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>{message || "Loading section..."}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;