"use client";

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Send } from 'lucide-react';
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
  initialVotes?: number;
  initialComments?: Comment[];
  onVoteChange?: (newVotes: number) => void;
  onCommentAdd?: (comment: Comment) => void;
}

const InlineVoteSystem = ({ 
  initialVotes = 0, 
  initialComments = [],
  onVoteChange,
  onCommentAdd
}: InlineVoteSystemProps) => {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleVote = (type: 'up' | 'down') => {
    let newVotes = votes;
    
    if (userVote === type) {
      newVotes = votes + (type === 'up' ? -1 : 1);
      setVotes(newVotes);
      setUserVote(null);
    } else {
      newVotes = votes + (
        type === 'up' 
          ? (userVote === 'down' ? 2 : 1) 
          : (userVote === 'up' ? -2 : -1)
      );
      setVotes(newVotes);
      setUserVote(type);
    }

    onVoteChange?.(newVotes);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        text: newComment,
        timestamp: new Date().toLocaleString()
      };
      
      setComments([...comments, newCommentObj]);
      setNewComment('');
      onCommentAdd?.(newCommentObj);
    }
  };

  return (
    <div className="inline-flex items-center h-8">
      {/* Like/Dislike Group */}
      <div className="inline-flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => handleVote('up')}
          className={`h-8 w-8 p-0 ${userVote === 'up' ? 'text-green-500' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <ThumbsUp className="h-4 w-4" />
        </Button>
        
        <span className="text-sm font-medium min-w-[1.5rem] text-center">{votes}</span>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => handleVote('down')}
          className={`h-8 w-8 p-0 ${userVote === 'down' ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <ThumbsDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Comment Section - Separated with margin */}
      <div className="ml-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-12 p-0 text-gray-500 hover:text-gray-700"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="ml-1 text-sm">{comments.length}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-2">
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="h-8 text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddComment();
                  }}
                />
                <Button 
                  size="sm"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="h-8 px-2"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2">
                {comments.map(comment => (
                  <div 
                    key={comment.id} 
                    className="p-2 bg-gray-100 rounded text-sm"
                  >
                    <p>{comment.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {comment.timestamp}
                    </p>
                  </div>
                ))}
                {comments.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-2">
                    No comments yet
                  </p>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default InlineVoteSystem;