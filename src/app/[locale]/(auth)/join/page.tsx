"use client"
import { Box, Link, Text, useToast } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default function JoinGroupPage({ searchParams }: any) {
  
  localStorage.setItem("code-rem", `Run ${searchParams.code}`);
    redirect("/profile");
    
  

  return (
    <Box>
      <Text>Trying to join...</Text>
      <Link href="/profile">Go to profile page</Link>
    </Box>
  );
}
