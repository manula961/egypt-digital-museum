import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import AdminPanel from "../../components/AdminPanel";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims?.sub) redirect("/login");
  const userId = claimsData.claims.sub;
  const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", userId).maybeSingle();
  if (!role || !["admin","editor"].includes(role.role)) redirect("/");
  return <AdminPanel role={role.role} email={claimsData.claims.email || ""} />;
}
