import HomeHeader from "./components/HomeHeader";
import HomeProjectList from "./components/HomeProjectList";
import HomeCalendar from "./components/HomeCalendar";
import TaskTimeline from "./components/TaskTimeline";

export default function HomeInternPage()  {
  return (
    <div className="flex-1">
      <HomeHeader />
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-box-primary border border-box-border rounded-xl p-6">
            <HomeProjectList />
          </div>
          <div className="bg-box-primary border border-box-border rounded-xl p-6">
            <TaskTimeline />
          </div>
        </div>
        <div className="bg-box-primary  rounded-xl">
          <HomeCalendar />
        </div>
      </div>
    </div>
  );
};