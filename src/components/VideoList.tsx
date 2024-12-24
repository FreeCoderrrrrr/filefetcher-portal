import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const VideoList = () => {
  const { data: videos, isLoading, error } = useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    refetchInterval: 5000, // Refetch every 5 seconds to check for updates
  });

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        <Progress value={30} className="w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Failed to load videos. Please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!videos?.length) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        <Alert>
          <AlertDescription>No videos found. Add a Terbox link to get started!</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 px-4 space-y-4">
      {videos.map((video) => (
        <div
          key={video.id}
          className="border rounded-lg p-4 bg-white shadow-sm space-y-2"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">
                {video.title || 'Processing...'}
              </h3>
              <p className="text-sm text-gray-500 break-all">{video.url}</p>
            </div>
            {video.download_url && (
              <Button size="sm" onClick={() => window.open(video.download_url, '_blank')}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            )}
          </div>
          
          {video.status === 'pending' && (
            <Progress value={30} className="w-full" />
          )}
          
          {video.status === 'failed' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{video.error_message || 'Failed to process video'}</AlertDescription>
            </Alert>
          )}
          
          {video.size && (
            <p className="text-sm text-gray-500">Size: {video.size}</p>
          )}
        </div>
      ))}
    </div>
  );
};