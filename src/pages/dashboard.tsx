import Card from "@/components/dashboard/card";
import BasicLayout from "@/layout/basicLayout";
import type { FC } from "react";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import Reminders from "@/components/dashboard/reminders";
import DoughnutAnalysis from "@/components/dashboard/doughnutAnalysis";
import getRandomArbitrary from "@/lib/utils/getRandomArbitart";
import Users from "@/components/dashboard/users";
import Transaction from "@/components/dashboard/transaction";
import getAllUsers from "@/lib/users/getAllUsers";
import useStore from "@/store";
import { useEffect } from "react";
import getAllReminders from "@/lib/faq/getAllFaqs";
import getAllSubscriptions from "@/lib/subscriptions/getAllSubscriptions";
import getAllAdvertisements from "@/lib/advertisements/getAllAdvertisements";
type DashboardProps = {};

const Dashboard: FC<DashboardProps> = () => {
  const year = new Date(Date.now()).getFullYear();
  const store = useStore();
  async function fetchData() {
    try {
      const allUsers = await getAllUsers();
      const allReminders = await getAllReminders();
      const allSubscriptions = await getAllSubscriptions();
      const allAdvertisement = await getAllAdvertisements();
      store.actions.setUsers(allUsers);
      store.actions.setReminders(allReminders);
      store.actions.setAdvertisements(allAdvertisement);
      store.actions.setSubcriptions(allSubscriptions);
    } catch (error) {
      const { response } = error as any;
      console.log(response.data.message);
    }
  }

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const noOfUsers: number = store.userManagement.users.length;
  const noOfReminders: number = store.reminderManagement.reminders.length;
  const noOfubscription: number =
    store.subscrptionManagement.subscriptions.length;
  const noOfAdvrtisemnet: number =
    store.advertisementManagement.advertisements.length;

  return (
    <BasicLayout>
      <div className="p-4 grid gap-6 grid-cols-4 text-slate-800">
        <Card
          Icon={ArrowTrendingUpIcon}
          className=""
          title="Relative"
          lr={17000}
          ur={18000}
          image="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/cards/pose_f9.png"
          message={`report of ${year}`}
        />
        <Card
          Icon={ArrowTrendingUpIcon}
          className=""
          title="Users"
          lr={70}
          ur={300}
          image="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/cards/pose_m18.png"
          message={`report of ${year}`}
        />
        <Reminders />
        <DoughnutAnalysis
          mainTitle="Reminders Analysis"
          info={{
            Icon: ArrowTrendingUpIcon,
            title: "No of Reminders",
            revenue: noOfReminders,
          }}
          data={{
            labels: ["Reminders", "Users", "Advertisement"],
            datasets: [
              {
                label: "Yaatri On Time Report",
                data: [noOfReminders, noOfUsers, noOfAdvrtisemnet],
                backgroundColor: [
                  "rgb(145, 85, 253)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
                  "rgb(245, 245, 245)",
                ],
                hoverOffset: 4,
              },
            ],
          }}
        />
        <Users />
        <Transaction />
      </div>
    </BasicLayout>
  );
};

export default Dashboard;
