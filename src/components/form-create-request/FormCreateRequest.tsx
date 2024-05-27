"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { Title } from "../ui/title/Title";
import { Input } from "../ui/input/Input";
import { Button } from "../ui/button/Button";
import { Suppliers } from "@/interfaces";
import { ChangeEvent, useState } from "react";

interface Props {
  suppliers: Suppliers[];
}

interface FormInputs {
  selectedSuppliers: { [key: string]: boolean };
  timeFrame: Date | string;
}

export const FormCreateRequest = ({ suppliers }: Props) => {
  const [selectedRadio, setSelectedRadio] = useState<"temporary" | "undefined">("temporary");

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      selectedSuppliers: {},
      timeFrame: "",
    },
  });
  const { selectedSuppliers } = getValues();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    alert(JSON.stringify(data))
  };

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    const newSelectedSuppliers: { [key: string]: boolean } = {};

    suppliers.forEach((item) => {
      newSelectedSuppliers[item.id] = e.target.checked;
    });

    setValue("selectedSuppliers", newSelectedSuppliers);
  };

  const handlerSelectionSupplier = (supplier: Suppliers) => {
    setValue("selectedSuppliers", {
      ...selectedSuppliers,
      [supplier.id]: !selectedSuppliers[supplier.id],
    });
  };

  const allChecked = suppliers.every((supplier) => selectedSuppliers[supplier.id]);

  watch("selectedSuppliers");

  return (
    <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-[#E0E4EF4D] p-4 rounded-lg">
        <Title title="AUTOEXCLUSIÓN PROVEEDORES" />
        <div className="flex flex-col pt-4 border-0 border-b-[0.2px] border-b-[#909090] pb-1 ">
          <div className="flex flex-row items-center">
            <Input type="checkbox" checked={allChecked} onChange={handleSelectAll} />
            <p className="pl-2">Todos</p>
          </div>
        </div>
        <div className="w-full flex-wrap flex flex-col sm:flex-row pt-3">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="flex flex-row pb-3 pr-2">
              <Input
                type="checkbox"
                checked={!!selectedSuppliers[supplier.id]}
                onChange={(e) => handlerSelectionSupplier(supplier)}
              />
              <p className="pl-2">{`${supplier.name}. ${supplier.id}`}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#E0E4EF4D] mt-4 rounded-lg px-4 py-5">
        <Title title="POR UN PERIODO DE TIEMPO" />

        <div className="flex flex-row pt-5 pb-4">
          <div className="flex flex-row items-center pr-3">
            <Input
              type="radio"
              onChange={() => setSelectedRadio("temporary")}
              checked={selectedRadio === "temporary"}
            />
            <p className="pl-2">Temporal hasta</p>
          </div>
          <div className="flex flex-row items-center">
            <Input
              type="radio"
              onChange={() => setSelectedRadio("undefined")}
              checked={selectedRadio === "undefined"}
            />
            <p className="pl-2">Indefinido</p>
          </div>
        </div>
        {selectedRadio === "temporary" && (
          <Input
            type="date"
            {...register("timeFrame", { required: "La fecha es requerida" })}
            className="uppercase"
            placeholder="DD/MM/AAAA*"
          />
        )}
        {selectedRadio === "undefined" && (
          <textarea
            {...register("timeFrame", {
              required: "La descripción es requerida",
              max: 255,
              min: 8,
            })}
            rows={5}
            minLength={8}
            maxLength={255}
            placeholder="¿Por que indefinido?"
            className="resize-none hide-calendar-icon w-full relative px-4 py-2 border border-secondary1 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary1 focus:border-transparent"
          />
        )}
        
      </div>

      <div className="w-full flex justify-center pt-8">
        <Button
          type="submit"
          label="ENVIAR"
          className="bg-primary w-full sm:w-80"
          disabled={!isValid}
        />
      </div>
    </form>
  );
};
