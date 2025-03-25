import QuizForm from "@/components/quiz/QuizForm";

const Quiz = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Senior Care Assessment Quiz</h1>
          <p className="text-gray-600">
            Answer a few questions to get personalized care recommendations tailored to your needs.
          </p>
        </div>

        <QuizForm />
      </div>
    </div>
  );
};

export default Quiz;
