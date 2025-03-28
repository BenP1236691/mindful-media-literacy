
import { TeamMember, Course, PageContent, UserProgress } from "@/types";

// In a real application, these would be API calls to your backend
// We're using localStorage for demonstration purposes

// Team Members
export const getTeamMembers = (): TeamMember[] => {
  const members = localStorage.getItem("team-members");
  return members ? JSON.parse(members) : [];
};

export const addTeamMember = (member: Omit<TeamMember, "id">): TeamMember => {
  const members = getTeamMembers();
  const newMember = { ...member, id: `member-${Date.now()}` };
  localStorage.setItem("team-members", JSON.stringify([...members, newMember]));
  return newMember;
};

export const updateTeamMember = (member: TeamMember): void => {
  const members = getTeamMembers();
  const updatedMembers = members.map(m => 
    m.id === member.id ? member : m
  );
  localStorage.setItem("team-members", JSON.stringify(updatedMembers));
};

export const deleteTeamMember = (id: string): void => {
  const members = getTeamMembers();
  const updatedMembers = members.filter(m => m.id !== id);
  localStorage.setItem("team-members", JSON.stringify(updatedMembers));
};

// Courses
export const getCourses = (): Course[] => {
  const courses = localStorage.getItem("courses");
  return courses ? JSON.parse(courses) : [];
};

export const getCourse = (id: string): Course | undefined => {
  const courses = getCourses();
  return courses.find(course => course.id === id);
};

export const addCourse = (course: Omit<Course, "id">): Course => {
  const courses = getCourses();
  const newCourse = { ...course, id: `course-${Date.now()}` };
  localStorage.setItem("courses", JSON.stringify([...courses, newCourse]));
  return newCourse;
};

export const updateCourse = (course: Course): void => {
  const courses = getCourses();
  const updatedCourses = courses.map(c => 
    c.id === course.id ? course : c
  );
  localStorage.setItem("courses", JSON.stringify(updatedCourses));
};

export const deleteCourse = (id: string): void => {
  const courses = getCourses();
  const updatedCourses = courses.filter(c => c.id !== id);
  localStorage.setItem("courses", JSON.stringify(updatedCourses));
};

// Page Content
export const getPageContents = (): PageContent[] => {
  const contents = localStorage.getItem("page-contents");
  return contents ? JSON.parse(contents) : [
    {
      id: "home-hero",
      title: "Digital Literacy for the AI Age",
      content: "Learn how to navigate the world of digital media and AI with confidence. Our courses teach critical thinking, fact-checking, and responsible technology use."
    },
    {
      id: "home-about",
      title: "About Our Mission",
      content: "We believe in empowering people with the knowledge and skills needed to thrive in an increasingly digital world. Our team of experts develops curriculum that helps learners of all ages become informed digital citizens."
    }
  ];
};

export const getPageContent = (id: string): PageContent | undefined => {
  const contents = getPageContents();
  return contents.find(content => content.id === id);
};

export const updatePageContent = (content: PageContent): void => {
  const contents = getPageContents();
  const updatedContents = contents.map(c => 
    c.id === content.id ? content : c
  );
  localStorage.setItem("page-contents", JSON.stringify(updatedContents));
};

// User Progress
export const getUserProgress = (userId: string): UserProgress[] => {
  const key = `user-progress-${userId}`;
  const progress = localStorage.getItem(key);
  return progress ? JSON.parse(progress) : [];
};

export const updateUserProgress = (progress: UserProgress): void => {
  const key = `user-progress-${progress.userId}`;
  const allProgress = getUserProgress(progress.userId);
  
  const existingIndex = allProgress.findIndex(p => p.courseId === progress.courseId);
  
  if (existingIndex >= 0) {
    allProgress[existingIndex] = progress;
  } else {
    allProgress.push(progress);
  }
  
  localStorage.setItem(key, JSON.stringify(allProgress));
};
