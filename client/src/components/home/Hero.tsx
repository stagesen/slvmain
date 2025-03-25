import { useState } from "react";
import { useLocation } from "wouter";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { ServiceType } from "@shared/schema";
import { ServiceTypeInfo } from "@shared/types";
import { fetchCities, fetchServiceTypes } from "@/lib/api";

const Hero = () => {
  const [, navigate] = useLocation();
  const [location, setLocation] = useState("");
  const [careType, setCareType] = useState("");

  const { data: cities = [] } = useQuery({
    queryKey: ["/api/cities"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: serviceTypes = [] } = useQuery({
    queryKey: ["/api/service-types"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location && location !== "all") params.append("city", location);
    if (careType && careType !== "all") params.append("type", careType);
    
    navigate(`/facilities?${params.toString()}`);
  };

  return (
    <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Find the Perfect Senior Care Solution in Colorado
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Discover top-rated senior care facilities across Colorado's Front Range. 
            Compare options and find the perfect fit for your loved ones.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <Label 
                  htmlFor="search-location" 
                  className="block text-sm font-medium text-gray-700 text-left mb-1"
                >
                  Location
                </Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="search-location" className="w-full">
                    <SelectValue placeholder="All Colorado Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Colorado Cities</SelectItem>
                    {Array.isArray(cities) && cities.map((city: any) => (
                      <SelectItem key={city.slug} value={city.slug}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Label 
                  htmlFor="search-type" 
                  className="block text-sm font-medium text-gray-700 text-left mb-1"
                >
                  Care Type
                </Label>
                <Select value={careType} onValueChange={setCareType}>
                  <SelectTrigger id="search-type" className="w-full">
                    <SelectValue placeholder="All Care Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Care Types</SelectItem>
                    {Array.isArray(serviceTypes) && serviceTypes.map((type: any) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:self-end">
                <Button
                  className="w-full h-10"
                  onClick={handleSearch}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
