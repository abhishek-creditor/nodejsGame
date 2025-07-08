import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3000";

function App() {
  const [step, setStep] = useState("register");
  const [user, setUser] = useState(null);
  const [section, setSection] = useState(null);
  const [selected, setSelected] = useState({}); // { [questionId]: selectedIdx }
  const [message, setMessage] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [submitResult, setSubmitResult] = useState(null);

  // Fetch leaderboard on load
  useEffect(() => {
    fetch(`${API_URL}/leaderboard`)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard fetch result:', data);
        setLeaderboard(data);
      })
      .catch((e) => {
        console.error('Leaderboard fetch error:', e);
        setLeaderboard([]);
      });
  }, []);

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
    setSubmitResult(null);
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

  // Handle answer selection (no immediate submit)
  const handleSelect = (questionId, selectedIdx) => {
    setSelected(prev => ({ ...prev, [questionId]: selectedIdx }));
  };

  // Submit all answers for the section
  const handleSubmitSection = async () => {
    if (!section) return;
    const answers = section.questions.map(q => ({
      questionId: q.id,
      selected: selected[q.id] !== undefined ? selected[q.id] : null
    }));
    const res = await fetch(`${API_URL}/quiz/submit-section`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        sectionId: section.id,
        answers
      })
    });
    const data = await res.json();
    setSubmitResult(data);
    // Optionally, refetch leaderboard
    fetch(`${API_URL}/leaderboard`).then(res => res.json()).then(setLeaderboard);
  };

  // Start next section
  const handleNextSection = () => {
    fetchSection(user.id);
  };

  // UI
  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Quiz Game</h1>
      {step === "register" && (
        <>
          <form onSubmit={handleRegister}>
            <h2>Register / Login</h2>
            <input name="name" placeholder="Name" required style={{ width: "100%", marginBottom: 8 }} />
            <input name="email" placeholder="Email" type="email" required style={{ width: "100%", marginBottom: 8 }} />
            <button type="submit" style={{ width: "100%" }}>Start</button>
          </form>
          <h2 style={{ marginTop: 32 }}>Leaderboard</h2>
          {!Array.isArray(leaderboard) ? (
            <p>Loading leaderboard...</p>
          ) : leaderboard.length === 0 ? (
            <p>No users or scores yet.</p>
          ) : (
            <ol>
              {leaderboard.map((s, i) => (
                <li key={i}>{s.username}: {s.xp} XP</li>
              ))}
            </ol>
          )}
        </>
      )}

      {step === "quiz" && user && (
        <div>
          <h2>Welcome, {user.name}!</h2>
          {section ? (
            <div>
              <h3>{section.title}</h3>
              {/* Section Progress Bar */}
              {section.sectionProgress && (
                <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
                  {section.sectionProgress.map((s, idx) => (
                    <div
                      key={s.sectionNumber}
                      style={{
                        flex: 1,
                        height: 16,
                        borderRadius: 8,
                        background: s.completed
                          ? "#4caf50"
                          : (section.number === s.sectionNumber ? "#2196f3" : "#eee"),
                        border: "1px solid #ccc",
                        transition: "background 0.3s"
                      }}
                      title={`Section ${s.sectionNumber}${s.completed ? ' (Completed)' : ''}`}
                    />
                  ))}
                </div>
              )}
              {/* Questions */}
              {section.questions.map((q, idx) => (
                <div key={q.id} style={{ marginBottom: 24, padding: 12, border: "1px solid #ccc", borderRadius: 8 }}>
                  <div>
                    <b>Q{idx + 1}:</b> {q.text}
                  </div>
                  <div>
                    {q.options.map((opt, i) => {
                      // After submit, show correct/incorrect
                      let bg = "#eee";
                      let isSelected = selected[q.id] === i;
                      if (submitResult && submitResult.answerResults) {
                        const ans = submitResult.answerResults.find(a => a.questionId === q.id);
                        if (ans) {
                          if (ans.selected === i) {
                            bg = ans.isCorrect ? "#c8f7c5" : "#f7c5c5";
                          }
                        }
                      } else if (isSelected) {
                        bg = "#d0e7ff";
                      }
                      return (
                        <button
                          key={opt.id}
                          disabled={!!submitResult}
                          style={{
                            margin: "6px 6px 0 0",
                            background: bg,
                            border: "1px solid #aaa",
                            borderRadius: 4,
                            padding: "6px 12px",
                            cursor: submitResult ? "not-allowed" : "pointer",
                            fontWeight: isSelected ? "bold" : "normal"
                          }}
                          onClick={() => handleSelect(q.id, i)}
                        >
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>
                  {submitResult && submitResult.answerResults && (
                    <div style={{ marginTop: 8 }}>
                      {(() => {
                        const ans = submitResult.answerResults.find(a => a.questionId === q.id);
                        if (!ans) return null;
                        return ans.isCorrect ? "✅ Correct!" : "❌ Incorrect.";
                      })()}
                    </div>
                  )}
                </div>
              ))}
              {/* Submit button or next section */}
              {!submitResult ? (
                <button
                  style={{ width: "100%", padding: 12, fontSize: 18, background: "#2196f3", color: "#fff", border: "none", borderRadius: 8 }}
                  onClick={handleSubmitSection}
                  disabled={Object.keys(selected).length !== section.questions.length}
                >
                  Submit Section
                </button>
              ) : (
                <div style={{ marginTop: 24 }}>
                  <h3>{submitResult.isNewHighscore ? "🎉 New Highscore!" : "Section Complete"}</h3>
                  <div>Score: {submitResult.score} XP</div>
                  <button
                    style={{ marginTop: 16, width: "100%", padding: 12, fontSize: 18, background: "#4caf50", color: "#fff", border: "none", borderRadius: 8 }}
                    onClick={handleNextSection}
                  >
                    Next Section
                  </button>
                </div>
              )}
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