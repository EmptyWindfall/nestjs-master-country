import { ApiProperty } from "@nestjs/swagger";
import { prop } from "@typegoose/typegoose";


export class Cat {
  @ApiProperty({ type: String })
  @prop({ required: true })
  name: string;

  @ApiProperty({ type: Number })
  @prop({ required: true })
  age: number;
}