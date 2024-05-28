"use client";

import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Title } from "../ui/title/Title";
import { Input } from "../ui/input/Input";
import { Button } from "../ui/button/Button";
import { currencyFormat } from "@/utils/currencyFormat";

const MINIMUN_AMOUNT = 5000;

const schema = z.object({
  minimumAmount: z
    .string()
    .min(5, "El monto debe ser mayo a 4 dijitos")
    .max(9, "El monto debe ser menor a 8 dijitos")
    .transform((val) => parseFloat(val.replace(/[^\d]/g, "")))
    .refine((val) => val >= MINIMUN_AMOUNT, {
      message: "El monto mínimo debe ser mayo a 5000",
    }),
  dailyAmount: z.string(),
  weeklyAmount: z.string(),
  monthlyAmount: z.string(),
});

type FormInputs = z.infer<typeof schema>;

export const FormDepositLimit = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { isValid, errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("data", data);
    alert(JSON.stringify(data));
  };

  const handleInputChange = (event: any, name: keyof FormInputs) => {
    const value = event.target.value;
    const newValue = value.replace(/\D/g, "");
    const formattedValue = currencyFormat(Number(newValue));

    setValue(name, value === "$" ? "" : formattedValue, { shouldValidate: true });
  };

  const getRegisterOption = (name: keyof FormInputs): RegisterOptions => ({
    min: 4,
    max: 8,
    required: "Este campo es obligatorio",
    pattern: {
      value: /^\$\d+$/,
      message: "Este campo es obligatorio",
    },
    onChange: (e) => handleInputChange(e, name),
  });

  return (
    <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-[#E0E4EF4D] p-4 rounded-lg">
        <Title title="AUTOEXCLUSIÓN PROVEEDORES" />
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col pt-6">
            <Input
              {...register("minimumAmount", getRegisterOption("minimumAmount"))}
              type="text"
              className="w-full sm:w-[376px] h-[48px]"
              placeholder="Monto mínimo de depósito"
            />
            {errors.minimumAmount && (
              <p className="text-red-400 text-left pt">{errors.minimumAmount.message}</p>
            )}
            <Input
              {...register("dailyAmount", getRegisterOption("dailyAmount"))}
              type="text"
              className="w-full sm:w-[376px] h-[48px] mt-3"
              placeholder="Diario (De 00:00 hasta 24:00 hrs)"
            />
            <Input
              {...register("weeklyAmount", getRegisterOption("weeklyAmount"))}
              type="text"
              className="w-full sm:w-[376px] h-[48px] mt-3"
              placeholder="Semanal (De lunes a domingo)"
            />
            <Input
              {...register("monthlyAmount", getRegisterOption("monthlyAmount"))}
              type="text"
              className="w-full sm:w-[376px] h-[48px] mt-3"
              placeholder="Mensual (Del 1 al 30)"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center pt-8">
        <Button
          type="submit"
          disabled={!isValid}
          label="GUARDAR"
          className="bg-secondary w-full sm:w-96"
        />
      </div>
    </form>
  );
};
