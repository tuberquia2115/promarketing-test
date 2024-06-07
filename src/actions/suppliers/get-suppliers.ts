"use server";

import { Supplier } from "@/interfaces";

export async function getSuppliers(): Promise<{ ok: boolean; suppliers: Supplier[] }> {
  const suppliersUrl = process.env.SUPPLIERS_URL ?? "";

  try {
    const result: Supplier[] = await fetch(suppliersUrl, { method: "GET" }).then((r) => r.json());

    return {
      ok: true,
      suppliers: result.map((supplier) => ({
        ...supplier,
        description: supplier.description ?? supplier.Descripcion,
        name: supplier.name ?? supplier.Name,
        id: supplier.id.toString(),
      })),
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      suppliers: [],
    };
  }
}
