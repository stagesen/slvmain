import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResourceCardProps {
  resource: {
    id: number;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    slug: string;
  };
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const { title, description, category, imageUrl, slug } = resource;

  return (
    <Card className="overflow-hidden group h-full flex flex-col">
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        <img
          src={imageUrl || "https://images.unsplash.com/photo-1581579186913-45ac9e9bf85e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardContent className="pt-5 flex-grow">
        <Badge variant="outline" className="mb-2 text-primary-600 bg-primary-50 border-primary-200">
          {category}
        </Badge>
        <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-primary-600 transition">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">
          {description}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link
          href={`/resources#${slug}`}
          className="text-primary-600 font-medium hover:text-primary-800 inline-flex items-center text-sm"
        >
          Read More
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
