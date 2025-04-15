"use server";

import { revalidatePath } from "next/cache";

export async function updateTransaction(id, data) {
  await fetch(`http://localhost:4000/transactions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  revalidatePath("/collection");
  revalidatePath(`/collection/${id}`);
  revalidatePath("/admin");
  revalidatePath(`/admin/edit/${id}`);
}
