export const heroline = "Ready, Set, Quiz! Discover Your Knowledge Today!";
export const subHeroLine = "Join a community of quiz lovers and challenge yourself with a variety of topics! Test your knowledge, compete with friends, and discover new facts - all while having fun. Let the quiz adventure begin!";
export const NavElement = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Play Quiz", href: "/quiz/play" },
  { name: "About", href: "/about" },
  { name: "Create Your Quiz", href: "/quiz/create" }
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
    "Title": "SHA Deep Dive",
    "About": "Hashing & SHA algorithms",
    "publicQuiz": true,
    "Questions": [
      {
        "QuestionName": "Which property ensures a hash function's output is unpredictable given a known input?",
        "Options": [
          {
            "label": "Avalanche effect",
            "isCorrect": false
          },
          {
            "label": "Preimage resistance",
            "isCorrect": true
          },
          {
            "label": "Collision resistance",
            "isCorrect": false
          },
          {
            "label": "Second preimage resistance",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "Hashing algorithms are primarily what type of functions?",
        "Options": [
          {
            "label": "Symmetric",
            "isCorrect": false
          },
          {
            "label": "Asymmetric",
            "isCorrect": false
          },
          {
            "label": "One-way",
            "isCorrect": true
          },
          {
            "label": "Two-way",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "Which hashing algorithm is generally considered more secure against collision attacks?",
        "Options": [
          {
            "label": "MD5",
            "isCorrect": false
          },
          {
            "label": "SHA-1",
            "isCorrect": false
          },
          {
            "label": "SHA-256",
            "isCorrect": true
          },
          {
            "label": "CRC32",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "What is the primary use of hashing algorithms in security?",
        "Options": [
          {
            "label": "Encryption",
            "isCorrect": false
          },
          {
            "label": "Integrity check",
            "isCorrect": true
          },
          {
            "label": "Authentication",
            "isCorrect": false
          },
          {
            "label": "Authorization",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "What is the main purpose of a hashing algorithm?",
        "Options": [
          {
            "label": "Increasing entropy",
            "isCorrect": false
          },
          {
            "label": "Creating a fixed-size representation",
            "isCorrect": true
          },
          {
            "label": "Data compression",
            "isCorrect": false
          },
          {
            "label": "Data encryption",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "Which SHA version uses the Keccak algorithm?",
        "Options": [
          {
            "label": "SHA-0",
            "isCorrect": false
          },
          {
            "label": "SHA-1",
            "isCorrect": false
          },
          {
            "label": "SHA-3",
            "isCorrect": true
          },
          {
            "label": "SHA-2",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "What is a secret value added to the hashing process to protect against rainbow table attacks, not stored with the password hash?",
        "Options": [
          {
            "label": "Salt",
            "isCorrect": false
          },
          {
            "label": "Pepper",
            "isCorrect": true
          },
          {
            "label": "Spice",
            "isCorrect": false
          },
          {
            "label": "Herb",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "What type of attack exploits the mathematics of probability to find collisions in hash functions?",
        "Options": [
          {
            "label": "Birthday attack",
            "isCorrect": true
          },
          {
            "label": "Dictionary attack",
            "isCorrect": false
          },
          {
            "label": "Brute force attack",
            "isCorrect": false
          },
          {
            "label": "Rainbow table attack",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "In what application is salting most commonly used?",
        "Options": [
          {
            "label": "Key exchange",
            "isCorrect": false
          },
          {
            "label": "Digital signature",
            "isCorrect": false
          },
          {
            "label": "Password storage",
            "isCorrect": true
          },
          {
            "label": "Data encryption",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "Which of these algorithms is specifically designed for password hashing?",
        "Options": [
          {
            "label": "SHA-512",
            "isCorrect": false
          },
          {
            "label": "bcrypt",
            "isCorrect": true
          },
          {
            "label": "MD5",
            "isCorrect": false
          },
          {
            "label": "SHA-3",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "What does it mean when a hashing algorithm is considered \"broken\"?",
        "Options": [
          {
            "label": "Less computation",
            "isCorrect": false
          },
          {
            "label": "More predictability",
            "isCorrect": false
          },
          {
            "label": "More collisions",
            "isCorrect": true
          },
          {
            "label": "Higher entropy",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "Which SHA algorithm produces the longest hash output?",
        "Options": [
          {
            "label": "SHA-224",
            "isCorrect": false
          },
          {
            "label": "SHA-384",
            "isCorrect": false
          },
          {
            "label": "SHA-512",
            "isCorrect": true
          },
          {
            "label": "SHA-256",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "What is HMAC primarily used for?",
        "Options": [
          {
            "label": "Data compression",
            "isCorrect": false
          },
          {
            "label": "Encryption",
            "isCorrect": false
          },
          {
            "label": "Message authentication",
            "isCorrect": true
          },
          {
            "label": "Key generation",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "Why is salting important in password hashing?",
        "Options": [
          {
            "label": "Increasing processing speed",
            "isCorrect": false
          },
          {
            "label": "Mitigating collision attacks",
            "isCorrect": true
          },
          {
            "label": "Reducing storage requirements",
            "isCorrect": false
          },
          {
            "label": "Enhancing encryption strength",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "What is the best practice when using salts for password hashing?",
        "Options": [
          {
            "label": "Hashing the salt",
            "isCorrect": false
          },
          {
            "label": "Using a unique salt for each password",
            "isCorrect": true
          },
          {
            "label": "Using a static salt for all passwords",
            "isCorrect": false
          },
          {
            "label": "Not storing the salt",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "What is the primary benefit of using SHA algorithms over simpler checksums like CRC32?",
        "Options": [
          {
            "label": "Data recovery",
            "isCorrect": false
          },
          {
            "label": "Integrity verification",
            "isCorrect": true
          },
          {
            "label": "Data encryption",
            "isCorrect": false
          },
          {
            "label": "Data compression",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "Which password hashing algorithm is resistant to hardware attacks?",
        "Options": [
          {
            "label": "SHA-3",
            "isCorrect": false
          },
          {
            "label": "bcrypt",
            "isCorrect": true
          },
          {
            "label": "scrypt",
            "isCorrect": false
          },
          {
            "label": "PBKDF2",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "What is the property of a hashing algorithm where each output bit depends on multiple input bits?",
        "Options": [
          {
            "label": "Avalanche effect",
            "isCorrect": false
          },
          {
            "label": "Confusion",
            "isCorrect": true
          },
          {
            "label": "Diffusion",
            "isCorrect": false
          },
          {
            "label": "Permutation",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "In which of the following scenarios is the 'compare-and-swap' mechanism most likely to be used in conjunction with hashing?",
        "Options": [
          {
            "label": "Password verification",
            "isCorrect": true
          },
          {
            "label": "Data compression",
            "isCorrect": false
          },
          {
            "label": "Encryption",
            "isCorrect": false
          },
          {
            "label": "Key derivation",
            "isCorrect": false
          }
        ]
      },
      {
        "QuestionName": "Which of the following is the most critical security property for a hash function used in digital signatures?",
        "Options": [
          {
            "label": "Quantum resistance",
            "isCorrect": false
          },
          {
            "label": "Collision resistance",
            "isCorrect": false
          },
          {
            "label": "Preimage resistance",
            "isCorrect": true
          },
          {
            "label": "Second-preimage resistance",
            "isCorrect": false
          }
        ]
      }
    ]
  };


  export default quizData;
  