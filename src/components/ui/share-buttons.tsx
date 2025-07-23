"use client";

import { useState } from "react";
import {
  Share2,
  MessageCircle,
  Facebook,
  Instagram,
  Mail,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "./toast";

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
  imageUrl?: string;
}

// Ícone TikTok personalizado
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.321 5.562a5.124 5.124 0 0 1-1.199-.748 4.997 4.997 0 0 1-1.113-1.293 5.007 5.007 0 0 1-.673-1.461h2.995V2.06h-5.064v14.32c0 .742-.198 1.451-.561 2.06a3.993 3.993 0 0 1-1.452 1.477c-.62.361-1.339.541-2.073.541-1.158 0-2.233-.445-3.035-1.246A4.264 4.264 0 0 1 5.9 16.247c0-1.158.445-2.233 1.246-3.035a4.26 4.26 0 0 1 2.965-1.247c.742 0 1.451.198 2.06.561v-4.89a9.124 9.124 0 0 0-2.06-.227 9.31 9.31 0 0 0-4.682 1.247 9.317 9.317 0 0 0-3.407 3.406A9.315 9.315 0 0 0 .776 16.247c0 1.674.45 3.287 1.246 4.682a9.316 9.316 0 0 0 3.407 3.406 9.315 9.315 0 0 0 4.682 1.246 9.31 9.31 0 0 0 4.682-1.246 9.317 9.317 0 0 0 3.407-3.406 9.315 9.315 0 0 0 1.246-4.682V8.503a8.91 8.91 0 0 0 2.955 1.504v-4.445h-.001Z" />
  </svg>
);

export function ShareButtons({
  title,
  url,
  description,
  imageUrl,
}: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { showToast, ToastContainer } = useToast();

  const shareData = {
    title,
    url,
    description: description || "",
  };

  const handleWhatsAppShare = () => {
    const text = `*${shareData.title}*\n\n${
      shareData.description ? shareData.description + "\n\n" : ""
    }${shareData.url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareData.url
    )}&quote=${encodeURIComponent(shareData.title)}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
    setIsOpen(false);
  };

  const handleTwitterShare = () => {
    const text = `${shareData.title} \n\n`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(shareData.url)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
    setIsOpen(false);
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(shareData.title);
    const body = encodeURIComponent(
      `${shareData.title}\n\n${
        shareData.description ? shareData.description + "\n\n" : ""
      }${shareData.url}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setIsOpen(false);
  };

  const handleInstagramShare = async () => {
    const text = `${shareData.title}\n\n${shareData.url}`;

    // Tentar usar Web Share API se disponível e houver imagem
    if (navigator.share && imageUrl) {
      try {
        // Primeiro, tentar fazer fetch da imagem se for uma URL completa
        let imageFile;
        if (imageUrl.startsWith("http")) {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          imageFile = new File([blob], "image.jpg", { type: blob.type });
        }

        await navigator.share({
          title: shareData.title,
          text: shareData.description || "",
          url: shareData.url,
          files: imageFile ? [imageFile] : undefined,
        });
        setIsOpen(false);
        return;
      } catch {
        console.log("Web Share API falhou, usando fallback");
      }
    }

    // Tentar abrir o app do Instagram em mobile
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPhone/i)
    ) {
      // Deep link para Instagram Stories com parâmetros
      if (imageUrl) {
        // Tentar abrir Instagram Stories com imagem
        window.location.href = `instagram://story-camera?media=${encodeURIComponent(
          imageUrl
        )}&caption=${encodeURIComponent(text)}`;
      } else {
        window.location.href = `instagram://story-camera`;
      }

      // Fallback: copiar link após um delay
      setTimeout(() => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text);
          showToast(
            "Abrindo Instagram... Se não funcionar, o link foi copiado para colar no story!",
            "success"
          );
        }
      }, 500);
    } else {
      // Para desktop: copiar link e abrir Instagram web
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        showToast(
          "Link copiado! Cole no Instagram para compartilhar.",
          "success"
        );
      }
      // Tentar abrir Instagram web
      window.open("https://www.instagram.com/", "_blank");
    }
    setIsOpen(false);
  };

  const handleTikTokShare = async () => {
    const text = `${shareData.title}\n\n${shareData.url}`;

    // Tentar usar Web Share API se disponível e houver imagem
    if (navigator.share && imageUrl) {
      try {
        // Primeiro, tentar fazer fetch da imagem se for uma URL completa
        let imageFile;
        if (imageUrl.startsWith("http")) {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          imageFile = new File([blob], "image.jpg", { type: blob.type });
        }

        await navigator.share({
          title: shareData.title,
          text: shareData.description || "",
          url: shareData.url,
          files: imageFile ? [imageFile] : undefined,
        });
        setIsOpen(false);
        return;
      } catch {
        console.log("Web Share API falhou, usando fallback");
      }
    }

    // Tentar abrir o app do TikTok em mobile
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPhone/i)
    ) {
      // Deep link para TikTok com parâmetros
      if (imageUrl) {
        // Tentar abrir TikTok com imagem
        window.location.href = `tiktok://upload?media=${encodeURIComponent(
          imageUrl
        )}&caption=${encodeURIComponent(text)}`;
      } else {
        window.location.href = `tiktok://`;
      }

      // Fallback: copiar link após um delay
      setTimeout(() => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text);
          showToast(
            "Abrindo TikTok... Se não funcionar, o link foi copiado para colar no vídeo!",
            "success"
          );
        }
      }, 500);
    } else {
      // Para desktop: copiar link e abrir TikTok web
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        showToast("Link copiado! Cole no TikTok para compartilhar.", "success");
      }
      // Tentar abrir TikTok web
      window.open("https://www.tiktok.com/", "_blank");
    }
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.div
            animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Share2 className="w-4 h-4" />
          </motion.div>
          Compartilhar
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 bg-background border border-border rounded-lg shadow-lg p-2 z-50 min-w-[200px]"
            >
              <motion.div className="space-y-1">
                <motion.button
                  onClick={handleWhatsAppShare}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors cursor-pointer"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <span>WhatsApp</span>
                </motion.button>

                <motion.button
                  onClick={handleFacebookShare}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors cursor-pointer"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Facebook className="w-5 h-5 text-blue-600" />
                  <span>Facebook</span>
                </motion.button>

                <motion.button
                  onClick={handleTwitterShare}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors cursor-pointer"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <X className="w-5 h-5 text-blue-400" />
                  <span>Twitter/X</span>
                </motion.button>

                <motion.button
                  onClick={handleEmailShare}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors cursor-pointer"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span>Email</span>
                </motion.button>

                <motion.button
                  onClick={handleInstagramShare}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors cursor-pointer"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <Instagram className="w-5 h-5 text-pink-600" />
                  <span>Instagram</span>
                </motion.button>

                <motion.button
                  onClick={handleTikTokShare}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors cursor-pointer"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <TikTokIcon className="w-5 h-5 text-black dark:text-white" />
                  <span>TikTok</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay para fechar o dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>

      <ToastContainer />
    </>
  );
}
