import { IsOptional, IsString, IsInt } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateSlipDto {
  constructor() {
    this.Sir_name = '';
    this.Party_name = '';
    this.Truck_number = '';
    this.Drop_location = '';
    this.Pickup_location = '';
    this.Fixed_rate = '';
    this.Advance_wage = 0;
    this.Load = '';
    this.Payment_location = '';
    this.Remarks = '';
    this.Unloading_point = '';
  }

  @Transform(({ value }) =>
    value
      ? new Date(value).toLocaleDateString()
      : new Date().toLocaleDateString(),
  )
  @IsOptional()
  Date: string;

  @IsString()
  @IsOptional()
  Sir_name: string;

  @IsString()
  @IsOptional()
  Party_name: string;

  @IsString()
  @IsOptional()
  Truck_number: string;

  @IsString()
  @IsOptional()
  Drop_location: string;

  @IsString()
  @IsOptional()
  Pickup_location: string;

  @IsString()
  @IsOptional()
  Fixed_rate: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  Advance_wage: number;

  @IsString()
  @IsOptional()
  Load: string;

  @IsString()
  @IsOptional()
  Payment_location: string;

  @IsString()
  @IsOptional()
  Remarks: string;

  @IsString()
  @IsOptional()
  Unloading_point: string;
}
