import { PetClinicDashboard } from "@/components/PetClinicDashboard";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { NextPage } from "next";

const queryClient = new QueryClient();

const Home: NextPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PetClinicDashboard />
    </QueryClientProvider>
  );
};

export default Home;
