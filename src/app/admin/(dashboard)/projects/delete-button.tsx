"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    const res = await fetch(`/api/admin/projects/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast.error("Failed to delete project");
      return;
    }

    toast.success("Project deleted");
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="inline-flex items-center h-7 px-3 rounded border text-xs font-medium transition-colors cursor-pointer border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
    >
      Delete
    </button>
  );
}
