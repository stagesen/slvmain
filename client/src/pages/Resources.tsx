import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, FileText, DollarSign, Scale, Heart, MapPin, Lightbulb, SearchIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ResourceCard from "@/components/resources/ResourceCard";
import { fetchResources } from "@/lib/api";

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Resource categories with icons
  const categories = [
    { id: "all", name: "All Resources", icon: <BookOpen className="h-5 w-5" /> },
    { id: "care-guide", name: "Care Guides", icon: <FileText className="h-5 w-5" /> },
    { id: "financial", name: "Financial", icon: <DollarSign className="h-5 w-5" /> },
    { id: "legal", name: "Legal Planning", icon: <Scale className="h-5 w-5" /> },
    { id: "health", name: "Health Resources", icon: <Heart className="h-5 w-5" /> },
    { id: "local", name: "Local Resources", icon: <MapPin className="h-5 w-5" /> },
  ];

  // Fetch resources
  const { data: resources = [], isLoading } = useQuery({
    queryKey: ["/api/resources", activeCategory !== "all" ? activeCategory : null],
    queryFn: () => fetchResources(activeCategory !== "all" ? activeCategory : undefined),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Filter resources based on search query
  const filteredResources = searchQuery
    ? resources.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : resources;

  // Sample resource data for display
  const sampleResources = [
    {
      id: 1,
      title: "Understanding Care Types",
      description: "Learn about the different types of senior care and which one is right for your loved one.",
      category: "care-guide",
      imageUrl: "https://images.unsplash.com/photo-1581579186913-45ac9e9bf85e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "understanding-care-types",
    },
    {
      id: 2,
      title: "Paying for Senior Care",
      description: "Explore financial options, insurance coverage, and assistance programs for senior care.",
      category: "financial",
      imageUrl: "https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "paying-for-senior-care",
    },
    {
      id: 3,
      title: "Facility Visit Checklist",
      description: "Know what to look for and what questions to ask when touring senior living facilities.",
      category: "care-guide",
      imageUrl: "https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "facility-visit-checklist",
    },
    {
      id: 4,
      title: "Having the Conversation",
      description: "Tips for discussing senior care options with your loved ones compassionately.",
      category: "care-guide",
      imageUrl: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "having-the-conversation",
    },
    {
      id: 5,
      title: "Medicare & Medicaid Guide",
      description: "Understanding Medicare and Medicaid coverage for senior care services in Colorado.",
      category: "financial",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "medicare-medicaid-guide",
    },
    {
      id: 6,
      title: "Legal Planning for Seniors",
      description: "Essential legal documents and considerations for aging adults and their families.",
      category: "legal",
      imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "legal-planning-seniors",
    },
    {
      id: 7,
      title: "Senior Health & Wellness",
      description: "Tips for maintaining physical and mental health during the aging process.",
      category: "health",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "senior-health-wellness",
    },
    {
      id: 8,
      title: "Denver Senior Resources",
      description: "Local organizations, support groups, and services available for seniors in Denver.",
      category: "local",
      imageUrl: "https://images.unsplash.com/photo-1546156929-a4c0ac411f47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "denver-senior-resources",
    },
  ];

  // Use sample resources until backend is ready
  const displayResources = filteredResources.length > 0 ? filteredResources : sampleResources;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">
          Senior Care Resources
        </h1>
        <p className="text-gray-600">
          Access helpful guides, articles, and information to support your senior care journey.
          Find answers to your questions about care types, financing options, and more.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search resources..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs 
        defaultValue="all" 
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="mb-8"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              {category.icon}
              <span className="hidden md:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Resource Grid - Shared across all tabs */}
        <div className="mt-8">
          {searchQuery && filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <Lightbulb className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No matching resources</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any resources matching "{searchQuery}".
              </p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayResources
                .filter(resource => 
                  activeCategory === "all" || resource.category === activeCategory
                )
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
          )}
        </div>
      </Tabs>

      {/* Featured Guide Section */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Complete Guide to Colorado Senior Care</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="mb-4">
                Our comprehensive guide covers everything you need to know about senior care in Colorado, including:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                  <span>Understanding the different types of senior care</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                  <span>Financial planning and payment options</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                  <span>How to evaluate facilities and care providers</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                  <span>Colorado-specific resources and regulations</span>
                </li>
              </ul>
              <Button>
                Download Free Guide
              </Button>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Senior Care Guide"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Check icon component
const CheckIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default Resources;
