import Link from "next/link";
import { cookies } from "next/headers";
import { getAllPostRecords } from "@/lib/posts";
import AdminLoginForm from "@/components/AdminLoginForm";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const isAuthenticated = session?.value === "authenticated_ritik_session";

  // Gatekeeper: If unauthenticated, render the Email + Password Login Form
  if (!isAuthenticated) {
    return <AdminLoginForm />;
  }

  const posts = await getAllPostRecords();
  const publishedCount = posts.filter((p) => p.status === "PUBLISHED").length;
  const draftCount = posts.filter((p) => p.status === "DRAFT").length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Admin Header */}
      <div className="border-b border-neutral-200 pb-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block">
              Publishing &amp; Content Management
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neutral-900 text-white">
              Authenticated
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            LucknowKaChaska Admin Console<span className="text-neutral-400">.</span>
          </h1>
          <p className="text-xs text-neutral-600 font-mono mt-1">
            Dual-Mode Publishing Engine: AI Auto-Generation &amp; WordPress-Style Manual Editing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AdminLogoutButton />
          <Link
            href="/admin/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-neutral-900 text-white text-xs font-mono font-bold rounded hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <span>✨ New Post</span>
          </Link>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 border border-neutral-200 rounded-lg bg-white">
          <div className="text-2xl font-black text-neutral-900">{posts.length}</div>
          <div className="text-[11px] font-mono uppercase text-neutral-500">Total Records</div>
        </div>
        <div className="p-4 border border-neutral-200 rounded-lg bg-emerald-50 border-emerald-200">
          <div className="text-2xl font-black text-emerald-800">{publishedCount}</div>
          <div className="text-[11px] font-mono uppercase text-emerald-600">Published Live</div>
        </div>
        <div className="p-4 border border-neutral-200 rounded-lg bg-amber-50 border-amber-200">
          <div className="text-2xl font-black text-amber-800">{draftCount}</div>
          <div className="text-[11px] font-mono uppercase text-amber-600">Drafts Pending Approval</div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="border border-neutral-200 rounded-lg bg-white overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider font-mono">
            Article Inventory
          </h2>
          <span className="text-xs text-neutral-500 font-mono">
            Directly saved to <code>content/posts/*.json</code>
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="p-12 text-center text-neutral-500 text-xs font-mono">
            No posts found. Click &quot;New Post&quot; to auto-generate your first guide!
          </div>
        ) : (
          <div className="divide-y divide-neutral-200">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/70 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        post.status === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {post.status}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      {post.category} • {post.area}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 leading-snug">
                    {post.title}
                  </h3>
                  <div className="text-[11px] font-mono text-neutral-400">
                    Slug: <code>/posts/{post.slug}</code> • Updated:{" "}
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/posts/${post.slug}`}
                    target="_blank"
                    className="px-3 py-1.5 border border-neutral-300 text-neutral-800 text-xs font-mono rounded hover:border-neutral-900 transition-colors"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/new?slug=${post.slug}`}
                    className="px-3 py-1.5 bg-neutral-900 text-white text-xs font-mono rounded hover:bg-neutral-800 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
