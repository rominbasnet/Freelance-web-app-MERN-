// import natural from 'natural';

// const classifier = new natural.BayesClassifier();

// // Training data
// classifier.addDocument('Looking for a freelance developer for a small project', 'not fraud');
// classifier.addDocument('Urgently need a web developer. High payment. Contact now!', 'fraud');
// classifier.addDocument('Hiring a designer for a new logo. Good pay.', 'not fraud');
// classifier.addDocument('Make quick money online. No experience required.', 'fraud');

// // Train the classifier
// classifier.train();

// // Test data
// const jobPost = 'Need an iOS developer for a mobile app project. Contact now.';

// // Classify the job post as fraud or not fraud
// const classification = classifier.classify(jobPost);

// // Output the classification
// console.log('Classification:', classification);


import natural from 'natural';
import stopword from 'stopwords';
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;
const stopwords = stopword.english;

// training data
const trainingData = [
  {
    text: "Looking designer for a web developer with designer experience design in React and Node.js",
    category: "programming"
  },
  {
    text: "We need a UI/UX designer for our mobile app",
    category: "design"
  },
  {
    text: "Looking for a freelance writer to create blog content",
    category: "writing"
  }
];

// preprocess the training data
const preprocessedData = trainingData.map(item => {
  const tokens = tokenizer.tokenize(item.text.toLowerCase())
    .filter(token => !stopwords.includes(token))
    .map(token => stemmer.stem(token));
  
  return {
    tokens,
    category: item.category
  };
});

// train the classifier
const classifier = new natural.BayesClassifier();

preprocessedData.forEach(item => {
  classifier.addDocument(item.tokens, item.category);
});

classifier.train();

// classify a new job post
const jobPost = {
  text: "Looking need a designer for our web",
};

const preprocessedJobPost = tokenizer.tokenize(jobPost.text.toLowerCase())
  .filter(token => !stopwords.includes(token))
  .map(token => stemmer.stem(token));

const category = classifier.classify(preprocessedJobPost);

console.log(`The job post is classified as: ${category}`);
