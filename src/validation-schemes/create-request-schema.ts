import * as z from "zod";

export const createRequestSchema = z.object({
  selectedSuppliers: z.array(z.string()).nonempty("Debe seleccionar al menos un proveedor"),
  radioOption: z.enum(["temporary", "undefined"]),
  descriptionByIndefinite: z
    .string()
    .max(255, "Superastes el número (255) maxímo de caracteres permitidos")
    .min(8, "EL número mínimo de caracteres permitodos son 8"),
  temporaryDate: z.string().date("La fecha es requerida"),
});
