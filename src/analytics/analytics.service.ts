import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Analytics, AnalyticsDocument } from './analytics.schema';
import { Product, ProductDocument } from '../product/product.schema';
import { Order, OrderDocument } from '../order/order.schema';

const STATS_KEY = 'generator-stats';

@Injectable()
export class AnalyticsService implements OnModuleInit {
    constructor(
        @InjectModel(Analytics.name)
        private readonly analyticsModel: Model<AnalyticsDocument>,
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>,
        @InjectModel(Order.name)
        private readonly orderModel: Model<OrderDocument>
    ) { }

    /** Ensure the singleton document exists on startup */
    async onModuleInit() {
        const exists = await this.analyticsModel.findOne({ key: STATS_KEY });
        if (!exists) {
            await this.analyticsModel.create({ key: STATS_KEY });
        }
    }

    async getStats() {
        const statsObj = await this.analyticsModel.findOne({ key: STATS_KEY }).lean();
        const totalProducts = await this.productModel.countDocuments();
        const totalOrders = await this.orderModel.countDocuments();

        const paidOrders = await this.orderModel.find({ status: 'paid' });
        const totalRevenue = paidOrders.reduce((sum, order) => sum + order.totalPrice, 0);

        return {
            ...statsObj,
            totalProducts,
            totalOrders,
            totalRevenue
        };
    }

    async incrementDownload() {
        return this.analyticsModel.findOneAndUpdate(
            { key: STATS_KEY },
            { $inc: { totalDownloads: 1 } },
            { new: true },
        );
    }

    async incrementShare() {
        return this.analyticsModel.findOneAndUpdate(
            { key: STATS_KEY },
            { $inc: { totalShares: 1 } },
            { new: true },
        );
    }
}
