import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const About = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former healthcare administrator with 15+ years of experience in senior care facilities across Colorado.",
      imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Michael Rodriguez",
      role: "Director of Care Services",
      bio: "Licensed nurse practitioner specializing in geriatric care with a passion for helping families find the right care solutions.",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Jennifer Chen",
      role: "Family Outreach Coordinator",
      bio: "Social worker with expertise in senior transitions and family dynamics during the care selection process.",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "David Thompson",
      role: "Technology Director",
      bio: "Tech innovator focused on creating accessible digital tools for seniors and their families navigating care options.",
      imageUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
  ];

  // Timeline milestones
  const milestones = [
    {
      year: 2019,
      title: "Company Founded",
      description: "SeniorLivingColorado was established to address the growing need for transparent information about senior care options in Colorado.",
    },
    {
      year: 2020,
      title: "Launch of Online Platform",
      description: "Our comprehensive facility database and search tools went live, helping Colorado families find the right care solutions.",
    },
    {
      year: 2021,
      title: "Resource Center Development",
      description: "Expanded our services to include educational resources, guides, and personalized consultations for families.",
    },
    {
      year: 2022,
      title: "AI Assistant Integration",
      description: "Introduced our AI-powered care assistant to provide 24/7 guidance to users exploring senior care options.",
    },
    {
      year: 2023,
      title: "Statewide Expansion",
      description: "Extended our coverage to include all major cities and communities across Colorado's Front Range.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Mission Section */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Our Mission</h1>
          <p className="text-xl text-gray-700 mb-8">
            SeniorLivingColorado is dedicated to helping Colorado families find the perfect senior care solution with confidence and clarity.
          </p>
          <div className="bg-primary-50 p-8 rounded-lg border border-primary-100">
            <p className="text-gray-700 italic">
              "We believe that every senior deserves exceptional care that respects their dignity, honors their preferences, and enhances their quality of life. Our mission is to empower families with the knowledge, tools, and support they need to make informed decisions about senior care."
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-primary-600 text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* History Timeline */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Journey</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-100"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary-600"></div>

                {/* Content */}
                <div className="w-5/12"></div>
                <div
                  className={`w-5/12 bg-white p-6 rounded-lg shadow-sm ${
                    index % 2 === 0 ? "mr-8 text-right" : "ml-8"
                  }`}
                >
                  <div className="text-primary-600 font-bold mb-1">{milestone.year}</div>
                  <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-16 bg-gray-50 py-12 px-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-8 text-center">What Families Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex text-amber-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-4">
              "SeniorLivingColorado made finding care for my father so much easier. The comparison tools and personalized recommendations saved us weeks of research. We found the perfect memory care facility in Boulder."
            </p>
            <p className="font-medium">- Rebecca T., Denver</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex text-amber-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-4">
              "The AI assistant was incredibly helpful in guiding me through the different care options available. I appreciated the honest information about costs and what to expect. Highly recommend this service!"
            </p>
            <p className="font-medium">- Michael S., Colorado Springs</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Ready to Find the Right Care?</h2>
        <p className="text-gray-600 mb-8">
          Let us help you navigate the senior care journey with confidence and clarity.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/quiz">
            <Button size="lg">Take Our Care Assessment</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">Contact Our Team</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
