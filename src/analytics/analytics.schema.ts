import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnalyticsDocument = HydratedDocument<Analytics>;

@Schema({ timestamps: true })
export class Analytics {
    @Prop({ required: true, unique: true, default: 'generator-stats' })
    key: string;

    @Prop({ default: 0 })
    totalDownloads: number;

    @Prop({ default: 0 })
    totalShares: number;
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);
