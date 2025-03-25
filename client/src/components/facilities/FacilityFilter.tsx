import { useCallback, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ServiceType } from "@shared/schema";
import { FilterValues } from "@shared/types";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "@/lib/utils";
import { fetchServiceTypes, fetchCities } from "@/lib/api";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FacilityFilterProps {
  initialFilters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
}

const FacilityFilter = ({ initialFilters, onFilterChange }: FacilityFilterProps) => {
  const [, navigate] = useLocation();
  const [filters, setFilters] = useState<FilterValues>(initialFilters);
  
  // Fetch service types and cities for filter options
  const { data: serviceTypes = [] } = useQuery({
    queryKey: ["/api/service-types"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const { data: cities = [] } = useQuery({
    queryKey: ["/api/cities"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Common amenities for filtering
  const commonAmenities = [
    "Fitness Center", 
    "Swimming Pool", 
    "Beauty Salon/Barber", 
    "Pet Friendly", 
    "Transportation Services", 
    "Garden/Outdoor Spaces",
    "Housekeeping",
    "24-Hour Security"
  ];

  // Debounced filter change to prevent too many rerenders
  const debouncedFilterChange = useCallback(
    debounce((newFilters: FilterValues) => {
      onFilterChange(newFilters);
    }, 300),
    [onFilterChange]
  );

  // Update URL with filter parameters
  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.city) params.append("city", filters.city);
    if (filters.serviceType) params.append("type", filters.serviceType);
    if (filters.rating > 0) params.append("rating", filters.rating.toString());
    if (filters.minPrice > 0) params.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice > 0) params.append("maxPrice", filters.maxPrice.toString());
    if (filters.sort) params.append("sort", filters.sort);
    if (filters.amenities.length > 0) params.append("amenities", filters.amenities.join(','));
    
    navigate(`/facilities?${params.toString()}`);
  }, [navigate, filters]);

  // Apply all filters
  const applyFilters = () => {
    debouncedFilterChange(filters);
    updateUrl();
  };

  // Reset all filters
  const resetFilters = () => {
    const resetValues: FilterValues = {
      search: "",
      city: "all",
      serviceType: "all",
      amenities: [],
      rating: 0,
      minPrice: 0,
      maxPrice: 0,
      sort: "rating",
    };
    
    setFilters(resetValues);
    onFilterChange(resetValues);
    navigate("/facilities");
  };

  // Update filters when a value changes
  const handleFilterChange = (key: keyof FilterValues, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Toggle an amenity in the amenities array
  const toggleAmenity = (amenity: string) => {
    setFilters((prev) => {
      const isSelected = prev.amenities.includes(amenity);
      const updatedAmenities = isSelected
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity];
      
      return {
        ...prev,
        amenities: updatedAmenities,
      };
    });
  };

  // Apply filters when initialFilters change
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Search */}
          <div>
            <Label htmlFor="search" className="text-base">Search</Label>
            <Input
              id="search"
              placeholder="Search by name or description"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <Accordion type="single" collapsible defaultValue="location" className="w-full">
            {/* Location Filter */}
            <AccordionItem value="location">
              <AccordionTrigger className="text-base font-medium">Location</AccordionTrigger>
              <AccordionContent>
                <Select
                  value={filters.city}
                  onValueChange={(value) => handleFilterChange("city", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {Array.isArray(cities) && cities.map((city: any) => (
                      <SelectItem key={city.slug} value={city.slug}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            {/* Care Type Filter */}
            <AccordionItem value="careType">
              <AccordionTrigger className="text-base font-medium">Care Type</AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={filters.serviceType}
                  onValueChange={(value) => handleFilterChange("serviceType", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all-types" />
                    <Label htmlFor="all-types">All Types</Label>
                  </div>
                  {Array.isArray(serviceTypes) && serviceTypes.map((type: any) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={type.id} id={type.id} />
                      <Label htmlFor={type.id}>{type.name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>

            {/* Rating Filter */}
            <AccordionItem value="rating">
              <AccordionTrigger className="text-base font-medium">Minimum Rating</AccordionTrigger>
              <AccordionContent>
                <div className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <span>Any Rating</span>
                    <span>5 Stars</span>
                  </div>
                  <Slider
                    value={[filters.rating]}
                    min={0}
                    max={5}
                    step={1}
                    onValueChange={(value) => handleFilterChange("rating", value[0])}
                  />
                  <div className="mt-2 text-center">
                    {filters.rating ? (
                      <span>Minimum {filters.rating} stars</span>
                    ) : (
                      <span>Any Rating</span>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Price Range Filter */}
            <AccordionItem value="price">
              <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="minPrice">Minimum Price ($/month)</Label>
                    <Input
                      id="minPrice"
                      type="number"
                      placeholder="Min $"
                      min={0}
                      step={500}
                      value={filters.minPrice || ""}
                      onChange={(e) => handleFilterChange("minPrice", Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxPrice">Maximum Price ($/month)</Label>
                    <Input
                      id="maxPrice"
                      type="number"
                      placeholder="Max $"
                      min={0}
                      step={500}
                      value={filters.maxPrice || ""}
                      onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Amenities Filter */}
            <AccordionItem value="amenities">
              <AccordionTrigger className="text-base font-medium">Amenities</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {commonAmenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={`amenity-${amenity}`}
                        checked={filters.amenities.includes(amenity)}
                        onCheckedChange={() => toggleAmenity(amenity)}
                      />
                      <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Sort */}
            <AccordionItem value="sort">
              <AccordionTrigger className="text-base font-medium">Sort Results</AccordionTrigger>
              <AccordionContent>
                <Select
                  value={filters.sort}
                  onValueChange={(value) => handleFilterChange("sort", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating (High to Low)</SelectItem>
                    <SelectItem value="price_asc">Price (Low to High)</SelectItem>
                    <SelectItem value="price_desc">Price (High to Low)</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="w-full" onClick={applyFilters}>
              Apply Filters
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={resetFilters}
            >
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacilityFilter;
