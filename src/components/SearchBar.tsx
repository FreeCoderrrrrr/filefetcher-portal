import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const SearchBar = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error("Please enter a valid Terbox URL");
      return;
    }

    setIsLoading(true);
    try {
      // Insert the video into the database
      const { data, error } = await supabase
        .from('videos')
        .insert([
          { url: url.trim() }
        ])
        .select()
        .single();

      if (error) throw error;

      console.log("Video entry created:", data);
      toast.success("Link added successfully! Processing will begin shortly.");
      setUrl("");
    } catch (error) {
      console.error("Error processing video:", error);
      toast.error("Failed to process the link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="url"
          placeholder="Paste your Terbox link here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          <Search className="mr-2 h-4 w-4" />
          {isLoading ? "Processing..." : "Search"}
        </Button>
      </form>
    </div>
  );
};