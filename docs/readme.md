# MemoryMosaic Project

MemoryMosaic is a digital platform allowing users to create collaborative visual "memory boards." Users can crowdsource pictures related to specific events, places, or even decades, which are then compiled into an interactive mosaic.

---

## Data and Code Paths

- Raw Data: `data/raw-data.json`
- Sample Input for Quality Control: `data/quality-control-input.json`
- Sample Output for Quality Control: `data/quality-control-output.json`
- Sample Input for Aggregation: `data/raw-data.json`
- Sample Output for Aggregation: `data/filtered-images.json`
- Code for Quality Control: `src/quality_control.py`
- Code for Aggregation: `src/webapp.py`

---

## User Interface Overview

- **Sign In**: Users can log in using email, Google, or Apple accounts.
- **Events**: A feed displaying upcoming events.
- **My Mosaics**: A personalized page where users can view, manage, and revisit the mosaics they've created or contributed to.
- **Mosaic**: An interactive map and mosaic display that showcases aggregated, high-quality images based on location or theme.

---

## How to Contribute as Part of the Crowd

MemoryMosaic uses crowdsourcing to enhance the quality and diversity of its visual "memory boards." Here’s how you can contribute to the project without directly coding:

### Step 1: **Interact with Uploaded Images**
- Visit the mosaics to explore recently uploaded pictures.
- Contribute by **liking** (upvoting) or **disliking** (downvoting) images.  
  - Upvoted images are prioritized for inclusion in the final mosaic.
  - Downvoted images are flagged for review and may be excluded based on quality or relevance.

### Step 2: **Submit Your Own Pictures**
- Upload high-quality images.  
  - Add descriptive metadata to your submissions, such as location, time, and event name, to help with aggregation.
  - Ensure your images follow platform guidelines (e.g., no inappropriate content, clear and relevant visuals).

### Step 3: **Participate in Community Reviews**
- Join discussions or polls for selecting the best images or themes for specific mosaics.
- Provide feedback on why certain images should or should not be included. This feedback helps improve the Quality Control system.

### Step 4: **Promote the Project**
- Share MemoryMosaic with friends, classmates, or on social media to expand participation.
- Encourage others to upload pictures and interact with the mosaic boards.

### Step 5: **Suggest Themes and Features**
- Submit suggestions for new themes, such as specific decades, locations, or types of events.
- Provide ideas for new features to improve the platform, such as additional filters or interaction tools.

### Step 6: **Test and Provide Feedback**
- Test the platform by interacting with different components, such as uploading pictures, liking/disliking content, and navigating mosaics.
- Report any issues or suggest improvements to enhance user experience.

---

## Code Execution Guide

### How to Run the Code
- **Frontend**:
   - Navigate to the `frontend` folder.
   - Run the development server:
     ```bash
     npm run dev
     # or
     yarn dev
     # or
     pnpm dev
     # or
     bun dev
     ```
   - Open [http://localhost:3000](http://localhost:3000) with your browser to see the project.

---

## Components

### 1. Login (1 point)
**Description**:  
The Login component is the initial user entry point to MemoryMosaic. Here, users log in and choose a theme for their memory board. The theme selection will help guide content relevance throughout the mosaic creation process.

**Milestones**:
- Set up user authentication and login interface.
- Implement theme selection functionality.

---

### 2. Upload (4 points)
**Description**:  
In the Upload component, users submit pictures that align with the chosen theme. Quality Control system is implemented to filter out duplicate or low-quality images before moving them to the next stage.

**Milestones**:
- Create the upload interface restricted to pictures only.
- Integrate QC for detecting duplicates and filtering low-quality images.
- Store uploads in a database with metadata tags for theme and quality.

---

### 3. Quality Control (3 points)
**Description**:  
The Quality Control stage ensures that uploaded content meets the platform's quality standards. Content is filtered for appropriateness and quality, and the community can upvote submissions, impacting their visibility and selection in the final mosaic.

**Milestones**:
- Set up filters for inappropriate and low-quality images.
- Implement a community voting system for upvotes.
- Design an algorithm to prioritize higher-voted content.

---

### 4. Aggregation (5 points)
**Description**:  
The Aggregation component gathers all approved content with sufficient upvotes. These items are layered together to form an interactive mosaic, with higher-voted content appearing more prominently.

**Milestones**:
- Build a database query for retrieving high-quality, high-upvote images.
- Develop an algorithm for arranging content by prominence based on upvotes.
- Create an interactive mosaic generator to compile selected images.

---

### 5. Display (4 points)
**Description**:  
The Display component shows the final interactive mosaic. Users can zoom in, interact with specific sections, and explore related stories linked to images.

**Milestones**:
- Design an interactive mosaic display with zoom and interaction features.
- Implement image exploration options for users.
- Optimize the display for performance and mobile compatibility.

---
## Planned Analysis

- **Image Quality**:  
  Check uploaded images for duplicates and low-quality content. Use metadata to match images to themes and ensure they follow upload rules.

- **Community Engagement**:  
  Track likes and dislikes to see user preferences. Identify mosaics with the most engagement to guide future recommendations.

- **Mosaic Composition**:  
  Review how images are arranged in mosaics to ensure a fair mix of themes, locations, and events. Highlight top-voted images using upvote counts and metadata.

---

## Complexity Breakdown
| Component       | Points |
|-----------------|--------|
| Login           | 1      |
| Upload          | 4      |
| Quality Control | 3      |
| Aggregation     | 5      |
| Display         | 4      |
| **Total**       | **17** |

---

## High-Level Milestones
1. **User Authentication and Theme Selection** - Complete the login and theme selection interface (Component 1).
2. **Picture Upload and Initial Filtering** - Develop the upload process restricted to pictures with AI-based filtering (Component 2).
3. **Community-Driven Quality Control** - Implement content filtering and upvote system (Component 3).
4. **Mosaic Aggregation** - Build the algorithm for layering and prominence in the mosaic (Component 4).
5. **Interactive Display** - Design the interactive mosaic display with exploration features (Component 5).

---

## Future Development
Potential future features include:
- Expanding the types of media allowed in uploads.
- Adding AI-based suggestions for similar memories.
- Introducing advanced theme-based filters for improved content relevancy.
- Adding in-app notifications for popular or featured posts.
- Location-based filtering and sorting in the Mosaic view.
- User profiles with memory collections.
