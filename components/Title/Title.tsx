import { Pets } from "@mui/icons-material";
export const Title = () => {
    return (
      <div className="flex justify-start items-center gap-2 w-full md:pt-10 pt-5">
        <Pets fontSize="medium"/>
        <h1 className="text-primary font-bold md:text-4xl text-xl font-mono">Pet Clinic Dashboard</h1>
      </div>
    );
};