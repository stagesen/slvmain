import { Link } from "wouter";

const ResourceSection = () => {
  // Sample resource data
  const resources = [
    {
      id: 1,
      title: "Understanding Care Types",
      description: "Learn about the different types of senior care and which one is right for your loved one.",
      category: "Guide",
      imageUrl: "https://images.unsplash.com/photo-1581579186913-45ac9e9bf85e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "understanding-care-types",
    },
    {
      id: 2,
      title: "Paying for Senior Care",
      description: "Explore financial options, insurance coverage, and assistance programs for senior care.",
      category: "Financial",
      imageUrl: "https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "paying-for-senior-care",
    },
    {
      id: 3,
      title: "Facility Visit Checklist",
      description: "Know what to look for and what questions to ask when touring senior living facilities.",
      category: "Checklist",
      imageUrl: "https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "facility-visit-checklist",
    },
    {
      id: 4,
      title: "Having the Conversation",
      description: "Tips for discussing senior care options with your loved ones compassionately.",
      category: "Family",
      imageUrl: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      slug: "having-the-conversation",
    },
  ];

  return (
    <section id="resources" className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Senior Care Resources
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Access helpful guides and information to support your senior care journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource) => (
            <Link key={resource.id} href={`/resources#${resource.slug}`} className="block group">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden h-full">
                <div className="h-40 bg-gray-200 relative overflow-hidden">
                  <img
                    src={resource.imageUrl}
                    alt={resource.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                    {resource.category}
                  </span>
                  <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-primary-600 transition">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{resource.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/resources"
            className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800"
          >
            Browse All Resources
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResourceSection;
