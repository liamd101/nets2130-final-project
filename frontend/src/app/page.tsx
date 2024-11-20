import Image from "next/image";

import InlineVoteSystem from "./components/upvote";
import ImageMosaic from "./components/mosaic";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <InlineVoteSystem 
        // initialLikes={5} 
        // initialDislikes={2} 
        // initialComments={3} 
      />
      <ImageMosaic />
      {/* <Comments 
        comments={[
          {
            id: '1',
            text: 'Great post!',
            author: 'John Doe',
            timestamp: new Date(),
          }
        ]}
        onAddComment={(text) => {
          // Handle adding new comment
          console.log('New comment:', text)
        }}
      /> */}
    </div>
  );
}
