import { usePatients } from "@/hooks/usePatients";
import Table from "./Table/Table";

export const PetClinicDashboard = () => {
  const {data} = usePatients()
  return (
    // Change whatever you want here. It's just an example of using tailwind
    <div className="grid grid-rows-auto-1fr gap-y-4 p-4 md:p-8 max-w-screen-lg mx-auto">
      <Title />
      <Table
        data={data}
      />
    </div>
  );
};

const Title = () => {
  return (
    <h1 className="text-primary font-bold text-3xl">Pet Clinic Dashboard</h1>
  );
};
