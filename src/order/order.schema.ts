import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
    @Prop({ required: true })
    userName: string;

    @Prop({ required: true })
    userPhone: string;

    @Prop({ required: true })
    userAddress: string;

    @Prop({ required: true })
    productId: string;

    @Prop({ required: true })
    productName: string;

    @Prop({ required: false })
    productImage: string;

    @Prop({ required: true })
    totalPrice: number;

    @Prop({ default: 'pending', enum: ['pending', 'paid'] })
    status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
