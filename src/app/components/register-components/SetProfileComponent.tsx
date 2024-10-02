"use client";
import React, { useState } from "react";
import {
	Box,
	Button,
	Flex,
	useToast,
	Stepper,
	Step,
	StepIndicator,
	StepTitle,
	StepStatus,
	StepNumber,
	StepIcon,
	StepSeparator,
} from "@chakra-ui/react";
import UserProfile from "./step-one/UserProfile";
import GroupInformation from "./step-two/GroupInformation";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { setupProfile } from "@/app/server-actions/set-profile";

export default function SetProfileComponent() {
	const t = useTranslations('SetProfileComponentPage');

  const steps = [
    { title: t('stepOneTitle'), component: UserProfile },
    { title: t('stepTwoTitle'), component: GroupInformation },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    groupChoice: '',
    groupName: '',
    groupPassword: '',
    groupDescription: '',
  });

  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleInputChange = (e: any) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, groupChoice: e });
    }
  };

  const showToast = (
    title: string,
    description: string,
    status: 'success' | 'error' | 'warning' | 'info'
  ) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 0:
        return formData.firstName && formData.lastName;
      case 1:
        if (formData.groupChoice === 'join') {
          return formData.groupName && formData.groupPassword;
        } else if (formData.groupChoice === 'create') {
          return (
            formData.groupName &&
            formData.groupDescription &&
            formData.groupPassword
          );
        }
        return false;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    try {
      const userId = searchParams.get('userId');
      const result = await setupProfile(userId, formData);

      if (result.error) {
        showToast('Error', result.error, 'error');
        return;
      }

      showToast('Success', 'Profile setup successful!', 'success');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      console.error('Profile setup error:', error);
      showToast('Error', 'An unexpected error occurred', 'error');
    }
  };

  const handleSubmitWithoutGroup = async () => {
    try {
      const userId = searchParams.get('userId');
      const result = await setupProfile(userId, {
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      if (result.error) {
        showToast('Error', result.error, 'error');
        return;
      }

      showToast('Success', 'Profile setup successful!', 'success');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      console.error('Profile setup error:', error);
      showToast('Error', 'An unexpected error occurred', 'error');
    }
  };

  const CurrentStepComponent = steps[activeStep].component;

	return (
		<Box className="max-w-md mx-auto mt-10 p-6  rounded-lg shadow-md">
			<Stepper index={activeStep} className="mb-8">
				{steps.map((step, index) => (
					<Step key={index}>
						<StepIndicator>
							<StepStatus
								complete={<StepIcon />}
								incomplete={<StepNumber />}
								active={<StepNumber />}
							/>
						</StepIndicator>
						<Box flexShrink="0">
							<StepTitle>{step.title}</StepTitle>
						</Box>
						<StepSeparator />
					</Step>
				))}
			</Stepper>
			<CurrentStepComponent
				formData={formData}
				handleInputChange={handleInputChange}
			/>
			<Flex
				flexDirection={{ base: "column", md: "row" }}
				justifyContent={{ base: "center", md: "space-between" }}
				alignItems={{ base: "stretch", md: "center" }}
				mt={6}
				gap={{ base: 4, md: 0 }}
				position="relative" // Ensure positioning is relative for absolute positioning on md screens
			>
				<Button
					onClick={handleBack}
					isDisabled={activeStep === 0}
					width={{ base: "100%", md: "auto" }} // Full width on small screens, auto on medium
					position={{ md: "absolute" }}
					left={{ md: 0 }}
				>
					{t("BackButton")}
				</Button>

				{activeStep === 0 && (
					<Button
						colorScheme="xorange"
						onClick={handleSubmitWithoutGroup}
						mb={{ base: 4, md: 0 }} // Margin bottom on small screens
						mx={{ md: "auto" }} // Center the button on medium screens
						width={{ base: "100%", md: "auto" }} // Full width on small screens, auto on medium
					>
						{t("SubmitWithoutGroupButton")}
					</Button>
				)}

				{activeStep === steps.length - 1 ? (
					<Button
						colorScheme="xblue"
						onClick={handleSubmit}
						isDisabled={!isStepComplete(activeStep)}
						width={{ base: "100%", md: "auto" }} // Full width on small screens, auto on medium
						position={{ md: "absolute" }}
						right={{ md: 0 }}
					>
						{t("SetupProfile")}
					</Button>
				) : (
					<Button
						colorScheme="xblue"
						onClick={handleNext}
						isDisabled={!isStepComplete(activeStep)}
						width={{ base: "100%", md: "auto" }} // Full width on small screens, auto on medium
						position={{ md: "absolute" }}
						right={{ md: 0 }}
					>
						{t("Next")}
					</Button>
				)}
			</Flex>
		</Box>
	);
}
