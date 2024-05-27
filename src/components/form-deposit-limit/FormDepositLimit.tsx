"use client";

import { Title } from "../ui/title/Title";
import { Input } from "../ui/input/Input";
import { Button } from "../ui/button/Button";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormInputs {
  minimumAmount: number;
  dailyAmount: number;
  weeklyAmount: number;
  monthlyAmount: number;
}

export const FormDepositLimit = () => {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    alert(JSON.stringify(data))
  };

  

  return (
    <form className="pt-3"  onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-[#E0E4EF4D] p-4 rounded-lg">
        <Title title="AUTOEXCLUSIÓN PROVEEDORES" />

        <div className="flex flex-col w-full items-center justify-center pt-6">
          <Input
            {...register("minimumAmount", { required: "El campo es requerido" })}
            className="w-full sm:w-[376px] h-[48px] mb-3"
            type="number"
            placeholder="Monto mínimo de depósito"
          />
          <Input
            {...register("dailyAmount", { required: "El campo es requerido" })}
            className="w-full sm:w-[376px] h-[48px] mb-3"
            type="number"
            placeholder="Diario (De 00:00 hasta 24:00 hrs)"
          />
          <Input
            {...register("weeklyAmount", { required: "El campo es requerido" })}
            className="w-full sm:w-[376px] h-[48px] mb-3"
            type="number"
            placeholder="Semanal (De lunes a domingo)"
          />
          <Input
            {...register("monthlyAmount", { required: "El campo es requerido" })}
            className="w-full sm:w-[376px] h-[48px]"
            type="number"
            placeholder="Mensual (Del 1 al 30)"
          />
        </div>
        <div className="w-full flex justify-center pt-8">
          <Button type="submit"  label="GUARDAR" className="bg-secondary w-full sm:w-96" />
        </div>
      </div>
    </form>
  );
};
