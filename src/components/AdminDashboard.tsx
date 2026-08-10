"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Song } from "@/lib/types";

const MAX_AUDIO_MB = 25;
const MAX_ARTWORK_MB = 5;

export default function AdminDashboard() {
  const supabase = createClient();
  const router = useRouter();

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [artworkFile, setArtworkFile] = useState<File | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editArtist, setEditArtist] = useState("");

  async function loadSongs() {
    setLoading(true);
    const { data } = await supabase.from("songs").select("*").order("sort_order", { ascending: true });
    setSongs((data as Song[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadSongs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  function resetForm() {
    setTitle("");
    setArtist("");
    setAudioFile(null);
    setArtworkFile(null);
    const audioInput = document.getElementById("audioInput") as HTMLInputElement | null;
    const artworkInput = document.getElementById("artworkInput") as HTMLInputElement | null;
    if (audioInput) audioInput.value = "";
    if (artworkInput) artworkInput.value = "";
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!audioFile || !title.trim() || !artist.trim()) {
      setFormError("An audio file, title, and artist are all required.");
      return;
    }
    if (!audioFile.type.startsWith("audio/")) {
      setFormError("That file doesn't look like an audio file.");
      return;
    }
    if (audioFile.size > MAX_AUDIO_MB * 1024 * 1024) {
      setFormError(`Audio files must be under ${MAX_AUDIO_MB}MB.`);
      return;
    }
    if (artworkFile) {
      if (!artworkFile.type.startsWith("image/")) {
        setFormError("Artwork must be an image file.");
        return;
      }
      if (artworkFile.size > MAX_ARTWORK_MB * 1024 * 1024) {
        setFormError(`Artwork must be under ${MAX_ARTWORK_MB}MB.`);
        return;
      }
    }

    setUploading(true);
    try {
      const safeName = (name: string) => name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const audioPath = `${Date.now()}-${safeName(audioFile.name)}`;

      const { error: audioErr } = await supabase.storage.from("audio").upload(audioPath, audioFile);
      if (audioErr) throw audioErr;
      const audioUrl = supabase.storage.from("audio").getPublicUrl(audioPath).data.publicUrl;

      let artworkUrl: string | null = null;
      if (artworkFile) {
        const artworkPath = `${Date.now()}-${safeName(artworkFile.name)}`;
        const { error: artErr } = await supabase.storage.from("artwork").upload(artworkPath, artworkFile);
        if (artErr) throw artErr;
        artworkUrl = supabase.storage.from("artwork").getPublicUrl(artworkPath).data.publicUrl;
      }

      const nextOrder = songs.length ? Math.max(...songs.map((s) => s.sort_order)) + 1 : 0;

      const { error: insertErr } = await supabase.from("songs").insert({
        title: title.trim(),
        artist: artist.trim(),
        audio_url: audioUrl,
        artwork_url: artworkUrl,
        sort_order: nextOrder,
      });
      if (insertErr) throw insertErr;

      resetForm();
      await loadSongs();
    } catch (err: any) {
      setFormError(err.message ?? "Something went wrong during upload.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(song: Song) {
    if (!confirm(`Delete "${song.title}"? This can't be undone.`)) return;
    await supabase.from("songs").delete().eq("id", song.id);
    setSongs((prev) => prev.filter((s) => s.id !== song.id));
  }

  function startEdit(song: Song) {
    setEditingId(song.id);
    setEditTitle(song.title);
    setEditArtist(song.artist);
  }

  async function saveEdit(song: Song) {
    await supabase.from("songs").update({ title: editTitle.trim(), artist: editArtist.trim() }).eq("id", song.id);
    setEditingId(null);
    await loadSongs();
  }

  async function move(song: Song, direction: -1 | 1) {
    const sorted = [...songs].sort((a, b) => a.sort_order - b.sort_order);
    const i = sorted.findIndex((s) => s.id === song.id);
    const j = i + direction;
    if (j < 0 || j >= sorted.length) return;
    const other = sorted[j];

    await Promise.all([
      supabase.from("songs").update({ sort_order: other.sort_order }).eq("id", song.id),
      supabase.from("songs").update({ sort_order: song.sort_order }).eq("id", other.id),
    ]);
    await loadSongs();
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.h1}>Admin Dashboard</h1>
        <button onClick={handleLogout} style={s.logoutBtn}>Log out</button>
      </div>

      <form onSubmit={handleUpload} style={s.card}>
        <h2 style={s.h2}>Upload New Song</h2>

        <label style={s.label}>
          Audio file
          <input id="audioInput" type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)} style={s.fileInput} />
        </label>

        <label style={s.label}>
          Song title
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={s.input} />
        </label>

        <label style={s.label}>
          Artist
          <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} style={s.input} />
        </label>

        <label style={s.label}>
          Artwork (optional)
          <input id="artworkInput" type="file" accept="image/*" onChange={(e) => setArtworkFile(e.target.files?.[0] ?? null)} style={s.fileInput} />
        </label>

        {formError && <p style={s.error}>{formError}</p>}

        <button type="submit" disabled={uploading} style={s.button}>
          {uploading ? "Uploading…" : "Upload Song"}
        </button>
      </form>

      <div style={s.card}>
        <h2 style={s.h2}>Songs</h2>
        {loading ? (
          <p style={s.dim}>Loading…</p>
        ) : songs.length === 0 ? (
          <p style={s.dim}>No songs uploaded yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {songs.map((song, i) => (
              <li key={song.id} style={s.row}>
                {editingId === song.id ? (
                  <div style={{ display: "flex", gap: 8, flex: 1, flexWrap: "wrap" }}>
                    <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={{ ...s.input, marginTop: 0, flex: 1 }} />
                    <input value={editArtist} onChange={(e) => setEditArtist(e.target.value)} style={{ ...s.input, marginTop: 0, flex: 1 }} />
                    <button onClick={() => saveEdit(song)} style={s.smallBtn}>Save</button>
                    <button onClick={() => setEditingId(null)} style={s.smallBtnGhost}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <span style={s.rowText}>
                      {i + 1}. {song.title} — {song.artist}
                    </span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => move(song, -1)} style={s.smallBtnGhost} aria-label="Move up" disabled={i === 0}>↑</button>
                      <button onClick={() => move(song, 1)} style={s.smallBtnGhost} aria-label="Move down" disabled={i === songs.length - 1}>↓</button>
                      <button onClick={() => startEdit(song)} style={s.smallBtnGhost}>Edit</button>
                      <button onClick={() => handleDelete(song)} style={s.smallBtnDanger}>Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#241209",
    color: "#f3e6d2",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    padding: "28px 20px 60px",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 640, margin: "0 auto 20px" },
  h1: { fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: 24, margin: 0 },
  h2: { fontSize: 15, letterSpacing: 0.4, textTransform: "uppercase", opacity: 0.75, margin: "0 0 16px" },
  card: {
    maxWidth: 640,
    margin: "0 auto 20px",
    background: "#3d2418",
    border: "1px solid rgba(243,230,210,.12)",
    borderRadius: 16,
    padding: 22,
  },
  label: { display: "block", fontSize: 12.5, marginBottom: 14, opacity: 0.85 },
  input: {
    display: "block", width: "100%", marginTop: 6, padding: "10px 12px", borderRadius: 8,
    border: "1px solid rgba(243,230,210,.2)", background: "#241209", color: "#f3e6d2", fontSize: 14,
  },
  fileInput: { display: "block", width: "100%", marginTop: 6, fontSize: 13 },
  error: { color: "#e2703a", fontSize: 13, margin: "0 0 14px" },
  dim: { opacity: 0.6, fontSize: 14 },
  button: {
    padding: "10px 20px", borderRadius: 10, border: "none",
    background: "linear-gradient(180deg,#e8c168,#caa24a)", color: "#241209",
    fontWeight: 600, fontSize: 14, cursor: "pointer",
  },
  logoutBtn: {
    padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(243,230,210,.25)",
    background: "transparent", color: "#f3e6d2", fontSize: 13, cursor: "pointer",
  },
  row: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    gap: 10, padding: "10px 0", borderBottom: "1px solid rgba(243,230,210,.08)",
  },
  rowText: { fontSize: 14 },
  smallBtn: {
    padding: "6px 12px", borderRadius: 6, border: "none",
    background: "#caa24a", color: "#241209", fontSize: 12.5, cursor: "pointer",
  },
  smallBtnGhost: {
    padding: "6px 10px", borderRadius: 6, border: "1px solid rgba(243,230,210,.25)",
    background: "transparent", color: "#f3e6d2", fontSize: 12.5, cursor: "pointer",
  },
  smallBtnDanger: {
    padding: "6px 10px", borderRadius: 6, border: "1px solid rgba(226,112,58,.5)",
    background: "transparent", color: "#e2703a", fontSize: 12.5, cursor: "pointer",
  },
};
