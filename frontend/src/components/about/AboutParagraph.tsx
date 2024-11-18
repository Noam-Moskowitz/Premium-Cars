import React from "react";

interface AboutParagraphProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: any;
  subtitle: string;
  content: string;
}

const AboutParagraph: React.FC<AboutParagraphProps> = ({ icon, subtitle, content, ...props }) => {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col md:flex-row items-center gap-5 py-5 group`}
    >
      <div className="group-hover:text-primary group-hover:scale-105 group-hover:animate-pulse transition-all">
        {icon}
      </div>
      <div className="text-center md:text-left">
        <h2 className="font-bold">{subtitle}</h2>
        <p className="p-2">{content}</p>
      </div>
    </div>
  );
};

export default AboutParagraph;
