import { Testimonial } from "@shared/types";
import { Star } from "lucide-react";

const Testimonials = () => {
  // Sample testimonial data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah J.",
      location: "Denver, CO",
      rating: 5,
      text: "SeniorLivingColorado made finding care for my mother so much easier. The detailed information and comparison tools helped us narrow down options quickly. We found the perfect assisted living facility in just a week!",
      imageUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      name: "David T.",
      location: "Boulder, CO",
      rating: 5,
      text: "When my father needed memory care, I was overwhelmed with options. The AI assistant on this site asked the right questions and suggested facilities that perfectly matched our needs. Saved us so much time!",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      name: "Jennifer R.",
      location: "Colorado Springs, CO",
      rating: 5,
      text: "The resource articles were incredibly helpful in understanding the different types of care available. We were able to make a more informed decision for my aunt's independent living needs. Thank you!",
      imageUrl: "https://images.unsplash.com/photo-1521252659862-eec69941b071?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          What Families Are Saying
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white overflow-hidden">
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex text-amber-500">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5"
                        fill={i < testimonial.rating ? "currentColor" : "none"}
                      />
                    ))}
                </div>
              </div>
              <p className="text-gray-700">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
