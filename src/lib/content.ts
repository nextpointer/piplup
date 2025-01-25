export const heroline = "Ready, Set, Quiz! Discover Your Knowledge Today!";
export const subHeroLine = "Join a community of quiz lovers and challenge yourself with a variety of topics! Test your knowledge, compete with friends, and discover new facts - all while having fun. Let the quiz adventure begin!";
export const NavElement = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Public Quiz", href: "/public-quiz" },
  { name: "About", href: "/about" },
  { name: "Create with AI", href: "/quiz/create" }
];

export const quizData = [
    {
      date: "2023-10-01",
      title: "Introduction to TypeScript",
      about: "A beginner-friendly quiz to test your knowledge of TypeScript basics.",
      visibility: "public",
    },
    {
      date: "2023-10-05",
      title: "Advanced JavaScript Concepts",
      about: "Challenge your understanding of advanced JavaScript topics like closures and promises.",
      visibility: "private",
    },
    {
      date: "2023-10-10",
      title: "React Fundamentals",
      about: "Assess your knowledge of React components, state, and props.",
      visibility: "public",
    },
    {
      date: "2023-10-15",
      title: "CSS Grid and Flexbox",
      about: "Test your skills in modern CSS layout techniques.",
      visibility: "public",
    },
    {
      date: "2023-10-20",
      title: "Node.js Basics",
      about: "A quiz to evaluate your understanding of Node.js and server-side JavaScript.",
      visibility: "private",
    },
    {
      date: "2023-10-25",
      title: "Database Management Systems",
      about: "Explore your knowledge of SQL and NoSQL databases.",
      visibility: "public",
    },
    {
      date: "2023-10-30",
      title: "Web Development Best Practices",
      about: "A quiz covering best practices in web development, including performance and accessibility.",
      visibility: "public",
    },
  ];
  

  export const participationData = [
    {
      date: "2023-10-01",
      title: "Introduction to TypeScript",
      noOfQuestion: 10,
      noOfGiveAnswer: 8,
    },
    {
      date: "2023-10-05",
      title: "Advanced JavaScript Concepts",
      noOfQuestion: 15,
      noOfGiveAnswer: 10,
    },
    {
      date: "2023-10-10",
      title: "React Fundamentals",
      noOfQuestion: 12,
      noOfGiveAnswer: 12,
    },
    {
      date: "2023-10-15",
      title: "CSS Grid and Flexbox",
      noOfQuestion: 8,
      noOfGiveAnswer: 6,
    },
    {
      date: "2023-10-20",
      title: "Node.js Basics",
      noOfQuestion: 14,
      noOfGiveAnswer: 10,
    },
    {
      date: "2023-10-25",
      title: "Database Management Systems",
      noOfQuestion: 20,
      noOfGiveAnswer: 15,
    },
    {
      date: "2023-10-30",
      title: "Web Development Best Practices",
      noOfQuestion: 18,
      noOfGiveAnswer: 16,
    },
  ];
  
  export const PlayQuizData = {
    Title: "Web Development Basics",
    About: "Test your knowledge on the fundamentals of web development.",
    Questions: [
      {
        QuestionName: "What does HTML stand for?",
        Options: [
          { label: "Hyper Text Markup Language", isCorrect: true },
          { label: "High Text Markup Language", isCorrect: false },
          { label: "Hyperlinks and Text Markup Language", isCorrect: false },
          { label: "Hyper Text Markup Link", isCorrect: false },
        ],
      },
      {
        QuestionName: "Which of the following is a JavaScript framework?",
        Options: [
          { label: "React", isCorrect: true },
          { label: "Django", isCorrect: false },
          { label: "Ruby on Rails", isCorrect: false },
          { label: "Laravel", isCorrect: false },
        ],
      },
      {
        QuestionName: "What does CSS stand for?",
        Options: [
          { label: "Cascading Style Sheets", isCorrect: true },
          { label: "Colorful Style Sheets", isCorrect: false },
          { label: "Computer Style Sheets", isCorrect: false },
          { label: "Creative Style Sheets", isCorrect: false },
        ],
      },
      {
        QuestionName: "Which HTML tag is used to define an internal style sheet?",
        Options: [
          { label: "<style>", isCorrect: true },
          { label: "<css>", isCorrect: false },
          { label: "<script>", isCorrect: false },
          { label: "<link>", isCorrect: false },
        ],
      },
      {
        QuestionName: "Which of the following is a valid way to declare a variable in JavaScript?",
        Options: [
          { label: "var myVariable;", isCorrect: true },
          { label: "variable myVariable;", isCorrect: false },
          { label: "v myVariable;", isCorrect: false },
          { label: "myVariable := 10;", isCorrect: false },
        ],
      },
      {
        QuestionName: "What is the purpose of the <head> tag in HTML?",
        Options: [
          { label: "To contain metadata and links to scripts and styles", isCorrect: true },
          { label: "To display the main content of the page", isCorrect: false },
          { label: "To create a footer for the page", isCorrect: false },
          { label: "To define the title of the page", isCorrect: false },
        ],
      },
      {
        QuestionName: "Which of the following is used to style a web page?",
        Options: [
          { label: "CSS", isCorrect: true },
          { label: "HTML", isCorrect: false },
          { label: "JavaScript", isCorrect: false },
          { label: "XML", isCorrect: false },
        ],
      },
      {
        QuestionName: "What is the correct HTML element for inserting a line break?",
        Options: [
          { label: "<break>", isCorrect: false },
          { label: "<br>", isCorrect: true },
          { label: "<lb>", isCorrect: false },
          { label: "<linebreak>", isCorrect: false },
        ],
      },
      {
        QuestionName: "Which of the following is a front-end JavaScript library?",
        Options: [
          { label: "Vue.js", isCorrect: true },
          { label: "Node.js", isCorrect: false },
          { label: "Express.js", isCorrect: false },
          { label: "Django", isCorrect: false },
        ],
      },
      {
        QuestionName: "What does API stand for?",
        Options: [
          { label: "Application Programming Interface", isCorrect: true },
          { label: "Application Programming Integration", isCorrect: false },
          { label: "Application Protocol Interface", isCorrect: false },
          { label: "Application Programming Interaction", isCorrect: false },
        ],
      },
    ],
  };
  
  export default quizData;
  