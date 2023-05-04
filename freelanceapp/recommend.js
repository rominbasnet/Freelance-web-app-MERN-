
















































// define an array of freelancers with their skills
const freelancers = [  { name: "John Doe", skills: ["JavaScript", "React", "Node.js"] },
  { name: "Jane Doe", skills: ["JavaScript", "Vue.js", "Express"] },

  { name: "Jim Smith", skills: ["JavaScript", "Angular", "MongoDB"] },
  { name: "Sarah Johnson", skills: ["Java", "Spring", "MySQL"] }
];

// define the required skills for the business
const requiredSkills = ["JavaScript", "React", "Node.js"];

// function to calculate cosine similarity
function cosineSimilarity(a, b) {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }
  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

// function to get the recommendations
function recommendFreelancers() {
  // create a new array with the similarity scores
  const recommendations = freelancers.map(freelancer => {
    // create a vector for the required skills and the freelancer's skills
    const requiredSkillsVector = Array(requiredSkills.length).fill(0);
    const freelancerSkillsVector = Array(requiredSkills.length).fill(0);
    for (let i = 0; i < requiredSkills.length; i++) {
      const requiredSkillIndex = requiredSkills.indexOf(requiredSkills[i]);
      if (requiredSkillIndex !== -1) {
        requiredSkillsVector[requiredSkillIndex] = 1;
        if (freelancer.skills.includes(requiredSkills[i])) {
          freelancerSkillsVector[requiredSkillIndex] = 1;
        }
      }
    }
    // calculate the cosine similarity score
    const score = cosineSimilarity(requiredSkillsVector, freelancerSkillsVector);
    return { freelancer, score };
  });
  // sort the recommendations in descending order of score
  recommendations.sort((a, b) => b.score - a.score);
  // return the top 3 recommendations
  return recommendations.slice(0, 3);
}

// call the recommendation function
const topRecommendations = recommendFreelancers();

// log the top recommendations
console.log(topRecommendations);
