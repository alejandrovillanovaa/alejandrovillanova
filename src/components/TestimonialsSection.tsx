import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface Review {
  id: string;
  name: string;
  business: string;
  message: string;
  rating: number;
  created_at: string;
}

const Stars = ({ count, interactive, onSelect }: { count: number; interactive?: boolean; onSelect?: (n: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i <= count ? "fill-accent text-accent" : "text-muted-foreground/30"} ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
        onClick={() => interactive && onSelect?.(i)}
      />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("reviews")
        .insert({ name: name.trim(), business: business.trim(), message: message.trim(), rating });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setName("");
      setBusiness("");
      setMessage("");
      setRating(5);
      setPrivacyAccepted(false);
      toast({ title: "¡Gracias!", description: "Tu reseña se ha enviado correctamente." });
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo enviar la reseña. Inténtalo de nuevo.", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !business.trim() || !message.trim()) return;
    if (!privacyAccepted) {
      toast({ title: "Consentimiento requerido", description: "Debes aceptar la política de privacidad para enviar tu reseña.", variant: "destructive" });
      return;
    }
    mutation.mutate();
  };

  return (
    <section className="section-padding bg-[hsl(var(--section-subtle))]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12"
        >
          Lo que dicen mis clientes
        </motion.h2>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 space-y-3"
            >
              <Stars count={review.rating} />
              <p className="text-muted-foreground leading-relaxed">"{review.message}"</p>
              <div>
                <p className="font-semibold text-foreground">{review.name}</p>
                <p className="text-sm text-accent">{review.business}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Review form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto rounded-2xl border border-border bg-card p-8"
        >
          <h3 className="font-display text-xl font-semibold text-foreground mb-6 text-center">
            Deja tu reseña
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input placeholder="Tu negocio" value={business} onChange={(e) => setBusiness(e.target.value)} required />
            <Textarea placeholder="Tu experiencia..." value={message} onChange={(e) => setMessage(e.target.value)} required />
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Puntuación:</span>
              <Stars count={rating} interactive onSelect={setRating} />
            </div>
            {/* Consentimiento RGPD */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                className="mt-0.5 accent-accent shrink-0"
                required
              />
              <span className="text-sm text-muted-foreground leading-relaxed">
                He leído y acepto la{" "}
                <Link
                  to="/privacidad"
                  className="text-accent underline hover:text-accent/80"
                >
                  Política de Privacidad
                </Link>{" "}
                y consiento el tratamiento de mis datos para la publicación
                de esta reseña.
              </span>
            </label>
            <Button type="submit" variant="accent" size="lg" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? "Enviando..." : "Enviar reseña"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
