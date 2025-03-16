import { about_1, about_2 } from "@/utils/assets";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <section className="container mx-auto py-12 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-8xl font-bold text-gray-100 tracking-tight">
            HISTORY
          </h2>
          <p className="text-blue-600 font-semibold mt-2">OUR HISTORY</p>
          <h3 className="text-4xl font-bold mt-2">
            Creative and renovate fashion trends
          </h3>
          <p className="text-gray-600 mt-4">
            Collaboratively administrate empowered markets via plug-and-play
            maintain networks. Dynamically usable procrastinate B2B users after
            installed base benefits. Dramatically visualize customer directed
            convergence without revolutionary ROI.
          </p>

          {/* Statistics */}
          <div className="flex flex-wrap mt-6 gap-8">
            <div>
              <p className="text-4xl font-bold text-blue-600">12</p>
              <p className="text-gray-500">Years Experience</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">20K</p>
              <p className="text-gray-500">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">100%</p>
              <p className="text-gray-500">Client Satisfaction</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src={about_1}
            alt="Shopping cart with bags"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="container mx-auto py-12 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <Image
            src={about_2}
            alt="Couple Shopping"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h2 className="text-8xl font-bold text-gray-100 tracking-tight">
           vision
          </h2>
          <p className="text-blue-600 font-semibold mt-2">Our vision</p>
          <h3 className="text-4xl font-bold mt-2">
          We are marketpress
          </h3>
          <p className="text-gray-600 mt-4">
          Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.
          </p>

          {/* Statistics */}
          <div className="flex flex-wrap mt-6 gap-8">
            <ul>
              <li className="font-meduim">Credibly innovate granular internal</li>
              <li className="font-meduim">Grantedly underconstructions reloaded</li>
              <li className="font-meduim">Interactively procrastinate high-payoff</li>
              <li className="font-meduim">Completely synergize resource taxing relationships</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
