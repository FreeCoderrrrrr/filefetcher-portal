import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "1",
    title: "Choose Your File",
    description: "Select the file you want to download from our extensive library",
  },
  {
    number: "2",
    title: "Start Download",
    description: "Click the download button to begin the process",
  },
  {
    number: "3",
    title: "Enjoy",
    description: "Your file will be downloaded quickly and securely",
  },
];

export const HowItWorks = () => {
  return (
    <div className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button size="lg">Get Started Now</Button>
        </div>
      </div>
    </div>
  );
};