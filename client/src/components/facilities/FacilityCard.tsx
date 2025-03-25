import { Link } from "wouter";
import { MapPin, Star } from "lucide-react";
import { Facility } from "@shared/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getServiceTypeName } from "@/lib/utils";

interface FacilityCardProps {
  facility: Facility;
}

const FacilityCard = ({ facility }: FacilityCardProps) => {
  const {
    id,
    slug,
    name,
    city,
    state,
    imageUrl,
    serviceType,
    shortDescription,
    rating,
    amenities,
    isFeatured,
    pricing,
  } = facility;

  // Get up to 3 amenities for display
  const displayAmenities = amenities.slice(0, 3);

  // Format pricing information
  const getPriceDisplay = () => {
    if (!pricing) return "Contact for pricing";
    
    const price = pricing as any; // Type assertion
    
    if (price.baseMonthlyMin) {
      return `$${price.baseMonthlyMin.toLocaleString()}/month`;
    } else if (price.respiteDailyMin) {
      return `$${price.respiteDailyMin.toLocaleString()}/day`;
    } else {
      return "Contact for pricing";
    }
  };

  return (
    <Card className="facility-card border border-gray-200 transition duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img
          src={imageUrl || "https://images.unsplash.com/photo-1580247817119-c6ed8035d619?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
          alt={`${name} facility`}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Badge className="absolute top-3 left-3 bg-primary-600">
          {getServiceTypeName(serviceType)}
        </Badge>
        {isFeatured && (
          <Badge variant="secondary" className="absolute top-3 right-3 bg-amber-500 text-white">
            Featured
          </Badge>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{name}</h3>
          {rating && (
            <div className="flex items-center">
              <Star className="h-5 w-5 text-amber-500" fill="currentColor" />
              <span className="ml-1 text-gray-800 font-semibold">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{`${city}, ${state}`}</span>
        </div>
        {shortDescription && (
          <p className="text-gray-600 mb-4 line-clamp-2">{shortDescription}</p>
        )}
        {displayAmenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {displayAmenities.map((amenity, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800">
                {amenity}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Starting at</span>
            <p className="text-lg font-bold text-gray-900">{getPriceDisplay()}</p>
          </div>
          <Link href={`/facilities/${slug}`}>
            <Button variant="default" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacilityCard;
