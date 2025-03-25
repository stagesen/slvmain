import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import FacilityDetail from "@/components/facilities/FacilityDetail";
import { fetchFacilityBySlug } from "@/lib/api";

const FacilityDetails = () => {
  const { slug } = useParams();
  const [, navigate] = useLocation();

  // Fetch facility details by slug
  const {
    data: facility,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`/api/facilities/slug/${slug}`],
    queryFn: () => fetchFacilityBySlug(slug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  // Set page title
  useEffect(() => {
    if (facility) {
      document.title = `${facility.name} | SeniorLivingColorado`;
    } else {
      document.title = "Facility Details | SeniorLivingColorado";
    }

    return () => {
      document.title = "SeniorLivingColorado";
    };
  }, [facility]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Back button */}
      <Button
        variant="ghost"
        className="mb-4 pl-0 hover:bg-transparent"
        onClick={handleGoBack}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Results
      </Button>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-12 w-12 text-primary-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading facility details...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-16 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Facility Not Found</h2>
          <p className="text-gray-600 mb-6">
            {error instanceof Error
              ? error.message
              : "The facility you're looking for couldn't be found or is no longer available."}
          </p>
          <Button onClick={() => navigate("/facilities")}>
            Browse All Facilities
          </Button>
        </div>
      ) : facility ? (
        <FacilityDetail facility={facility} />
      ) : null}
    </div>
  );
};

export default FacilityDetails;
