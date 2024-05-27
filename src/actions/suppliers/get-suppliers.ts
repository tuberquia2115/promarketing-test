"use server";

import { Suppliers } from "@/interfaces";

export async function getSuppliers(): Promise<{ ok: boolean; suppliers: Suppliers[] }> {
  const suppliersUrl = process.env.SUPPLIERS_URL ?? "";

  try {
    const result: Suppliers[] = await fetch(suppliersUrl, { method: "GET" }).then((r) => r.json());
    console.log("result", result);
    return {
      ok: true,
      suppliers: result.map((supplier) => ({ ...supplier, id: supplier.id.toString() })),
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      suppliers: [],
    };
  }
}
