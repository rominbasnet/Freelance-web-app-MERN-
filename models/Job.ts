import mongoose, {Schema, Document, Model} from 'mongoose';

interface Interested extends Document{
  user: any;
  firstName: string;
  lastName: string;
  email: string;
  linkedIn: string;
  location: string;
  description: string;
  skills: [string];
}

interface JobDoc extends Document{
  business: any;
  freelancerProfile: any;
  jobTitle: string;
  jobDescription: string;
  skillSetReq: [string];
  jobBudget: number;
  status: string;
  workStatus: any;
  jobDuration: number;
  rated: boolean;
  interested: [Interested];
  image: string;
  date: string;

}

const JobSchema = new mongoose.Schema({
  business: {type: mongoose.Schema.Types.ObjectId, ref: 'business'},
  freelancerProfile: {type: mongoose.Schema.Types.ObjectId, default: null,ref:'freelancerprofile'},
  jobTitle: {type: String, required: true},
  jobDescription: {type: String, required: true},
  skillSetReq: {type: [String], required: true},
  jobBudget: {type: Number, required: true},
  status: { type: String, enum: ["not-assigned", "assigned"], default: "not-assigned" }, 
  workStatus: { type: String, enum: [null, "In-Progress", "Completed"], default: null }, 
  jobDuration: {type: Number, required: true},
  image: {type: String},
  rated: {type: Boolean, default: false},
  interested: [
    {
      user: {type: mongoose.Schema.Types.ObjectId, ref: 'freelancer'},
      firstName: {type: String},
      lastName: {type: String},
      email: {type: String},
      linkedIn: {type: String},
      location: {type: String},
      description: {type: String},
      skills: {type: [String]}
    }
  ],
  date: {type: Date, default: Date.now()}
})

const Job = mongoose.model<JobDoc>('job',JobSchema);

export { Job };

