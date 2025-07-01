import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ITeam extends Document {
  name: string;
  logoUrl: string;
  league: mongoose.Types.ObjectId;
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  logoUrl: String,
  league: { type: Schema.Types.ObjectId, ref: "League" },
});

export const Team = models.Team || model<ITeam>("Team", TeamSchema);
