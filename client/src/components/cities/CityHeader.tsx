import { City } from "@shared/types";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceType } from "@shared/schema";
import { getServiceTypeName } from "@/lib/utils";

interface CityHeaderProps {
  city: City;
  serviceCounts?: Record<ServiceType, number>;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const CityHeader = ({ city, serviceCounts, activeTab, onTabChange }: CityHeaderProps) => {
  const { name, state, description, imageUrl, facilityCount } = city;

  // Prepare service types with counts for tabs
  const serviceTypesWithCounts = Object.entries(serviceCounts || {})
    .filter(([_, count]) => count > 0)
    .sort(([_, countA], [__, countB]) => (countB as number) - (countA as number))
    .slice(0, 4); // Only display top 4 service types

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative h-64 overflow-hidden rounded-lg">
        <img
          src={
            imageUrl ||
            "https://images.unsplash.com/photo-1546156929-a4c0ac411f47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80"
          }
          alt={`${name}, Colorado cityscape`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 w-full">
            <h1 className="text-white text-3xl font-bold mb-2">{name}, {state}</h1>
            <div className="flex items-center text-white opacity-90">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{facilityCount} Senior Care Facilities</span>
            </div>
          </div>
        </div>
      </div>

      {/* City Description */}
      <div>
        <p className="text-gray-700 mb-4">{description}</p>
      </div>

      {/* City Statistics */}
      <div className="flex flex-wrap gap-3 mb-2">
        {serviceTypesWithCounts.map(([type, count]) => (
          <Badge 
            key={type} 
            variant="outline" 
            className="bg-gray-100 font-medium text-gray-800 text-xs flex items-center gap-1"
          >
            {getServiceTypeName(type as ServiceType)}
            <span className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full ml-1">
              {count}
            </span>
          </Badge>
        ))}
      </div>

      {/* Filter Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="">All Facilities</TabsTrigger>
          {serviceTypesWithCounts.map(([type, count]) => (
            <TabsTrigger key={type} value={type}>
              {getServiceTypeName(type as ServiceType)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CityHeader;
