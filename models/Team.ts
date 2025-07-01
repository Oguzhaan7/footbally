import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ITeam extends Document {
  name: string;
  logoUrl: string;
  league: mongoose.Types.ObjectId;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  logoUrl: String,
  league: { type: Schema.Types.ObjectId, ref: "League" },
  played: { type: Number, default: 0 },
  won: { type: Number, default: 0 },
  drawn: { type: Number, default: 0 },
  lost: { type: Number, default: 0 },
  goalsFor: { type: Number, default: 0 },
  goalsAgainst: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
});

export const Team = models.Team || model<ITeam>("Team", TeamSchema);
