import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, LogOut, Phone, Trash2, RefreshCw } from "lucide-react";
import type { Session } from "@supabase/supabase-js";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin Panel — Apex CT Scan & Maternity Centre" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

type Booking = {
  id: string;
  name: string;
  phone: string;
  age: number;
  gender: string;
  scan: string;
  status: string;
  created_at: string;
};

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s) {
        // defer the role check
        setTimeout(() => void checkRole(s.user.id), 0);
      } else {
        setIsAdmin(false);
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) void checkRole(data.session.user.id);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const checkRole = async (uid: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", uid)
      .eq("role", "admin")
      .maybeSingle();
    setIsAdmin(!!data);
  };

  if (loading) return <div className="p-10 text-center text-muted-foreground">Loading…</div>;
  if (!session) return <LoginForm />;
  if (!isAdmin) return <NotAdmin email={session.user.email ?? ""} />;
  return <Dashboard email={session.user.email ?? ""} />;
}

function LoginForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <div className="text-base font-semibold">Admin Panel</div>
            <div className="text-xs text-muted-foreground">Apex CT Scan & Maternity Centre</div>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email (ID)</Label>
            <Input id="email" type="email" value={email} required
              onChange={(e) => setEmail(e.target.value)} placeholder="drsinghkunal181@gmail.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} required minLength={6}
              onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Please wait…" : mode === "login" ? "Login" : "Create Account"}
          </Button>
          <button type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
            className="block w-full text-center text-xs text-muted-foreground hover:text-primary">
            {mode === "login" ? "First time? Create admin account" : "Already have an account? Login"}
          </button>
          <p className="text-xs text-muted-foreground text-center pt-2">
            Authorised admin: drsinghkunal181@gmail.com
          </p>
        </form>
        <a href="/" className="mt-6 block text-center text-xs text-muted-foreground hover:text-primary">← Back to website</a>
      </div>
    </div>
  );
}

function NotAdmin({ email }: { email: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-xl font-semibold">Access denied</h1>
        <p className="mt-2 text-muted-foreground">{email} is not an authorised admin account.</p>
        <Button className="mt-6" onClick={() => supabase.auth.signOut()}>Sign out</Button>
      </div>
    </div>
  );
}

function Dashboard({ email }: { email: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    setBookings((data ?? []) as Booking[]);
    setLoading(false);
  };

  useEffect(() => {
    void load();
    const ch = supabase
      .channel("bookings-feed")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, () => void load())
      .subscribe();
    return () => { void supabase.removeChannel(ch); };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    void load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this booking?")) return;
    await supabase.from("bookings").delete().eq("id", id);
    void load();
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">Admin Panel</div>
              <div className="text-xs text-muted-foreground">{email}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => void load()}>
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <Button size="sm" variant="outline" onClick={() => supabase.auth.signOut()}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Scan Bookings</h1>
            <p className="text-sm text-muted-foreground">{bookings.length} total · live updating</p>
          </div>
          <a href="/" className="text-sm text-primary hover:underline">View website →</a>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">Loading…</div>
        ) : bookings.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
            No bookings yet. New patient bookings will show here instantly.
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold">{b.name}</h3>
                      <StatusBadge status={b.status} />
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {b.age} yrs · {b.gender} · received {new Date(b.created_at).toLocaleString()}
                    </div>
                    <div className="mt-3 text-sm">
                      <div><span className="font-medium">Scan:</span> {b.scan}</div>
                      <div className="mt-1 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <a href={`tel:${b.phone}`} className="text-primary hover:underline">{b.phone}</a>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <select
                      value={b.status}
                      onChange={(e) => void updateStatus(b.id, e.target.value)}
                      className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <Button size="sm" variant="outline" onClick={() => void remove(b.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: "bg-primary/10 text-primary",
    contacted: "bg-amber-100 text-amber-800",
    confirmed: "bg-emerald-100 text-emerald-800",
    completed: "bg-slate-200 text-slate-800",
    cancelled: "bg-rose-100 text-rose-800",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${map[status] ?? "bg-secondary text-foreground"}`}>
      {status}
    </span>
  );
}
