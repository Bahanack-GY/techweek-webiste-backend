import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Analytics, AnalyticsSchema } from './analytics.schema';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { Product, ProductSchema } from '../product/product.schema';
import { Order, OrderSchema } from '../order/order.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Analytics.name, schema: AnalyticsSchema },
            { name: Product.name, schema: ProductSchema },
            { name: Order.name, schema: OrderSchema },
        ]),
    ],
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
    exports: [AnalyticsService],
})
export class AnalyticsModule { }
