import { LinkedinIcon, GithubIcon, TwitterIcon } from "lucide-react";

const teamMembers = [
  {
    name: "Emily Henderson",
    role: "Senior Living Advisor",
    bio: "With over 15 years in geriatric care management, Emily helps families navigate complex care decisions.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    socialLinks: [
      { icon: <LinkedinIcon className="h-5 w-5" />, url: "#linkedin" },
      { icon: <TwitterIcon className="h-5 w-5" />, url: "#twitter" }
    ]
  },
  {
    name: "Dr. Michael Chen",
    role: "Medical Consultant",
    bio: "Board-certified geriatrician bringing healthcare expertise to help match seniors with appropriate care levels.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    socialLinks: [
      { icon: <LinkedinIcon className="h-5 w-5" />, url: "#linkedin" },
      { icon: <GithubIcon className="h-5 w-5" />, url: "#github" }
    ]
  },
  {
    name: "Sarah Washington",
    role: "Community Outreach Director",
    bio: "Former assisted living administrator who builds partnerships with facilities across Colorado.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    socialLinks: [
      { icon: <LinkedinIcon className="h-5 w-5" />, url: "#linkedin" },
      { icon: <TwitterIcon className="h-5 w-5" />, url: "#twitter" }
    ]
  },
  {
    name: "Robert Martinez",
    role: "Technology Lead",
    bio: "Tech expert focused on making our platform accessible and easy to use for seniors and their families.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    socialLinks: [
      { icon: <LinkedinIcon className="h-5 w-5" />, url: "#linkedin" },
      { icon: <GithubIcon className="h-5 w-5" />, url: "#github" }
    ]
  }
];

const Team = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600">
            Our dedicated team of senior living experts is committed to helping you find the perfect care solution.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src={member.imageUrl} 
                alt={member.name} 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex space-x-3">
                  {member.socialLinks.map((link, i) => (
                    <a 
                      key={i} 
                      href={link.url} 
                      className="text-gray-500 hover:text-primary transition-colors"
                      aria-label={`${member.name}'s social media`}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;