import React from "react";
import { Button } from "../ui/button";
import { MdOutlineCarCrash, MdOutlineDirectionsCar } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { Card, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";

const PrefilDataContainer = () => {
  const navigate = useNavigate();

  const sampleDataCards = [
    {
      title: `8 Cars`,
      icon: <MdOutlineDirectionsCar className="text-3xl text-primary" />,
    },
    {
      title: `2 Users`,
      icon: <LuUsers className="text-3xl text-primary" />,
    },
    {
      title: `4 Branches`,
      icon: <BsShop className="text-3xl text-primary" />,
    },
  ];

  return (
    <div className="size-full min-h-[70vh] py-5 bg-accent flex flex-col gap-3 items-center justify-center rounded shadow">
      <MdOutlineCarCrash className="text-9xl text-primary animate-pulse" />
      <h1 className="font-bold text-2xl">No Cars Found in the Database!</h1>
      <p className="">
        Since this is a project, the database might not contain any data initially.
      </p>
      <p>For your convenience, we can load sample data to give you the full experience.</p>
      <p className="">Sample data will include the following:</p>
      <div className="flex gap-4">
        {sampleDataCards.map(({ icon, title }, i) => (
          <Card key={i} className="p-5 flex gap-3 items-end hover:scale-110 transition-all">
            {icon}
            <CardTitle className="text-lg">{title}</CardTitle>
          </Card>
        ))}
      </div>
      <h2 className="font-bold">Would you like to load sample data?</h2>
      <div className="flex gap-5">
        <Button className="hover:opacity-75">Yes, load sample data</Button>
        <Button variant="outline" onClick={() => navigate(`/user/register`)}>
          No, I’ll add data manually
        </Button>
      </div>
    </div>
  );
};

export default PrefilDataContainer;
