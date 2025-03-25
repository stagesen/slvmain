import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { Filter, SlidersHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import FacilityCard from "@/components/facilities/FacilityCard";
import FacilityFilter from "@/components/facilities/FacilityFilter";
import { ServiceType } from "@shared/schema";
import { FilterValues } from "@shared/types";
import { fetchFacilities } from "@/lib/api";

const Facilities = () => {
  const [location] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  
  // Initialize filters from URL parameters
  const initialFilters: FilterValues = {
    search: searchParams.get("search") || "",
    city: searchParams.get("city") || "all",
    serviceType: searchParams.get("type") as ServiceType || "all",
    amenities: searchParams.get("amenities") ? searchParams.get("amenities")!.split(",") : [],
    rating: searchParams.get("rating") ? Number(searchParams.get("rating")) : 0,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 0,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 0,
    sort: searchParams.get("sort") || "rating",
  };
  
  const [filters, setFilters] = useState<FilterValues>(initialFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Prepare query parameters for API
  const queryParams = {
    search: filters.search,
    city: filters.city,
    type: filters.serviceType,
    amenities: filters.amenities.join(","),
    rating: filters.rating > 0 ? filters.rating : undefined,
    minPrice: filters.minPrice > 0 ? filters.minPrice : undefined,
    maxPrice: filters.maxPrice > 0 ? filters.maxPrice : undefined,
    sort: filters.sort,
  };

  // Filter out undefined and empty values
  const sanitizedParams = Object.fromEntries(
    Object.entries(queryParams).filter(([_, v]) => v !== undefined && v !== "")
  );

  // Fetch facilities with filters
  const {
    data: facilities = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["/api/facilities", sanitizedParams],
    queryFn: () => fetchFacilities(sanitizedParams),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  // Reset isInitialLoad after first render
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.city) count++;
    if (filters.serviceType) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.rating > 0) count++;
    if (filters.minPrice > 0) count++;
    if (filters.maxPrice > 0) count++;
    return count;
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Senior Care Facilities</h1>
        <p className="text-gray-600">
          Find and compare senior care facilities across Colorado
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Filters 
                {getActiveFilterCount() > 0 && (
                  <span className="ml-1 bg-primary-100 text-primary-600 px-1.5 py-0.5 rounded-full text-xs">
                    {getActiveFilterCount()}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] sm:w-[400px] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filter Facilities
              </h2>
              <FacilityFilter
                initialFilters={filters}
                onFilterChange={(newFilters) => {
                  handleFilterChange(newFilters);
                  setIsFilterOpen(false);
                }}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:block md:w-1/3 lg:w-1/4">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filter Results
          </h2>
          <FacilityFilter initialFilters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Facilities List */}
        <div className="md:w-2/3 lg:w-3/4">
          {/* Results info and sorting */}
          <div className="flex justify-between items-center mb-6">
            <div>
              {!isLoading && !isError && (
                <p className="text-gray-600">
                  {facilities.length} facilities found
                  {getActiveFilterCount() > 0 && " with your filters"}
                </p>
              )}
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Facilities grid */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 text-primary-600 animate-spin mb-4" />
              <p className="text-gray-600">Loading facilities...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-2">There was an error loading facilities.</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : facilities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility: any) => (
                <FacilityCard key={facility.id} facility={facility} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                No facilities match your current filters. Try adjusting your search criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  const resetFilters: FilterValues = {
                    search: "",
                    city: "all",
                    serviceType: "all",
                    amenities: [],
                    rating: 0,
                    minPrice: 0,
                    maxPrice: 0,
                    sort: "rating",
                  };
                  handleFilterChange(resetFilters);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Facilities;
