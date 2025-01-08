import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import {
  MdAccountBalance,
  MdLibraryAddCheck,
  MdOutlineLocalShipping,
} from "react-icons/md";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography variant="h6">Shipping Details</Typography>,
      icon: <MdOutlineLocalShipping />,
    },
    {
      label: <Typography variant="h6">Confirm Order</Typography>,
      icon: <MdLibraryAddCheck />,
    },
    {
      label: <Typography variant="h6">Payment</Typography>,
      icon: <MdAccountBalance />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    padding: "16px",
    margin: "20px 0",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
      {steps.map((item, index) => (
        <Step
          key={index}
          active={activeStep === index}
          completed={activeStep >= index}
        >
          <StepLabel
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: activeStep >= index ? "#007bff" : "rgba(0, 0, 0, 0.6)",
              transition: "color 0.3s ease, transform 0.3s ease",
              textAlign: "center",
            }}
            icon={
              <div
                style={{
                  backgroundColor: activeStep >= index ? "#007bff" : "#e0e0e0",
                  borderRadius: "50%",
                  padding: "8px",
                  transition: "background-color 0.3s ease",
                }}
              >
                {item.icon}
              </div>
            }
          >
            {item.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckoutSteps;
