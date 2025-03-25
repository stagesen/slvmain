import { Link } from "wouter";
import { CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Find the Perfect Senior Care Solution?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take our quick assessment to get personalized facility recommendations based on your needs, preferences, and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/quiz">
              <Button
                className="w-full py-6 text-base bg-primary-600 hover:bg-primary-700"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Take the Care Assessment Quiz
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="w-full py-6 text-base text-primary-600 border-primary-600 hover:bg-primary-50"
              >
                <Phone className="h-5 w-5 mr-2" />
                Speak with a Care Advisor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
