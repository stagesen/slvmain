import { Link } from "wouter";
import { Search, FileText, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Discover Options",
      description:
        "Browse facilities by city, care type, or use our personalized quiz to find the right match for your needs.",
      icon: <Search className="h-8 w-8 text-primary-600" />,
    },
    {
      number: 2,
      title: "Compare & Research",
      description:
        "View detailed information, photos, pricing, and read reviews from other families to make informed decisions.",
      icon: <FileText className="h-8 w-8 text-primary-600" />,
    },
    {
      number: 3,
      title: "Connect & Visit",
      description:
        "Schedule tours, request information, or speak with our care advisors to find the perfect community.",
      icon: <MapPin className="h-8 w-8 text-primary-600" />,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          How SeniorLivingColorado Works
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Find the perfect senior care solution in just a few simple steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div className="text-center" key={step.number}>
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/quiz">
            <Button className="px-6 py-3">
              Take Our Care Quiz
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
