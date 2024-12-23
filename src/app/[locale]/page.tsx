import { Box, Button, Heading, Image } from "@chakra-ui/react";
import LandingImage from "../components/landing/LandingImage";
import StepsCard from "../components/landing/StepsCard";
import HeadingSyncSnack from "../components/landing/HeadingSyncSnack";
import Link from "next/link";
import ClientCodeToRun from "../components/client-code-to-run";
// import { useTranslations } from "next-intl";

export default function HomePage() {
  // const t = useTranslations("landing-page");
  return (
    <div className="h-screen">
      <Box className="flex justify-end p-4 space-x-2">
        <Link href="/login">
          <Button colorScheme="xorange" variant="outline">
            Log in
          </Button>
        </Link>
        <Link href="/register">
          <Button colorScheme="xorange" variant="outline">
            Register
          </Button>
        </Link>
      </Box>
      <Box className="flex flex-col items-center mb-10">
        <ClientCodeToRun />
        <Box className="flex flex-col items-center md:flex-row-reverse">
          <LandingImage />
          <HeadingSyncSnack />
        </Box>
        <Steps />
      </Box>
    </div>
  );
}

function Steps() {
  const steps = [
    {
      step: "01",
      title: "Create account",
      description:
        "Make a new account to start connecting and making  orders to your colleagues",
    },
    {
      step: "02",
      title: "Join/Create a group",
      description:
        "Start a group with all your colleagues! Or join an existing group?",
    },
    {
      step: "03",
      title: "Create an events and orders",
      description:
        "Become the favorite guy in the office by making a lot of events! Or maybe just start making orders?",
    },
    {
      step: "04",
      title: "Review",
      description:
        "Who is the best event maker in the group? Who has the most orders? Check the group stats!",
    },
  ];
  return (
    <Box className="flex flex-col items-start mb-10 md:flex-row md:items-stretch">
      {steps.map((step) => (
        <StepsCard
          key={step.step}
          title={step.title}
          step={step.step}
          description={step.description}
        />
      ))}
    </Box>
  );
}
