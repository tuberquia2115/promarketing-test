import { getSuppliers } from "@/actions";
import {
  Button,
  Checkbox,
  FormCreateRequest,
  FormDepositLimit,
  Input,
  Radio,
  Tabs,
  Title,
} from "@/components";

export default async function Home() {
  const { ok, suppliers } = await getSuppliers();

  const tabs = [
    {
      key: "create-request",
      label: "Crear Solicitud",
      content: <FormCreateRequest suppliers={suppliers} />,
    },
    {
      key: "deposit-limit",
      label: "Límite de depósito",
      content: <FormDepositLimit />,
    },
  ];

  return (
    <main className="h-screen mx-auto w-11/12 sm:w-6/12 pt-5">
      <Tabs tabs={tabs} />
    </main>
  );
}
