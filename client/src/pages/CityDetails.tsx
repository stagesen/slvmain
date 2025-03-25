import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import FacilityCard from "@/components/facilities/FacilityCard";
import CityHeader from "@/components/cities/CityHeader";
import { ServiceType } from "@shared/schema";
import { fetchCityBySlug, fetchCityFacilities } from "@/lib/api";

const CityDetails = () => {
  const { slug } = useParams();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<string>("");

  // Fetch city details
  const {
    data: cityData,
    isLoading: isCityLoading,
    isError: isCityError,
  } = useQuery({
    queryKey: [`/api/cities/${slug}`],
    queryFn: () => fetchCityBySlug(slug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  // Fetch city facilities with optional service type filter
  const {
    data: facilities = [],
    isLoading: isFacilitiesLoading,
    refetch: refetchFacilities,
  } = useQuery({
    queryKey: [`/api/cities/${slug}/facilities`, { type: activeTab }],
    queryFn: () => fetchCityFacilities(slug, activeTab as ServiceType),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !isCityLoading && !isCityError,
  });

  // Set page title
  useEffect(() => {
    if (cityData) {
      document.title = `${cityData.name}, CO Senior Care | SeniorLivingColorado`;
    } else {
      document.title = "City Details | SeniorLivingColorado";
    }

    return () => {
      document.title = "SeniorLivingColorado";
    };
  }, [cityData]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // When tab changes, refetch facilities
  useEffect(() => {
    if (!isCityLoading && !isCityError) {
      refetchFacilities();
    }
  }, [activeTab, refetchFacilities, isCityLoading, isCityError]);

  const handleGoBack = () => {
    navigate("/facilities");
  };

  const isLoading = isCityLoading || isFacilitiesLoading;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Back button */}
      <Button
        variant="ghost"
        className="mb-4 pl-0 hover:bg-transparent"
        onClick={handleGoBack}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        All Cities
      </Button>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-12 w-12 text-primary-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading city information...</p>
        </div>
      ) : isCityError ? (
        <div className="text-center py-16 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">City Not Found</h2>
          <p className="text-gray-600 mb-6">
            The city you're looking for couldn't be found or is no longer available.
          </p>
          <Button onClick={() => navigate("/facilities")}>
            Browse All Facilities
          </Button>
        </div>
      ) : cityData ? (
        <div className="space-y-8">
          {/* City Header */}
          <CityHeader
            city={cityData}
            serviceCounts={cityData.serviceCounts}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          {/* Facilities List */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {activeTab
                ? `${cityData.name} ${activeTab.replace("_", " ").toTitleCase()} Facilities`
                : `All Senior Care Facilities in ${cityData.name}`}
            </h2>

            {facilities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map((facility) => (
                  <FacilityCard key={facility.id} facility={facility} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">
                  No {activeTab ? activeTab.replace("_", " ").toTitleCase() : ""} facilities found in {cityData.name}.
                </p>
                {activeTab && (
                  <Button variant="outline" onClick={() => setActiveTab("")}>
                    View All Facilities
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* City Resources Section */}
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-4">Senior Resources in {cityData.name}</h2>
            <p className="text-gray-600 mb-6">
              Discover local organizations, support groups, and services available for seniors in the {cityData.name} area.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Local Senior Centers</h3>
                <p className="text-gray-600 mb-4">
                  Senior centers provide social activities, meals, education, and various services for older adults.
                </p>
                <Button variant="outline">Find Senior Centers</Button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Transportation Services</h3>
                <p className="text-gray-600 mb-4">
                  Transportation options for seniors who no longer drive, including public transit, ride services, and volunteer programs.
                </p>
                <Button variant="outline">Explore Transportation Options</Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CityDetails;
