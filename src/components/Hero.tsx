import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";

export const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-up">
          Fast & Secure File Downloads
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-up">
          Download your files quickly and securely with our advanced downloading technology
        </p>
        <div className="mb-8 animate-fade-up">
          <SearchBar />
        </div>
        <Button size="lg" className="animate-fade-up">
          <Download className="mr-2 h-5 w-5" />
          Download Now
        </Button>
      </div>
    </div>
  );
};