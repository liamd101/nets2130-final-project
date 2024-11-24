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
    const [upvotes, setUpvotes] = useState(initialVotes);
    const [downvotes, setDownvotes] = useState(0);
    const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);

    const handleLike = () => {
        if (userVote === 'like') {
            setUpvotes(prev => prev - 1);
            setUserVote(null);
        } else {
            if (userVote === 'dislike') {
                setDownvotes(prev => prev - 1);
            }
            setUpvotes(prev => prev + 1);
            setUserVote('like');
        }
    };

    const handleDislike = () => {
        if (userVote === 'dislike') {
            setDownvotes(prev => prev - 1);
            setUserVote(null);
        } else {
            if (userVote === 'like') {
                setUpvotes(prev => prev - 1);
            }
            setDownvotes(prev => prev + 1);
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
                <span>{upvotes}</span>
            </button>
            <button
                onClick={handleDislike}
                className={`flex items-center gap-1 ${userVote === 'dislike' ? 'text-red-500' : ''}`}
            >
                <ThumbsDown size={16} />
                <span>{downvotes}</span>
            </button>
        </div>
    );
};

export default InlineVoteSystem;