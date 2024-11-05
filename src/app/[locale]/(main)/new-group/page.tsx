import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JoinGroupFormMobile from "./join-group-form-mobile";
import CreateGroupFormMobile from "./create-group-form-mobile";

export default async function NewGroupPageForMobile() {
  return (
    <Tabs defaultValue="Join" className="w-[350px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Join">Join</TabsTrigger>
        <TabsTrigger value="Create">Create</TabsTrigger>
      </TabsList>
      <TabsContent value="Join">
        <JoinGroupFormMobile />
      </TabsContent>
      <TabsContent value="Create">
        <CreateGroupFormMobile />
      </TabsContent>
    </Tabs>
  );
}
