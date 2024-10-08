import { useState } from "react";
import "animate.css";
import Hero from "@/components/Hero";
import CarListDropdown from "@/components/cars/CarListDropdown";
import { useQuery } from "@tanstack/react-query";
import useCarsApi from "@/hooks/api/useCarsApi";
import { CAR_QUERY_KEY, ONE_HOUR } from "@/consts/reactQuery";
import Loader from "@/components/ui/Loader";

const Home = () => {
  const { getAllCars } = useCarsApi();

  const [isOpen, setisOpen] = useState(false);

  const { data, error, isError, isLoading } = useQuery({
    queryKey: [CAR_QUERY_KEY],
    queryFn: getAllCars,
    staleTime: ONE_HOUR,
  });

  if (isLoading) return <Loader size="large" />;

  return (
    <div className="scroll-smooth">
      <header>
        <div className="pb-4 md:pb-0 pt-4 pl-5 animate__animated animate__fadeIn">
          <h1 className="font-bold text-accent-foreground text-lg md:text-2xl">
            Rent Your Car At The Click Of A Button!
          </h1>
          <p className="font-bold text-accent-foreground text-sm">
            Choose A car from our huge selection!
          </p>
        </div>
        <Hero
          isOpen={isOpen}
          carsArray={data || []}
          handleClick={() =>
            setisOpen((prevState) => {
              return !prevState;
            })
          }
        />
      </header>
      <CarListDropdown cars={data || []} open={isOpen} />
    </div>
  );
};

export default Home;
