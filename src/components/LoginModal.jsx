import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
      } else {
        onLogin(data); // Pass user object to parent
        setName("");
        setEmail("");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  const canSubmit = name.trim() !== "" && email.trim() !== "";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gradient-to-b from-slate-900 to-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-cyan-300">
            🏈 Welcome to Creditor Football
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white font-medium mb-2 block">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-400"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-white font-medium mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-400"
              />
            </div>
          </div>
          {error && <div className="text-red-400 text-center">{error}</div>}
          <Button
            type="submit"
            disabled={!canSubmit || loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed py-3 text-lg font-semibold"
          >
            {loading ? "Starting..." : "Start Game"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 