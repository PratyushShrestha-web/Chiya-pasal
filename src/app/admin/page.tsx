import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  // middleware.ts already guarantees only an authenticated admin reaches this route.
  return <AdminDashboard />;
}
