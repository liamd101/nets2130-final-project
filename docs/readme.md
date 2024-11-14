# MemoryMosaic Project

MemoryMosaic is a digital platform allowing users to create collaborative visual "memory boards." Users can crowdsource pictures related to specific events, places, or even decades, which are then compiled into an interactive mosaic.

---

## User Interface Overview

- **Sign In**: Users can log in using email, Google, or Apple accounts.
- **Recents Feed**: A feed displaying recent uploads from events, allowing users to engage with images.
- **For You**: Personalized recommendations based on user interests and activity.
- **Mosaic**: An interactive map and mosaic display that showcases aggregated, high-quality images based on location or theme.

---

The project has five main components, each with a designated complexity rating based on the estimated work required for implementation. The total project complexity is 17 points.

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
