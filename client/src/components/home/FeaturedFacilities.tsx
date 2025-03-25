import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import FacilityCard from "@/components/facilities/FacilityCard";
import { ServiceType } from "@shared/schema";
import { fetchFeaturedFacilities } from "@/lib/api";

const FeaturedFacilities = () => {
  const [activeFilter, setActiveFilter] = useState<string>("");
  
  const { data: facilities = [], isLoading } = useQuery({
    queryKey: ["/api/facilities/featured"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Filter facilities by service type if a filter is active
  const filteredFacilities = activeFilter
    ? facilities.filter((facility) => facility.serviceType === activeFilter)
    : facilities;

  return (
    <section id="facilities" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Featured Senior Care Facilities
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Discover our top-rated senior living communities across Colorado.
        </p>

        {/* Filters */}
        <div className="mb-8 flex justify-center">
          <Tabs defaultValue="" value={activeFilter} onValueChange={setActiveFilter}>
            <TabsList>
              <TabsTrigger value="">All Types</TabsTrigger>
              <TabsTrigger value={ServiceType.ASSISTED_LIVING}>Assisted Living</TabsTrigger>
              <TabsTrigger value={ServiceType.MEMORY_CARE}>Memory Care</TabsTrigger>
              <TabsTrigger value={ServiceType.INDEPENDENT_LIVING}>Independent Living</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Facility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeleton
            Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg shadow animate-pulse"
                >
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-5">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="h-6 w-20 bg-gray-200 rounded"></div>
                      <div className="h-6 w-24 bg-gray-200 rounded"></div>
                      <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-10 w-24 bg-gray-200 rounded"></div>
                      <div className="h-10 w-28 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))
          ) : filteredFacilities.length > 0 ? (
            filteredFacilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500">
                No facilities found with the selected filter. Please try another option.
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-10">
          <Link href="/facilities">
            <Button className="px-6 py-3">
              Browse All Facilities
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

export default FeaturedFacilities;
