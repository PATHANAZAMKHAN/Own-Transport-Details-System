import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, IsInt } from 'class-validator';

export class CreateMemoDto {
  constructor() {
    this.Memo_number = Math.ceil(Math.random());
    this.Truck_number = '';
    this.Pickup_location = '';
    this.Owner_address = '';
    this.Owner_name = '';
    this.Owner_number = 0;
    this.Driver_name = '';
    this.Drop_location = '';
    this.Consignor = '';
    this.Consignee = '';
    this.Particulars = '';
    this.Weight = '';
    this.Total_collection = 0;
    this.Height_freight = 0;
    this.Height_charge = 0;
    this.Workout = 0;
    this.Advance = 0;
    this.Payment_location = '';
    this.Remarks = '';
    this.Commission = 0;
    this.Tapal = 0;
    this.Weight_wage = 0;
    this.Guide_rupees = 0;
    this.Other_expenses = 0;
    // this.Calculated_collection = 0;
    // this.Balance = 0;
    // this.Grand_total = 0;
  }

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  Memo_number: number;

  @IsString()
  @IsOptional()
  Truck_number: string;

  @Transform(({ value }) =>
    value
      ? new Date(value).toLocaleDateString()
      : new Date().toLocaleDateString(),
  )
  @IsOptional()
  Inserted_date: string;

  @IsString()
  @IsOptional()
  Pickup_location: string;

  @IsString()
  @IsOptional()
  Owner_address: string;

  @IsString()
  @IsOptional()
  Owner_name: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  Owner_number: number;

  @IsString()
  @IsOptional()
  Driver_name: string;

  @IsString()
  @IsOptional()
  Drop_location: string;

  @IsString()
  @IsOptional()
  Consignor: string;

  @IsString()
  @IsOptional()
  Consignee: string;

  @IsString()
  @IsOptional()
  Particulars: string;

  @IsString()
  @IsOptional()
  Weight: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  Total_collection: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  Height_freight: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  Height_charge: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  Workout: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  Advance: number;

  @IsString()
  @IsOptional()
  Payment_location: string;

  @IsString()
  @IsOptional()
  Remarks: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  Commission: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  Tapal: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  Weight_wage: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  Guide_rupees: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  Other_expenses: number;

  //!these 3 fields are calculated and are not taken as input

  get Calculated_collection(): number {
    return this.Height_charge + this.Height_freight + this.Total_collection;
  }

  get Balance(): number {
    return this.Calculated_collection - this.Advance;
  }

  get Grand_total(): number {
    return (
      this.Commission +
      this.Tapal +
      this.Weight_wage +
      this.Guide_rupees +
      this.Other_expenses
    );
  }
}
