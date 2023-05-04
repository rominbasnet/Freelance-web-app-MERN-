//@ts-nocheck
import mongoose, {Schema, Document, Model} from 'mongoose';
import NodeGeocoder from 'node-geocoder';


const options = {
  provider: 'mapquest',

  // Optional depending on the providers
  httpAdapter: 'https',
  apiKey: 'GoXQ9W1TvnO0RJJpG4yOanCOBETCVuZu', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

export interface FreelancerDoc extends Document{
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  salt: string;
  linkedIn: string;
  location: string;
  age: number;
  isVerified: boolean;
  description: string;
  icon: string;
  date: string;
}

const FreelancerSchema: Schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  userName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  salt: {type: String, required: true},
  linkedIn: {type: String, required: true},
  location: {type: String, required: true},
  address: {
    type : {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },
  age: {type: String, required: true},
  isVerified: {type: Boolean, required: true, default: false},
  description: {type: String, required: true},
  icon: {type: String},
  date: {type: Date, default: Date.now() }
})

FreelancerSchema.pre('save', async function(next){
  const loc = await geocoder.geocode(this.location);
  this.address = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude]
  }
})

const Freelancer = mongoose.model<FreelancerDoc>('freelancer', FreelancerSchema);

export { Freelancer };
