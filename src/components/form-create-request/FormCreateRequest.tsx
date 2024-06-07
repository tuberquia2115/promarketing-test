"use client";

import { ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

import { Title } from "../ui/title/Title";
import { Input } from "../ui/input/Input";
import { Button } from "../ui/button/Button";
import { Supplier } from "@/interfaces";
import { ErrorMessage } from "../ui/errorMessage/ErrorMessage";
import { createRequestSchema } from "@/validation-schemes/create-request-schema";

interface Props {
  suppliers: Supplier[];
}

interface FormInputs {
  selectedSuppliers: string[];
  radioOption: "temporary" | "undefined";
  descriptionByIndefinite: string;
  temporaryDate: Date;
}

export const FormCreateRequest = ({ suppliers }: Props) => {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    reset,
    watch,
    trigger,
    formState: { isValid, errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: { selectedSuppliers: [], radioOption: "temporary", descriptionByIndefinite: "" },
  });

  const { selectedSuppliers, radioOption } = getValues();
  const allChecked = suppliers.every((supplier) => selectedSuppliers.includes(supplier.name));

  console.log("errores", errors);
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const { radioOption, ...restData } = data;
    console.log("data", restData);
    alert(JSON.stringify(restData));
    reset();
  };

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const newSelectedSuppliers = suppliers.map((item) => item.name);

    setValue("selectedSuppliers", isChecked ? newSelectedSuppliers : []);
  };

  watch(["radioOption", "selectedSuppliers"]);

  return (
    <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-[#E0E4EF4D] p-4 rounded-lg">
        <Title title="AUTOEXCLUSIÓN PROVEEDORES" />
        <div className="flex flex-col pt-4 border-0 border-b-[0.2px] border-b-[#909090] pb-1 ">
          <div className="flex flex-row items-center">
            <Input
              type="checkbox"
              id="all-checked"
              checked={allChecked}
              onChange={handleSelectAll}
            />
            <p className="pl-2">Todos</p>
          </div>
        </div>
        <div className="w-full flex-wrap flex flex-col sm:flex-row pt-3">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="flex flex-row pb-3 pr-2">
              <Input
                type="checkbox"
                value={supplier.name}
                id={`${supplier.name}-${supplier.id}`}
                {...register("selectedSuppliers", { onBlur: () => trigger("selectedSuppliers") })}
              />
              <p className="pl-2">{`${supplier.name}. ${supplier.id}`}</p>
            </div>
          ))}
        </div>
        {errors.selectedSuppliers && <ErrorMessage message={errors.selectedSuppliers.message} />}
      </div>

      <div className="bg-[#E0E4EF4D] mt-4 rounded-lg px-4 py-5">
        <Title title="POR UN PERIODO DE TIEMPO" />

        <div className="flex flex-row pt-5 pb-4">
          {["temporary", "undefined"].map((option) => (
            <div key={option} className="flex flex-row items-center pr-3">
              <Input key={option} type="radio" {...register("radioOption")} value={option} />
              <p className="pl-2">
                {option === "temporary" && "Temporal hasta"}
                {option === "undefined" && "Indefinido"}
              </p>
            </div>
          ))}
        </div>
        {radioOption === "temporary" && (
          <>
            <Input
              type="date"
              {...register("temporaryDate", {
                required: "La fecha es requerida",
                onBlur: () => trigger("temporaryDate"),
              })}
              className="uppercase"
            />
            {errors.temporaryDate && <ErrorMessage message={errors.temporaryDate.message} />}
          </>
        )}
        {radioOption === "undefined" && (
          <>
            <textarea
              {...register("descriptionByIndefinite", {
                required: "Este campo es requerido",
                onBlur: () => trigger("descriptionByIndefinite"),
              })}
              rows={5}
              placeholder="¿Por que indefinido?"
              className="resize-none hide-calendar-icon w-full relative px-4 py-2 border border-secondary1 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary1 focus:border-transparent"
            />
            {errors.descriptionByIndefinite && (
              <ErrorMessage message={errors.descriptionByIndefinite.message} />
            )}
          </>
        )}
      </div>

      <div className="w-full flex justify-center pt-8">
        <Button
          type="submit"
          disabled={!isValid}
          label="ENVIAR"
          className={clsx("w-full sm:w-80", {
            "bg-primary": isValid,
            "bg-[#091B5080]": !isValid,
          })}
        />
      </div>
    </form>
  );
};
