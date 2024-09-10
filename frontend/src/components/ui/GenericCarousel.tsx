import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HeroCard from "../cars/HeroCard";

interface GenericCarouselProps {
  data: any[];
}

const GenericCarousel: React.FC<GenericCarouselProps> = ({ data }) => {
  return (
    <Carousel>
      <CarouselContent>
        {data.map((item, i) => (
          <CarouselItem key={i}>
            <HeroCard
              img={item.image}
              price={item.pricePerDay}
              make={item.make}
              model={item.model}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default GenericCarousel;
