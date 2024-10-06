import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HeroCard from "../cars/HeroCard";
import Autoplay from "embla-carousel-autoplay";

interface GenericCarouselProps {
  data: any[];
}

const GenericCarousel: React.FC<GenericCarouselProps> = ({ data }) => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <Carousel
      className="animate__animated animate__fadeIn animate__slower"
      plugins={[plugin.current]}
    >
      <CarouselContent>
        {data.map((item, i) => (
          <CarouselItem key={i}>
            <HeroCard
              id={item._id}
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
