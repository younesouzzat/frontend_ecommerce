"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Info, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Form Submitted", data);
  };

  return (
    <div>
      <div className="container mx-auto py-8 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <Card className="shadow-lg rounded-xl p-6 md:col-span-2">
            <CardHeader className="text-center">
              <Mail className="w-16 h-16 text-blue-500 mx-auto" />
              <CardTitle className="text-xl font-semibold mt-4">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="flex items-center gap-2">
                <Mail className="text-blue-500" />
                <span>contact@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-blue-500" />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="text-blue-500" />
                <span>123 Street Name, City, Country</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl p-6 md:col-span-3">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center">
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter your name"
                  />
                  {errors.name?.message && (
                    <p className="text-red-500 text-sm">
                      {String(errors.name.message)}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                  />
                  {errors.email?.message && (
                    <p className="text-red-500 text-sm">
                      {String(errors.email.message)}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    {...register("message")}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter your message"
                    rows={4}
                  ></textarea>
                  {errors.message?.message && (
                    <p className="text-red-500 text-sm">
                      {String(errors.message.message)}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-center mb-4">Our Location</h2>
        <div className="w-full h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.421206339732!2d-122.40529638440767!3d37.79831851731456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809cfc6ffbaf%3A0x6314ff1b659e4ad2!2s123%20Street%20Name%2C%20San%20Francisco%2C%20CA%2044177!5e0!3m2!1sen!2sus!4v1618316262417!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
