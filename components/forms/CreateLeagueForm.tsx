"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateLeague } from "@/hooks/graphql/useCreateLeague";
import { useState } from "react";
import { toast } from "sonner";

const leagueSchema = z.object({
  name: z.string().min(1, "League name is required").max(50, "League name is too long"),
  country: z.string().min(1, "Country is required").max(30, "Country name is too long"),
  logoUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

type LeagueFormData = z.infer<typeof leagueSchema>;

interface CreateLeagueFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateLeagueForm({ isOpen, onClose, onSuccess }: CreateLeagueFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createLeague, loading, error } = useCreateLeague();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeagueFormData>({
    resolver: zodResolver(leagueSchema),
  });

  const onSubmit = async (data: LeagueFormData) => {
    setIsSubmitting(true);
    try {
      await createLeague({
        name: data.name,
        country: data.country,
        logoUrl: data.logoUrl || undefined,
      });

      toast.success(`${data.name} league created successfully!`);
      reset();
      onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error("Error creating league:", err);
      toast.error(err.message || "Failed to create league. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">Yeni Lig Oluştur</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-700">
              Lig Adı *
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="Örn: Süper Lig"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="country" className="text-sm font-medium text-slate-700">
              Ülke *
            </label>
            <input
              {...register("country")}
              type="text"
              id="country"
              placeholder="Örn: Türkiye"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
            {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="logoUrl" className="text-sm font-medium text-slate-700">
              Logo URL (Opsiyonel)
            </label>
            <input
              {...register("logoUrl")}
              type="url"
              id="logoUrl"
              placeholder="https://example.com/logo.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
            {errors.logoUrl && <p className="text-red-500 text-sm">{errors.logoUrl.message}</p>}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">Lig oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1" disabled={isSubmitting}>
              İptal
            </Button>
            <Button type="submit" className="flex-1 bg-slate-800 hover:bg-slate-900" disabled={isSubmitting || loading}>
              {isSubmitting ? "Oluşturuluyor..." : "Lig Oluştur"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
