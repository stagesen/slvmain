import { Heart, Shield, Star, Users, ThumbsUp, Clock } from "lucide-react";

const features = [
  {
    icon: <Star className="h-10 w-10 text-primary" />,
    title: "Comprehensive Listings",
    description: "Access detailed information about every senior care facility across Colorado's Front Range."
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Trusted Information",
    description: "All facilities are thoroughly vetted and regularly updated for accuracy."
  },
  {
    icon: <Heart className="h-10 w-10 text-primary" />,
    title: "Family-Focused",
    description: "Tools and resources designed specifically for families making important care decisions."
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Time-Saving",
    description: "Compare multiple facilities side-by-side without having to spend weeks researching."
  },
  {
    icon: <ThumbsUp className="h-10 w-10 text-primary" />,
    title: "Honest Reviews",
    description: "Read authentic experiences from residents and family members to inform your choice."
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Expert Support",
    description: "Access to senior living advisors who can provide personalized recommendations."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SeniorLivingColorado</h2>
          <p className="text-lg text-gray-600">
            We're dedicated to helping seniors and their families find the perfect care solution 
            with reliable information and personalized support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;