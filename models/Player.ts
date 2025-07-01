import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IPlayer extends Document {
  name: string;
  age: number;
  nationality: string;
  position: "GK" | "DF" | "MF" | "FW";
  marketValue: number;
  team: mongoose.Types.ObjectId;
  speed: number;
  strength: number;
  technique: number;
  passing: number;
  stamina: number;
}

const PlayerSchema = new Schema<IPlayer>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    nationality: { type: String, required: true },
    position: { type: String, enum: ["GK", "DF", "MF", "FW"], required: true },
    marketValue: { type: Number, required: true },
    team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    speed: { type: Number, required: true },
    strength: { type: Number, required: true },
    technique: { type: Number, required: true },
    passing: { type: Number, required: true },
    stamina: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Player = models.Player || model<IPlayer>("Player", PlayerSchema);
