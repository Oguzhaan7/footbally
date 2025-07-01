import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ILeague extends Document {
  name: string;
  country: string;
  logoUrl: string;
}

const LeagueSchema = new Schema<ILeague>({
  name: { type: String, required: true },
  country: String,
  logoUrl: String,
});

export const League = models.League || model<ILeague>("League", LeagueSchema);
