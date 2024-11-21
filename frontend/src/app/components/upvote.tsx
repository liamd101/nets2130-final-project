"use client";

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Comment {
  id: number;
  text: string;
  timestamp: string;
}

interface InlineVoteSystemProps {
  initialVotes: number;
}

const InlineVoteSystem: React.FC<InlineVoteSystemProps> = ({ initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);

  const handleLike = () => {
    if (userVote === 'like') {
      setVotes(prev => prev - 1);
      setUserVote(null);
    } else {
      if (userVote === 'dislike') {
        setVotes(prev => prev - 1);
      }
      setVotes(prev => prev + 1);
      setUserVote('like');
    }
  };

  const handleDislike = () => {
    if (userVote === 'dislike') {
      setVotes(prev => prev - 1);
      setUserVote(null);
    } else {
      if (userVote === 'like') {
        setVotes(prev => prev - 1);
      }
      setVotes(prev => prev + 1);
      setUserVote('dislike');
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={handleLike}
        className={`flex items-center gap-1 ${userVote === 'like' ? 'text-green-500' : ''}`}
      >
        <ThumbsUp size={16} />
        <span>{votes}</span>
      </button>

      <button 
        onClick={handleDislike}
        className={`flex items-center gap-1 ${userVote === 'dislike' ? 'text-red-500' : ''}`}
      >
        <ThumbsDown size={16} />
        <span>{votes}</span>
      </button>
    </div>
  );
};

export default InlineVoteSystem;