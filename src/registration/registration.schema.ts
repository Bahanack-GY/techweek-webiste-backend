import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RegistrationDocument = HydratedDocument<Registration>;

export enum ContestType {
  HACKATHON = 'hackathon',
  CYBERSECURITY = 'cybersecurity',
}

@Schema({ _id: false })
export class TeamMember {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  phone: string;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);

@Schema({ timestamps: true })
export class Registration {
  @Prop({ required: true, enum: ContestType })
  contestType: ContestType;

  @Prop({ required: true, trim: true })
  teamName: string;

  @Prop({ required: true, trim: true })
  school: string;

  @Prop({ required: true, trim: true })
  leaderName: string;

  @Prop({ required: true, lowercase: true, trim: true })
  leaderEmail: string;

  @Prop({ required: true, trim: true })
  leaderPhone: string;

  @Prop({ type: [TeamMemberSchema], required: true })
  members: TeamMember[];
}

export const RegistrationSchema = SchemaFactory.createForClass(Registration);

RegistrationSchema.index({ leaderEmail: 1 }, { unique: true });
RegistrationSchema.index({ leaderPhone: 1 }, { unique: true });
