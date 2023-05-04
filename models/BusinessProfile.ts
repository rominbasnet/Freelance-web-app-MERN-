import mongoose, {Schema, Document, Model} from 'mongoose';

interface BusinessProfileDoc extends Document{
  business: any;
  website: string;
  status: string;
  employeeCount: number;
  established: number;
  companyCategory: string;
  businessImage: string;
}

const BusinessProfileSchema: Schema = new Schema({
  business: {type: mongoose.Schema.Types.ObjectId, ref: 'business'},
  website: {type: String, required: true},
  status: {type: String, required: true},
  employeeCount: {type: Number},
  established: {type: Number, required: true},
  companyCategory: {type: String},
  businessImage: {type: String}
})

const BusinessProfile = mongoose.model<BusinessProfileDoc>('businessprofile', BusinessProfileSchema);

export { BusinessProfile };

