import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { fetchCities } from "@/lib/api";

const CitySelector = () => {
  const { data: cities = [], isLoading } = useQuery({
    queryKey: ["/api/cities"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Limit to 6 cities for display
  const displayCities = cities.slice(0, 6);

  return (
    <section id="cities" className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Explore by City
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Find senior care facilities in major cities across Colorado's Front Range.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeleton
            Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="relative h-64 rounded-lg overflow-hidden bg-gray-200 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <div className="h-6 bg-gray-300 rounded mb-1 w-24"></div>
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            displayCities.map((city) => (
              <Link key={city.slug} href={`/cities/${city.slug}`} className="block group">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src={city.imageUrl}
                    alt={`${city.name} cityscape`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-white text-xl font-bold mb-1">
                        {city.name}
                      </h3>
                      <p className="text-white text-sm opacity-90">
                        {city.facilityCount} Facilities
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/facilities"
            className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800"
          >
            View All Colorado Cities
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
      </div>
    </section>
  );
};

export default CitySelector;
