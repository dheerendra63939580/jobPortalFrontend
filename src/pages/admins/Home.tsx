import { Divider } from "@/components/customComponents/common/Divider";
import { MetricCard } from "@/components/customComponents/common/MetricCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Plus, User} from "lucide-react"
import { NewApplication } from "@/components/customComponents/admins/NewApplication";
import { ReviewedApplication } from "@/components/customComponents/admins/ReviewedApplication";
import { SelectedApplication } from "@/components/customComponents/admins/SelectedApplication";
import { AdminReviewerTable } from "@/components/customComponents/superAdmin/AdminReviewerTable";
import { adminData } from "../superAdmin/Home";
import { adminHeaders } from "@/constants/superAdmin";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Signup } from "@/components/Signup";
import { useState } from "react";
import { useMetrics } from "@/hooks/useMetrics";
export default function Home() {

  const [isOpen, setIsOpen] = useState(false);
  const {data, isLoading, isError} = useMetrics();
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <span>Dashboard</span>
        <Button className="flex justify-between items-center cursor-pointer" onClick={handleIsOpen}>
          <Plus />Create Reviewer
        </Button>
      </div>
      <Divider />
      <div className="grid grid-cols-4 gap-4">
        <MetricCard 
          label="Total Admins"
          value={data?.data?.admin ?? 0}
          icon={<User />}
          loading={isLoading}
        />
        <MetricCard 
          label="Total Reviewers"
          value={data?.data?.reviewer ?? 0}
          icon={<User />}
          loading={isLoading}
        />
        <MetricCard 
          label="Total Users"
          value={data?.data?.user ?? 0}
          icon={<User />}
          loading={isLoading}
        />
        <MetricCard 
          label="Total Pending Applications"
          value={5}
          icon={<User />}
          loading={isLoading}
        />
      </div>
      <Tabs defaultValue="newApplication" className="mt-4">
        <TabsList className="bg-chart-2 [&>*]:cursor-pointer">
          <TabsTrigger value="newApplication">New Applications</TabsTrigger>
          <TabsTrigger value="reviewedApplications">Reviewed Applications</TabsTrigger>
          <TabsTrigger value="selectedApplications">Selected Applications</TabsTrigger>
          <TabsTrigger value="reviewers">Reviewers</TabsTrigger>
        </TabsList>
        <TabsContent value="newApplication">
          <NewApplication />
        </TabsContent>
        <TabsContent value="reviewedApplications">
          <ReviewedApplication />
        </TabsContent>
        <TabsContent value="selectedApplications">
          <SelectedApplication />
        </TabsContent>
        <TabsContent value="reviewers">
          <AdminReviewerTable data={adminData} headers={adminHeaders}/>
        </TabsContent>
        </Tabs>
        <Dialog
          open={isOpen}
          onOpenChange={handleIsOpen}
        >
          <DialogContent className="overflow-y-auto h-full">
            <DialogHeader>
              <DialogTitle>Create new reviewer</DialogTitle>
            </DialogHeader>
            <Signup isCreateAdmin={true} />
          </DialogContent>

        </Dialog>
    </>
  )
}