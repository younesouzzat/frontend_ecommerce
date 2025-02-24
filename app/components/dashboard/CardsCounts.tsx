import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, User, Users } from "lucide-react";

export default function CardsCounts() {
  return (
    <>
      <Card className="rounded-xl border bg-card text-card-foreground shadow">
        <CardHeader className="p-6 flex flex-row items-center justify-between">
          <CardTitle>Total Revenue</CardTitle>
          <DollarSign className="w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,345</div>
          <p className="text-sm text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-xl border bg-card text-card-foreground shadow">
        <CardHeader className="p-6 flex flex-row items-center justify-between">
          <CardTitle>Subscriptions</CardTitle>
          <Users className="w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2350</div>
          <p className="text-sm text-muted-foreground">
            +180.1% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-xl border bg-card text-card-foreground shadow">
        <CardHeader className="p-6 flex flex-row items-center justify-between">
          <CardTitle>Sales</CardTitle>
          <CreditCard className="w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12,234</div>
          <p className="text-sm text-muted-foreground">+19% from last month</p>
        </CardContent>
      </Card>

      <Card className="rounded-xl border bg-card text-card-foreground shadow">
        <CardHeader className="p-6 flex flex-row items-center justify-between">
          <CardTitle>Total Revenue</CardTitle>
          <Activity className="w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,345</div>
          <p className="text-sm text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
    </>
  );
}
