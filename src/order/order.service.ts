import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) { }

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const createdOrder = new this.orderModel(createOrderDto);
        return createdOrder.save();
    }

    async findAll(): Promise<Order[]> {
        return this.orderModel.find().sort({ createdAt: -1 }).exec();
    }

    async updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order> {
        const updated = await this.orderModel.findByIdAndUpdate(
            id,
            { status: updateOrderStatusDto.status },
            { new: true }
        );
        if (!updated) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return updated;
    }
}
