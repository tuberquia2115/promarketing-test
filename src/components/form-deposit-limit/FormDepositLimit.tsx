"use client";

import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";

import { Title } from "../ui/title/Title";
import { Input } from "../ui/input/Input";
import { Button } from "../ui/button/Button";
import { currencyFormat } from "@/utils/currencyFormat";

interface FormInputs {
  minimumAmount: string;
  dailyAmount: string;
  weeklyAmount: string;
  monthlyAmount: string;
}

export const FormDepositLimit = () => {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,

    formState: { isValid, errors },
  } = useForm<FormInputs>();

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
    required: "This field is required",
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

        <div className="flex flex-col w-full items-center justify-center pt-6">
          <Input
            {...register("minimumAmount", getRegisterOption("minimumAmount"))}
            type="text"
            className="w-full sm:w-[376px] h-[48px] mb-3"
            placeholder="Monto mínimo de depósito"
          />
          <Input
            {...register("dailyAmount", getRegisterOption("dailyAmount"))}
            type="text"
            className="w-full sm:w-[376px] h-[48px] mb-3"
            placeholder="Diario (De 00:00 hasta 24:00 hrs)"
          />
          <Input
            {...register("weeklyAmount", getRegisterOption("weeklyAmount"))}
            type="text"
            className="w-full sm:w-[376px] h-[48px] mb-3"
            placeholder="Semanal (De lunes a domingo)"
          />
          <Input
            {...register("monthlyAmount", getRegisterOption("monthlyAmount"))}
            type="text"
            className="w-full sm:w-[376px] h-[48px]"
            placeholder="Mensual (Del 1 al 30)"
          />
        </div>
      </div>
      <div className="w-full flex justify-center pt-8">
        <Button type="submit" label="GUARDAR" className="bg-secondary w-full sm:w-96" />
      </div>
    </form>
  );
};
