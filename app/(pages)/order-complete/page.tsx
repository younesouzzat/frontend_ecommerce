import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <Card className="w-full h-80 text-center shadow-lg rounded-xl">
        <CardHeader>
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <CardTitle className="text-xl font-semibold mt-4">Thank You for Your Order!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-white mb-4">Your order has been placed successfully. You will receive a confirmation email shortly.</p>
          <Link href="/">
            <Button className="mt-4">Return to Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
