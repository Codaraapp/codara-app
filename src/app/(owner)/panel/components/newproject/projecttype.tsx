import { BoxList } from "@/app/core/components/boxlist/boxlist";
import { Box, Typography } from "@mui/material";

const ProjectType = (props: any) => {
  const { data, handleChange } = props;

  const items = [
    {
      title: "Outsource",
      value: "OUTSOURCE",
      img: "/images/svg/outsource-icon.svg",
    },
    {
      title: "Hackathon",
      value: "HACKATHON",
      img: "/images/svg/hackathon-icon.svg",
    },
    {
      title: "Event",
      value: "EVENT",
      img: "/images/svg/event-icon.svg",
    },
    {
      title: "Education",
      value: "EDUCATION",
      img: "/images/svg/education-icon.svg",
    },
  ];

  const handleItemSelected = (value: string) => {
    handleChange({ name: "project_type", value });
  };

  return (
    <div>
      <Typography variant="subtitle1">Step1</Typography>
      <Typography variant="h3">What kind of your project?</Typography>
      <br />
      <Box sx={{ width: 240 }}>
        <BoxList
          items={items}
          selected={data.project_type}
          onItemSelected={handleItemSelected}
        />
      </Box>
    </div>
  );
};

export default ProjectType;
