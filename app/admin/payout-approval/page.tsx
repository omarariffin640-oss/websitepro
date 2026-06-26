import { redirect } from "next/navigation";

export default function PayoutApprovalRedirectPage() {
    redirect("/admin/payouts");
}
