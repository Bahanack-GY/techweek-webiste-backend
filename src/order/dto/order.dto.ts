import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    userPhone: string;

    @IsString()
    @IsNotEmpty()
    userAddress: string;

    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsString()
    @IsOptional()
    productImage: string;

    @IsNumber()
    @IsNotEmpty()
    totalPrice: number;
}

export class UpdateOrderStatusDto {
    @IsEnum(['pending', 'paid'])
    status: string;
}
