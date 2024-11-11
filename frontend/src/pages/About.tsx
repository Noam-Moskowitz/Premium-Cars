import AboutParagraph from "@/components/about/AboutParagraph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaShieldAlt } from "react-icons/fa";
import { FaBolt, FaRegCompass, FaRegLightbulb, FaRegMap } from "react-icons/fa6";
import { IoMdSpeedometer } from "react-icons/io";

const About = () => {
  const features = [
    {
      icon: <FaRegCompass />,
      title: `Effortless Browsing:`,
      content: `Explore a wide range of cars using advanced filters to find exactly what you need.`,
    },
    {
      icon: <FaBolt />,
      title: `Instant Booking:`,
      content: `See a car you like? Book it on the spot without any
          hassle.`,
    },
    {
      icon: <IoMdSpeedometer />,
      title: `User Dashboard:`,
      content: `Log in to view your current bookings and easily access
          your rental history.`,
    },
  ];

  return (
    <div className="min-h-[80vh] px-2 md:p-16">
      <h1 className="font-bold text-2xl md:text-4xl text-center md:text-left">
        About Premium Cars
      </h1>
      <p className="p-2 text-center md:text-left">
        At <strong>Premium Cars</strong>, our mission is to revolutionize the car rental experience
        by making it as simple and seamless as the click of a button. Gone are the days of lengthy
        phone calls and tedious back-and-forth with rental agencies. With our platform, users can
        easily browse available vehicles, compare prices, and book their preferred car instantly.
      </p>

      <AboutParagraph
        icon={<FaRegLightbulb className="text-7xl " />}
        subtitle="Our Vision"
        content="We aim to bring transparency and convenience to car rentals, empowering users to make
            informed decisions with minimal effort. Whether you're planning a weekend getaway or a
            business trip, Premium Cars ensures you spend less time booking and more time on the
            road."
      />

      <AboutParagraph
        icon={<FaRegMap className="text-7xl" />}
        subtitle="Who We Serve"
        content="Our platform caters to anyone looking to rent a car. From occasional drivers to frequent
        travelers, we offer a streamlined solution for all your rental needs."
      />

      <h2 className="font-bold text-center text-xl pb-3">Key Features</h2>
      <div className="flex flex-col md:flex-row  p-2 gap-5 justify-center m-auto ">
        {features.map(({ content, icon, title }, i) => (
          <Card
            key={i}
            className="items-center bg-accent flex hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all group "
          >
            <CardHeader className="group-hover:scale-150 transition-transform group-hover:animate-bounce text-3xl">
              {icon}
            </CardHeader>
            <div>
              <CardTitle className="text-md pt-3">{title}</CardTitle>
              <CardContent className="text-sm">{content}</CardContent>
            </div>
          </Card>
        ))}
      </div>

      <AboutParagraph
        icon={<FaShieldAlt className="text-7xl" />}
        subtitle="Why Choose Premium Cars?"
        content="Our platform stands out for its simplicity and user-friendly interface. Designed with the
        user in mind, Premium Cars offers a hassle-free experience, ensuring even first-time users
        can navigate and book with ease."
      />
    </div>
  );
};

export default About;
