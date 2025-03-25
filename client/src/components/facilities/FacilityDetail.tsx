import { useMemo } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Facility } from "@shared/types";
import { 
  MapPin, Phone, Globe, Mail, Star, Calendar, Share2, 
  Bookmark, BadgeCheck, CheckCircle, Coffee, Utensils 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchFacilityReviews } from "@/lib/api";
import { getServiceTypeName, formatPhoneNumber } from "@/lib/utils";

interface FacilityDetailProps {
  facility: Facility;
}

const FacilityDetail = ({ facility }: FacilityDetailProps) => {
  const {
    id,
    name,
    address,
    city,
    state,
    zipCode,
    phone,
    website,
    email,
    serviceType,
    description,
    rating,
    reviewCount,
    amenities,
    services,
    imageUrls,
    pricing,
    latitude,
    longitude,
  } = facility;

  // Fetch facility reviews
  const { data: reviews = [], isLoading: isLoadingReviews } = useQuery({
    queryKey: [`/api/facilities/${id}/reviews`],
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Format pricing information
  const priceDisplay = useMemo(() => {
    if (!pricing) return "Contact for pricing";
    
    const price = pricing as any; // Type assertion
    
    if (price.baseMonthlyMin && price.baseMonthlyMax) {
      return `$${price.baseMonthlyMin.toLocaleString()} - $${price.baseMonthlyMax.toLocaleString()}/month`;
    } else if (price.baseMonthlyMin) {
      return `Starting at $${price.baseMonthlyMin.toLocaleString()}/month`;
    } else if (price.respiteDailyMin) {
      return `$${price.respiteDailyMin.toLocaleString()}/day`;
    } else {
      return "Contact for pricing";
    }
  }, [pricing]);

  // Group amenities by category for better organization
  const groupedAmenities = useMemo(() => {
    const groups = {
      Lifestyle: [] as string[],
      Services: [] as string[],
      Facilities: [] as string[],
      Medical: [] as string[],
      Other: [] as string[],
    };

    // Simple categorization logic
    amenities.forEach(amenity => {
      if (/pool|fitness|activity|game|library|garden|art/i.test(amenity)) {
        groups.Lifestyle.push(amenity);
      } else if (/dining|meal|transportation|housekeeping|laundry/i.test(amenity)) {
        groups.Services.push(amenity);
      } else if (/room|apartment|studio|patio|common|salon/i.test(amenity)) {
        groups.Facilities.push(amenity);
      } else if (/nurse|medical|therapy|medication|care|health|staff/i.test(amenity)) {
        groups.Medical.push(amenity);
      } else {
        groups.Other.push(amenity);
      }
    });

    return Object.entries(groups).filter(([_, items]) => items.length > 0);
  }, [amenities]);

  // Main gallery image and thumbnails
  const mainImage = imageUrls?.[0] || imageUrls?.[0] || "";
  const thumbnails = imageUrls?.slice(1, 5) || [];

  return (
    <div className="space-y-8">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <img
            src={mainImage || "https://images.unsplash.com/photo-1580247817119-c6ed8035d619?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80"}
            alt={name}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {thumbnails.length > 0 ? (
            thumbnails.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${name} - image ${index + 2}`}
                className="w-full h-[120px] object-cover rounded-lg"
              />
            ))
          ) : (
            <>
              <div className="bg-gray-200 h-[120px] rounded-lg"></div>
              <div className="bg-gray-200 h-[120px] rounded-lg"></div>
              <div className="bg-gray-200 h-[120px] rounded-lg"></div>
              <div className="bg-gray-200 h-[120px] rounded-lg"></div>
            </>
          )}
        </div>
      </div>

      {/* Facility Header */}
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-primary-600">{getServiceTypeName(serviceType)}</Badge>
            {rating && (
              <div className="flex items-center">
                <Star className="h-4 w-4 text-amber-500" fill="currentColor" />
                <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
                {reviewCount && (
                  <span className="text-sm text-gray-500 ml-1">
                    ({reviewCount} reviews)
                  </span>
                )}
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{`${address}, ${city}, ${state} ${zipCode}`}</span>
          </div>
        </div>
        
        <div className="flex flex-col mt-4 md:mt-0 gap-2">
          <Button variant="outline" className="justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Tour
          </Button>
          <Button variant="outline" className="justify-start">
            <Bookmark className="mr-2 h-4 w-4" />
            Save to Favorites
          </Button>
          <Button variant="outline" className="justify-start">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Key Information Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <Tabs defaultValue="description">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="description">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              {/* Description Tab */}
              <TabsContent value="description" className="space-y-4">
                <h3 className="text-xl font-semibold">About {name}</h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {description || "No description available."}
                </p>
              </TabsContent>

              {/* Amenities Tab */}
              <TabsContent value="amenities" className="space-y-6">
                <h3 className="text-xl font-semibold">Amenities</h3>
                
                {groupedAmenities.length > 0 ? (
                  <div className="space-y-6">
                    {groupedAmenities.map(([category, items]) => (
                      <div key={category}>
                        <h4 className="text-lg font-medium mb-3">{category}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                          {items.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-primary-600" />
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No amenities information available.</p>
                )}
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services" className="space-y-4">
                <h3 className="text-xl font-semibold">Care Services</h3>
                
                {services && services.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-primary-600" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No services information available.</p>
                )}
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-4">
                <h3 className="text-xl font-semibold">Resident Reviews</h3>
                
                {isLoadingReviews ? (
                  <div className="space-y-4">
                    <div className="h-24 bg-gray-100 animate-pulse rounded"></div>
                    <div className="h-24 bg-gray-100 animate-pulse rounded"></div>
                  </div>
                ) : reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">
                                {review.reviewerName || "Anonymous User"}
                              </p>
                              <div className="flex items-center">
                                {Array(5)
                                  .fill(0)
                                  .map((_, i) => (
                                    <Star
                                      key={i}
                                      className="h-4 w-4 text-amber-500"
                                      fill={i < review.rating ? "currentColor" : "none"}
                                    />
                                  ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {review.publishedAt 
                                ? new Date(review.publishedAt).toLocaleDateString() 
                                : ""}
                            </span>
                          </div>
                          <p className="text-gray-700 mt-2">
                            {review.text || "No comment provided."}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No reviews yet.</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Contact & Pricing Card */}
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Pricing</h3>
              <p className="text-2xl font-bold text-primary-600 mb-4">
                {priceDisplay}
              </p>
              {pricing && (pricing as any).entryFee && (
                <p className="text-sm text-gray-600 mb-4">
                  Entry Fee: ${(pricing as any).entryFee.toLocaleString()}
                </p>
              )}
              <Button className="w-full" size="lg">
                Contact for Details
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                {phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary-600" />
                    <a href={`tel:${phone}`} className="hover:text-primary-600">
                      {formatPhoneNumber(phone)}
                    </a>
                  </div>
                )}
                {website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary-600" />
                    <a 
                      href={website.startsWith('http') ? website : `https://${website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-600 truncate"
                    >
                      {website.replace(/^https?:\/\//i, '')}
                    </a>
                  </div>
                )}
                {email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary-600" />
                    <a href={`mailto:${email}`} className="hover:text-primary-600 truncate">
                      {email}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Location Map Placeholder */}
          {(latitude && longitude) ? (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Location</h3>
                <div className="h-48 bg-gray-200 rounded-lg mb-2 relative overflow-hidden">
                  <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&markers=color:red%7C${latitude},${longitude}&key=YOUR_API_KEY`}
                    alt="Map location"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/400x200/e2e8f0/64748b?text=Map+Unavailable";
                    }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {address}, {city}, {state} {zipCode}
                </p>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FacilityDetail;
