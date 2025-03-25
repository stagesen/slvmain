import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ServiceTypeInfo } from "@shared/types";
import { fetchServiceTypes } from "@/lib/api";

const ServiceTypeCards = () => {
  const { data: serviceTypes = [], isLoading } = useQuery<ServiceTypeInfo[]>({
    queryKey: ["/api/service-types"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Limit to first 4 service types for the home page
  const displayServiceTypes = serviceTypes.slice(0, 4);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Senior Care Options
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeleton
            Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 text-center animate-pulse"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2 w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-1/2 mx-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
                </div>
              ))
          ) : (
            displayServiceTypes.map((type: ServiceTypeInfo) => (
              <div
                key={type.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={type.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{type.name}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <p className="text-sm text-gray-500 mb-4">{type.priceRange}</p>
                <Link
                  href={`/facilities?type=${type.id}`}
                  className="text-primary font-medium hover:text-primary/80 inline-flex items-center"
                >
                  Learn More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
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
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceTypeCards;
