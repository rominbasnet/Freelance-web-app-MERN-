


// @ts-nocheck
// TypeScript will not perform type-checking for this file



import { Request, Response } from 'express';
import { Job } from '../models';
import { FreelancerProfile } from '../models';
import natural from 'natural';
import stopword from 'stopwords';
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;
const stopwords = stopword.english;

 export const GetRecommendation = async (req: any, res: any) =>{
// training data
const trainingData = [
  {
    skill: "java kotlin c++ python androidstudio",
    category: "Android Development"
  },
  {
    skill: "javascript html css node.js react angular",
    category: "Web Development"
  },
  {
    skill: "unity c# unreal engine 3d modeling",
    category: "Game Development"
  },
  {
    skill: "adobe photoshop illustrator indesign graphic design",
    category: "Graphic Designing"
  }, 
    {
    skill: "adobe photoshop illustrator indesign graphic design",
    category: "Graphic Designing"
  },
    {
    skill: "adobe photoshop illustrator indesign graphic design",
    category: "Graphic Designing"
  },
    {
    skill: "adobe photoshop illustrator indesign graphic design",
    category: "Graphic Designing"
  },
    {
    skill: "adobe photoshop illustrator indesign graphic design",
    category: "Graphic Designing"
  },
    {
    skill: "adobe photoshop illustrator indesign graphic design",
    category: "Graphic Designing"
  },
    {
    skill: "adobe photoshop illustrator indesign graphic design",
    category: "Graphic Designing"
  },
  {
    skill: "adobe after effects cinema 4d animation",
    category: "Animation Development"
  },
    {
    skill: "adobe after effects cinema 4d animation",
    category: "Animation Development"
  },
    {
    skill: "adobe after effects cinema 4d animation",
    category: "Animation Development"
  },
    {
    skill: "adobe after effects cinema 4d animation",
    category: "Animation Development"
  },
  {
    skill: "wordpress php html css",
    category: "Wordpress Development"
  },
  {
    skill: "swift objective-c xcode",
    category: "iOS Development"
  },
  {
    skill: "aws cloud computing devops docker kubernetes",
    category: "Cloud Computing"
  }
];




try{
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    const freelancerProfiles = await FreelancerProfile.find().populate('freelancer',['linkdeln','description','userName', 'location', 'firstName', 'lastName', 'email']);;
    if (!job) {
      return res.status(404).send('Job not found');
    }

    const skillSetReq = job.skillSetReq.join(' ');;
    console.log(skillSetReq)


  // preprocess the training data
const preprocessedData = trainingData.map(item => {
  const tokens = tokenizer.tokenize(item.skill.toLowerCase())
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

 
const jobPost = {
  skill: skillSetReq
};

const preprocessedJobPost = tokenizer.tokenize(jobPost.skill.toLowerCase())
  .filter(token => !stopwords.includes(token))
  .map(token => stemmer.stem(token));

const category = classifier.classify(preprocessedJobPost);



  const matchedProfiles = freelancerProfiles.filter(profile => profile.specialization === category);
  res.json(matchedProfiles)

console.log(`The job post is classified as: ${category}`);
}
catch(err){

console.log(err)
}

}













// import { Request, Response } from 'express';
// import { Job } from '../models';
// import { FreelancerProfile } from '../models';
// import * as math from 'mathjs';

// // Returns the cosine similarity between two arrays
// function cosineSimilarity(arr1: any, arr2: any): any {
//   const dotProduct: any = math.dot(arr1, arr2);
//   const norm1: any = math.norm(arr1);
//   const norm2: any = math.norm(arr2);
//   return dotProduct / (norm1 * norm2);
// }

// // Recommends the best freelancer profile for the job based on skill set
// export const GetRecommendation = async (req: any, res: any) =>{
//   try {
//     const jobId = req.params.id;
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).send('Job not found');
//     }

//     const skillSetReq = job.skillSetReq;
//     const freelancerProfiles = await FreelancerProfile.find();

//     // Calculate cosine similarity between each freelancer profile and the job skill set requirements
//     const similarities = freelancerProfiles.map(fp => {
//             if (skillSetReq.length !== fp.skills.length) {
//         return { freelancerProfile: fp, similarity: 0 };
//       }
//       const similarity = cosineSimilarity(skillSetReq, fp.skills);
//       return { freelancerProfile: fp, similarity };
//     });

//     // Sort the similarities in descending order
//     similarities.sort((a, b) => b.similarity - a.similarity);

//     // Return the freelancer profile with the highest similarity score
//     const bestFreelancerProfile = similarities[0].freelancerProfile;
//     res.json(bestFreelancerProfile);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// }
















































/*import * as keras from 'keras-js';
import { FreelancerProfile, Job } from '../models';

export const TrainRecommendationModel = async (req: any, res: any) => {
  const jobs: any = await Job.find();
  const freelancerProfiles: any = await FreelancerProfile.find();

  const jobSkillSet: any = jobs.reduce((set: any, job: any) => set.concat(job.skillSetReq), []);
  const freelancerSkillSet: any = freelancerProfiles.reduce((set: any, profile: any) => set.concat(profile.skills), []);

  const jobSkillSetSize = jobSkillSet.length;
  const freelancerSkillSetSize = freelancerSkillSet.length;

  // Convert the job skill set and freelancer skill set to one-hot encodings
  const jobOneHotEncodings: number[][] = jobs.map((job: any) => {
    const encoding = new Array(jobSkillSetSize).fill(0);
    job.skillSetReq.forEach((skill: any) => {
      const index = jobSkillSet.indexOf(skill);
      if (index >= 0) {
        encoding[index] = 1;
      }
    });
    return encoding;
  });

  const freelancerOneHotEncodings: number[][] = freelancerProfiles.map((profile: any) => {
    const encoding = new Array(freelancerSkillSetSize).fill(0);
    profile.skills.forEach((skill: any) => {
      const index = freelancerSkillSet.indexOf(skill);
      if (index >= 0) {
        encoding[index] = 1;
      }
    });
    return encoding;
  });

  const inputShape: number[] = [jobSkillSetSize];
  const outputShape: number[] = [freelancerSkillSetSize];

  // Neural network model architecture
  const model = new keras.Sequential({
    layers: [
      {
        inputShape,
        activation: 'relu',
        units: 64,
        type: 'dense'
      },
      {
        activation: 'relu',
        units: 32,
        type: 'dense'
      },
      {
        activation: 'relu',
        units: 16,
        type: 'dense'
      },
      {
        activation: 'sigmoid',
        units: outputShape[0],
        type: 'dense'
      }
    ]
  });

  // Define the optimizer and loss function
  model.compile({
    optimizer: 'adam',
    loss: 'meanSquaredError'
  });

  // Convert encodings to tensors
  const jobTensor = new Float32Array(jobOneHotEncodings.flat());
  const freelancerTensor = new Float32Array(freelancerOneHotEncodings.flat());

  // Model training
  const batchSize = 32;
  const epochs = 50;
  const validationSplit = 0.1;
  const fitConfig = {
    batchSize,
    epochs,
    validationSplit
  };
  await model.fit(jobTensor, freelancerTensor, fitConfig);

  // Save the model
  const modelArtifacts = await model.model.save();
  localStorage.setItem('model-name', JSON.stringify(modelArtifacts));
  console.log('Model saved:', modelArtifacts);
};
*/

/*
import {FreelancerProfile, Job} from '../models';
import * as tf from '@tensorflow/tfjs';
import fs from 'fs';


  

export const TrainRecommendationModel = async(req: Request, res: Response | any) =>{
  const jobs: any = await Job.find();
  const freelancerProfiles: any = await FreelancerProfile.find();

  const jobSkillSet: any = jobs.reduce((set: any, job: any) => set.concat(job.skillSetReq), []);
  const freelancerSkillSet: any = freelancerProfiles.reduce((set: any, profile: any) => set.concat(profile.skills), []);

  const jobSkillSetSize = jobSkillSet.length;
  const freelancerSkillSetSize = freelancerSkillSet.length;

  // Convert the job skill set and freelancer skill set to one-hot encodings
  const jobOneHotEncodings: number[][] = jobs.map((job: any) => {
    const encoding = new Array(jobSkillSetSize).fill(0);
    job.skillSetReq.forEach((skill: any) => {
      const index = jobSkillSet.indexOf(skill);
      if (index >= 0) {
        encoding[index] = 1;
      }
    });
    return encoding;
  });

  const freelancerOneHotEncodings: number[][] = freelancerProfiles.map((profile: any) => {
    const encoding = new Array(freelancerSkillSetSize).fill(0);
    profile.skills.forEach((skill: any) => {
      const index = freelancerSkillSet.indexOf(skill);
      if (index >= 0) {
        encoding[index] = 1;
      }
    });
    return encoding;
  });

  const inputShape: number[] = [jobSkillSetSize];
  const outputShape: number[] = [freelancerSkillSetSize];

  //neural network model ko architecture define garne
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 64, inputShape, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
  model.add(tf.layers.dense({ units: outputShape[0], activation: 'sigmoid' }));

  // Define the optimizer and loss function
  const optimizer = tf.train.adam();
  model.compile({ optimizer, loss: 'meanSquaredError' });

  // encoding lai tensor ma change garne 
  const jobTensor: Tensor = tf.tensor2d(jobOneHotEncodings);
  const freelancerTensor: Tensor = tf.tensor2d(freelancerOneHotEncodings);

  //Model training part
  await model.fit(jobTensor, freelancerTensor, { epochs: 50 });
  //const modelJSON = model.toJSON();







const saveResults = await model.save(tf.io.withSaveHandler(async (modelArtifacts: any) => {
  localStorage.setItem("model-name", JSON.stringify(modelArtifacts));
  return { success: true, modelArtifactsInfo: {} as any };
}));
console.log(saveResults);
//await model.save('file:///C:/Users/hp/dev/API/model/recommendation-model');

// const path = "./recommendation.json";

//const saveData = async () => {
  //try {
    //await fs.promises.writeFile(path, JSON.stringify(modelJSON));
    //console.log('Data saved to file');
  //} catch (error) {
    //console.error(error);
  //}
//};

//saveData();

}


/*
export const recommendFreelancersForJob = async (jobId: string)=> {
  // Retrieve the job from the database
  const job: any = await Job.findById(jobId);
  
  const jobSkillSet: any = jobs.reduce((set: any, job: any) => set.concat(job.skillSetReq), []);

  // Convert the job skillset requirements to a one-hot encoding
  const jobSkillSetSize: any = job.skillSetReq.length;
  const jobOneHotEncoding: any[][] = [new Array(jobSkillSetSize).fill(0)];
  job.skillSetReq.forEach((skill: any) => {
    const index = jobSkillSet.indexOf(skill);
    if (index >= 0) {
      jobOneHotEncoding[0][index] = 1;
    }
  });

  // Load the trained model
  const model: any = await tf.loadLayersModel('file://path/to/model');

  // Compute the predicted freelancer skillset vector
  const predictedFreelancerSkillset: any[][] = model.predict(tf.tensor2d(jobOneHotEncoding)).arraySync();

  // Retrieve the list of all freelancers
  const allFreelancers: any = await FreelancerProfile.find();

  // Convert the skillsets of all freelancers to one-hot encodings
  const freelancerSkillSetSize: any = jobSkillSetSize;
  const freelancerOneHotEncodings: any[][] = allFreelancers.map((profile: any) => {
    const encoding = new Array(freelancerSkillSetSize).fill(0);
    profile.skillSet.forEach((skill: any) => {
      const index = jobSkillSet.indexOf(skill);
      if (index >= 0) {
        encoding[index] = 1;
      }
    });
    return encoding;
  });

  // Compute the cosine similarities between the predicted freelancer skillset and the skillsets of all freelancers
  const similarityTensor: any = tf.matMul(tf.tensor2d(predictedFreelancerSkillset), tf.tensor2d(freelancerOneHotEncodings).transpose());
  const cosineSimilarities: any[] = similarityTensor.arraySync()[0];

  // Sort the freelancers in descending order of cosine similarity and return the top recommendations
  const recommendedFreelancers: any[] = allFreelancers.sort((a: any, b: any) => cosineSimilarities[b.skillSet] - cosineSimilarities[a.skillSet]).slice(0, 10);
  return recommendedFreelancers;
}
*/ 

// import {FreelancerProfile, Job} from '../models';
// import * as tf from '@tensorflow/tfjs';

// export const GetRecommendation = async (req: any, res: any, next: any) => {
//   try {
//     const job = await Job.findById(req.params.id);
    

//     if (!job) {
//       return res.status(404).json({ error: 'Job not found' });
//     }

//     const allFreelancerProfiles = await FreelancerProfile.find().populate('freelancer',['userName','firstName','lastName','email','description','linkedIn','location']); 

//     //Converting into vector representation
//     const freelancerVectors = allFreelancerProfiles.map((profile: any) => {
//       const skillVector = job.skillSetReq.map((skill: any) => {
//         return profile.skills.includes(skill) ? 1 : 0
//       });
//       console.log(skillVector)
//       return { profileId: profile._id, vector: skillVector };
//     });

//     // Compute the cosine similarity between the job's required skill set and each freelancer's skill set
//     const jobVector = job.skillSetReq.map(() => 1);
//     const similarityScores = freelancerVectors.map((vectorObj: any) => {
//       const similarityTensor = tf.tensor(
//         [cosineSimilarity(jobVector, vectorObj.vector)]
//       );
//       const cosineSimilarityResult: any = tf.cos(similarityTensor);
   
//       return { 
//         profileId: vectorObj.profileId,
//         similarityScore: cosineSimilarityResult.arraySync()[0] 
//       };
//     });

//     // Sort the freelancer profiles by similarity score and return the top match
//     const bestMatch = similarityScores.sort((a: any, b: any) => b.similarityScore - a.similarityScore)[0];

//     const matchedProfile = allFreelancerProfiles.find((profile: any) =>{
//       return profile._id === bestMatch.profileId
//     }
//     );

//     return res.json({
//       bestMatch: matchedProfile
//     });
//   } catch (error: any) {
    
//     return res.status(500).json({
//       error: 'Server error'
//     });
//   }
// }

// function cosineSimilarity(a: any[], b: any[]): any {
//   const dotProduct = a.reduce((acc: any, val: any, idx: any) => acc + val * b[idx], 0);
//   const magnitudeA = Math.sqrt(a.reduce((acc: any, val: any) => acc + val ** 2, 0));
//   const magnitudeB = Math.sqrt(b.reduce((acc: any, val: any) => acc + val ** 2, 0));
//   return dotProduct / (magnitudeA * magnitudeB);
// }


// import {FreelancerProfile, Job} from '../models';
// import * as tf from '@tensorflow/tfjs';




// export const GetRecommendation = async (req: any, res: any) => {
//   try {
//     const job = await Job.findById(req.params.id);
//   if(job){

//     job.skillSetReq.map((r)=>{
//         console.log(r)
//     })
//   }

//     if (!job) {
//       return res.status(404).json({ error: 'Job not found' });
//     }

//     const allFreelancerProfiles = await FreelancerProfile.find().populate('freelancer',['userName','firstName','lastName','email','description','linkedIn','location']); 

//     if(allFreelancerProfiles && job){
//     // Create a vector representation of each freelancer's skill set
//     const freelancerVectors = allFreelancerProfiles.map((profile: any) => {
//       const skillVector = job.skillSetReq.map((skill: any) => profile.skills.includes(skill) ? 1 : 0);
//         while (skillVector.length < job.skillSetReq.length) {
//           skillVector.push(0);
//         }
//       return { profileId: profile._id, vector: skillVector };
//     });

//     // Compute the cosine similarity between the job's required skill set and each freelancer's skill set
//     const jobVector = job.skillSetReq.map(() =>{
//       return 1;
//     } );
//     const similarityScores = freelancerVectors.map((vectorObj: any) => {
//       const similarityTensor = tf.tensor([cosineSimilarity(jobVector, vectorObj.vector)]);
//       const cosineSimilarityResult: any = tf.cos(similarityTensor);
//       return { profileId: vectorObj.profileId, similarityScore: cosineSimilarityResult.arraySync()[0] };
//     });

//     // Sort the freelancer profiles by similarity score and return the top match
//     const bestMatch = similarityScores.sort((a: any, b: any) => b.similarityScore - a.similarityScore)[0];

//     if (!bestMatch || isNaN(bestMatch.similarityScore) || bestMatch.similarityScore <= 0) {
//       return res.json({
//         status: 404,
//         error: 'No suitable freelancer found'
//       });
//     }

//     const matchedProfile = allFreelancerProfiles.find((profile: any) => profile._id.toString() === bestMatch.profileId.toString());
// console.log(matchedProfile);
//     return res.json({ bestMatch: matchedProfile });
//   }
//   } catch (error: any) {
//     console.error(error);
//     return res.status(500).json({ error: 'Server error' });
//   }

// }

// function cosineSimilarity(a: any[], b: any[]): any {
//   const dotProduct = a.reduce((acc: any, val: any, idx: any) => acc + val * b[idx], 0);
//   const magnitudeA = Math.sqrt(a.reduce((acc: any, val: any) => acc + val ** 2, 0));
//   const magnitudeB = Math.sqrt(b.reduce((acc: any, val: any) => acc + val ** 2, 0));
//   return dotProduct / (magnitudeA * magnitudeB);
// }






















// import { Request, Response } from 'express';
// import { Job } from '../models';
// import { FreelancerProfile } from '../models';
// import * as tf from '@tensorflow/tfjs';

// export const GetRecommendation = async(req: any, res: any) =>{
//   try {
//     const job = await Job.findById(req.params.id);

//     if (!job) {
//       return res.status(404).json({ error: 'Job not found' });
//     }

//     const allFreelancerProfiles = await FreelancerProfile.find();

//     // Create a vector representation of each freelancer's skill set
//     const freelancerVectors = allFreelancerProfiles.map((profile: any) => {
//       const skillVector = job.skillSetReq.map((skill: any) => (
//         profile.skills.includes(skill) ? 1 : 0
//         ));
//       console.log(profile._id, skillVector)
//       return { profileId: profile._id, vector: skillVector };
//     });

//     // Compute the cosine similarity between the job's required skill set and each freelancer's skill set
//     const jobVector = job.skillSetReq.map(skill => 1);
//     const similarityScores = freelancerVectors.map((vectorObj: any) => {
//       const similarityTensor = tf.tensor([cosineSimilarity(jobVector, vectorObj.vector)]);
      
//       const cosineSimilarityResult : any = tf.cos(similarityTensor);
    
//       return { profileId: vectorObj.profileId, similarityScore: cosineSimilarityResult.arraySync()[0] };
//     });

// // Sort the freelancer profiles by similarity score and return the top match
// const sortedScores = similarityScores.sort((a: any, b: any) => {
//   if (a.similarityScore > b.similarityScore) {
//     return -1;
//   } else if (a.similarityScore < b.similarityScore) {
//     return 1;
//   } else {
//     return 0;
//   }
// });

// const bestMatch = sortedScores[0];




  
//     if (!bestMatch || bestMatch.similarityScore <= 0) {
//       return res.status(404).json({ error: 'No suitable freelancer found' });
//     }
//     console.log(bestMatch.profileId)
//     const matchedProfile = allFreelancerProfiles.find((profile: any) => profile._id === bestMatch.profileId);

//     return res.json({ bestMatch: matchedProfile });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Server error' });
//   }

// function cosineSimilarity(a: any, b: any) {
//   const commonSkills = a.filter((val: any, idx: any) => b[idx] !== 0);
//   const dotProduct = commonSkills.reduce((acc: any, val: any, idx: any) => acc + val * b[idx], 0);
//   const magnitudeA = Math.sqrt(commonSkills.reduce((acc: any, val: any) => acc + val ** 2, 0));
//   const magnitudeB = Math.sqrt(commonSkills.reduce((acc:any, val: any) => acc + val ** 2, 0));
//   return dotProduct / (magnitudeA * magnitudeB);
// }

// // function cosineSimilarity(a: number[], b: number[]): number {
// //   const dotProduct = a.reduce((acc, val, idx) => acc + val * b[idx], 0);
// //   const magnitudeA = Math.sqrt(a.reduce((acc, val) => acc + val ** 2, 0));
// //   const magnitudeB = Math.sqrt(b.reduce((acc, val) => acc + val ** 2, 0));
// //   const denominator = magnitudeA * magnitudeB;
// //   return denominator === 0 ? 0 : dotProduct / denominator;

// // }


// }



