import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { QuizFormData } from "@shared/types";
import { ServiceType } from "@shared/schema";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchServiceTypes, fetchCities } from "@/lib/api";
import { Loader2, CheckCircle } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  careType: z.string().min(1, "Please select a care type"),
  budget: z.string().optional(),
  timeframe: z.string().optional(),
  locationPreference: z.string().optional(),
  additionalNotes: z.string().optional(),
});

// Quiz steps
type QuizStep = "care-needs" | "location" | "budget" | "contact" | "submitted";

const QuizForm = () => {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState<QuizStep>("care-needs");
  const [matchedFacilities, setMatchedFacilities] = useState<any[]>([]);
  const { toast } = useToast();

  // Create form
  const form = useForm<QuizFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      careType: "",
      budget: "",
      timeframe: "",
      locationPreference: "",
      additionalNotes: "",
    },
  });

  // Fetch service types and cities
  const { data: serviceTypes = [] } = useQuery({
    queryKey: ["/api/service-types"],
  });

  const { data: cities = [] } = useQuery({
    queryKey: ["/api/cities"],
  });

  // Budget options
  const budgetOptions = [
    { value: "under_3000", label: "Under $3,000/month" },
    { value: "3000_5000", label: "$3,000 - $5,000/month" },
    { value: "5000_7500", label: "$5,000 - $7,500/month" },
    { value: "7500_plus", label: "Over $7,500/month" },
    { value: "not_sure", label: "Not Sure" },
  ];

  // Timeframe options
  const timeframeOptions = [
    { value: "immediately", label: "Immediately" },
    { value: "within_1_month", label: "Within 1 month" },
    { value: "within_3_months", label: "Within 3 months" },
    { value: "within_6_months", label: "Within 6 months" },
    { value: "just_researching", label: "Just researching" },
  ];

  // Submit quiz mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: QuizFormData) => {
      const response = await apiRequest("POST", "/api/quiz/submit", data);
      return response.json();
    },
    onSuccess: (data) => {
      setMatchedFacilities(data.matchedFacilities || []);
      setCurrentStep("submitted");
      toast({
        title: "Quiz Submitted",
        description: "We've received your preferences and will be in touch soon!",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your quiz. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting quiz:", error);
    },
  });

  // Handle form submission
  const onSubmit = (data: QuizFormData) => {
    mutate(data);
  };

  // Calculate progress percentage
  const getProgress = () => {
    switch (currentStep) {
      case "care-needs":
        return 25;
      case "location":
        return 50;
      case "budget":
        return 75;
      case "contact":
        return 100;
      default:
        return 100;
    }
  };

  // Handle continue to next step
  const handleContinue = () => {
    switch (currentStep) {
      case "care-needs":
        if (form.getValues("careType")) {
          setCurrentStep("location");
        } else {
          form.setError("careType", { message: "Please select a care type" });
        }
        break;
      case "location":
        setCurrentStep("budget");
        break;
      case "budget":
        setCurrentStep("contact");
        break;
      case "contact":
        form.handleSubmit(onSubmit)();
        break;
    }
  };

  // Handle back to previous step
  const handleBack = () => {
    switch (currentStep) {
      case "location":
        setCurrentStep("care-needs");
        break;
      case "budget":
        setCurrentStep("location");
        break;
      case "contact":
        setCurrentStep("budget");
        break;
    }
  };

  // View matched facilities
  const viewFacilities = () => {
    navigate("/facilities");
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 transition-all duration-300"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Care Needs</span>
            <span>Location</span>
            <span>Budget</span>
            <span>Contact</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Care Needs */}
            {currentStep === "care-needs" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">What type of care are you looking for?</h2>
                <p className="text-center text-gray-600 mb-6">
                  This helps us match you with the right facilities and resources.
                </p>

                <FormField
                  control={form.control}
                  name="careType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Care Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select care type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the type of care that best matches your needs.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Any specific care requirements?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about any specific needs or medical conditions..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This helps us better understand your situation (optional).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === "location" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">
                  Where are you looking for care?
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  We'll match you with facilities in your preferred area.
                </p>

                <FormField
                  control={form.control}
                  name="locationPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Location</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a city" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">Any Location</SelectItem>
                          {cities.map((city) => (
                            <SelectItem key={city.slug} value={city.slug}>
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select your preferred city or area in Colorado.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 3: Budget & Timeframe */}
            {currentStep === "budget" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">
                  What is your budget and timeframe?
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  This helps us find options that work with your financial plan.
                </p>

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Budget</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {budgetOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select your approximate monthly budget for care.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeframe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>When do you need care?</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeframeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Let us know your timeline for finding care.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 4: Contact Information */}
            {currentStep === "contact" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">
                  Your Contact Information
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  We'll use this to send you your personalized recommendations.
                </p>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email address" {...field} />
                      </FormControl>
                      <FormDescription>
                        We'll send your recommendations to this address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormDescription>
                        If you'd like us to call you with recommendations.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Success Message */}
            {currentStep === "submitted" && (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Thank You!</h2>
                <p className="text-gray-600">
                  We've received your preferences and matched you with{" "}
                  <span className="font-semibold">
                    {matchedFacilities.length} facilities
                  </span>{" "}
                  that meet your criteria.
                </p>
                <p className="text-gray-600">
                  We'll email your personalized recommendations shortly. A care
                  advisor may also reach out to provide additional assistance.
                </p>
                <Button 
                  type="button" 
                  onClick={viewFacilities} 
                  className="mt-4"
                >
                  View Matched Facilities
                </Button>
              </div>
            )}

            {/* Navigation buttons */}
            {currentStep !== "submitted" && (
              <div className="flex justify-between mt-8">
                {currentStep !== "care-needs" ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                <Button
                  type="button"
                  onClick={handleContinue}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : currentStep === "contact" ? (
                    "Submit"
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default QuizForm;
