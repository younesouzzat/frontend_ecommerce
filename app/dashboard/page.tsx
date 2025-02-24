import CardsCounts from "../components/dashboard/CardsCounts";
import ChartOne from "../components/dashboard/ChartOne";
import ChartTwo from "../components/dashboard/ChartTwo";

export default function Page() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <CardsCounts />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 p-4 pt-0">
        <ChartOne />
        <ChartTwo />
      </div>
    </>
  );
}
