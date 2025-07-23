"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Copy,
  Trash2,
  Plus,
  Settings,
  Palette,
  Sparkles,
} from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";

interface PromptField {
  id: string;
  type: string;
  label: string;
  value: string;
  required: boolean;
}

export default function MediaJsonGenPage() {
  const [promptType, setPromptType] = useState("image");
  const [aiModel, setAiModel] = useState("runway-gen-4");
  const [promptName, setPromptName] = useState("");
  const [promptDescription, setPromptDescription] = useState("");
  const [fields, setFields] = useState<PromptField[]>([]);
  const [jsonOutput, setJsonOutput] = useState("");
  const [showJson, setShowJson] = useState(false);

  const promptTypes = [
    { value: "image", label: "Geração de Imagem" },
    { value: "video", label: "Geração de Vídeo" },
  ];

  const imageModels = [
    { value: "runway-gen-4", label: "Runway Gen-4" },
    { value: "google-imagen-4", label: "Google Imagen 4" },
    { value: "hidream", label: "HiDream" },
    { value: "recraft-v3", label: "Recraft V3" },
    { value: "ideogram-v3", label: "Ideogram V3" },
    { value: "stable-diffusion-3-5", label: "Stable Diffusion 3.5" },
    { value: "sdxl", label: "SDXL" },
    { value: "ponyxl", label: "PonyXL" },
    { value: "gpt-image-1", label: "GPT Image 1" },
    { value: "flux", label: "FLUX" },
    { value: "minimax-image-01", label: "Minimax Image 01" },
    { value: "luma-photon", label: "Luma Photon" },
    { value: "stable-diffusion", label: "Stable Diffusion" },
    { value: "dalle-3", label: "DALL-E 3" },
    { value: "midjourney", label: "Midjourney" },
    { value: "leonardo-ai", label: "Leonardo AI" },
    { value: "other", label: "Other" },
  ];

  const videoModels = [
    { value: "google-veo-3", label: "Google Veo 3" },
    { value: "pixverse", label: "Pixverse" },
    { value: "kling-v2-1", label: "Kling v2.1" },
    { value: "seedance-1", label: "Seedance 1" },
    { value: "hailuo-02", label: "Hailuo 02" },
    { value: "openai-sora", label: "OpenAI Sora" },
    { value: "runway-gen-3", label: "Runway Gen-3" },
    { value: "luma-dream-machine", label: "Luma Dream Machine" },
    { value: "kling-ai", label: "Kling AI" },
    { value: "pika-labs", label: "Pika Labs" },
    { value: "other", label: "Other" },
  ];

  const aiModels = promptType === "video" ? videoModels : imageModels;

  // Load default fields
  const loadDefaultFields = () => {
    // Unified fields for both image and video
    const allFields = [
      // Shot & Composition
      {
        id: "composition",
        type: "text",
        label: "Composition",
        value:
          "Medium close-up, 35mm lens, Sony A7S III, shallow depth of field",
        required: false,
      },
      {
        id: "camera-motion",
        type: "text",
        label: "Camera Motion",
        value: "none, static camera",
        required: false,
      },
      {
        id: "frame-rate",
        type: "text",
        label: "Frame Rate",
        value: "24fps",
        required: false,
      },
      {
        id: "film-grain",
        type: "text",
        label: "Film Grain",
        value: "clean digital with slight texture",
        required: false,
      },

      // Subject & Character
      {
        id: "description",
        type: "textarea",
        label: "Description",
        value:
          "Young woman with pale skin, light blue eyes, long straight black hair",
        required: false,
      },
      {
        id: "wardrobe",
        type: "text",
        label: "Wardrobe",
        value: "oversized long blue T-shirt",
        required: false,
      },
      {
        id: "action",
        type: "textarea",
        label: "Action",
        value:
          "gently rubs the subject's head while smiling, speaking directly",
        required: false,
      },

      // Scene & Environment
      {
        id: "location",
        type: "text",
        label: "Location",
        value: "bedroom",
        required: false,
      },
      {
        id: "time-of-day",
        type: "text",
        label: "Time of Day",
        value: "early morning",
        required: false,
      },
      {
        id: "lighting",
        type: "text",
        label: "Lighting",
        value: "natural soft window light, warm post correction",
        required: false,
      },
      {
        id: "tone",
        type: "text",
        label: "Tone",
        value: "casual, cozy",
        required: false,
      },

      // Visual Details
      {
        id: "style",
        type: "text",
        label: "Style",
        value: "real life vlog, Instagram reel aesthetic",
        required: false,
      },
      {
        id: "color-palette",
        type: "text",
        label: "Color Palette",
        value: "warm tones, natural colors",
        required: false,
      },
      {
        id: "mood",
        type: "text",
        label: "Mood",
        value: "intimate, personal, relaxed",
        required: false,
      },

      // Cinematography
      {
        id: "depth-of-field",
        type: "text",
        label: "Depth of Field",
        value: "shallow depth of field, background blur",
        required: false,
      },
      {
        id: "focus",
        type: "text",
        label: "Focus",
        value: "sharp focus on subject",
        required: false,
      },
      {
        id: "exposure",
        type: "text",
        label: "Exposure",
        value: "properly exposed, natural brightness",
        required: false,
      },
      {
        id: "white-balance",
        type: "text",
        label: "White Balance",
        value: "warm white balance",
        required: false,
      },

      // Audio & Sound
      {
        id: "ambient-sound",
        type: "text",
        label: "Ambient Sound",
        value: "room tone, faint city noise",
        required: false,
      },
      {
        id: "dialogue-speech",
        type: "text",
        label: "Dialogue/Speech",
        value: "",
        required: false,
      },
      {
        id: "background-music",
        type: "text",
        label: "Background Music",
        value: "soft instrumental, no music",
        required: false,
      },
      {
        id: "sound-effects",
        type: "text",
        label: "Sound Effects",
        value: "gentle sounds, nature ambiance",
        required: false,
      },

      // Motion & Animation
      {
        id: "camera-movement",
        type: "text",
        label: "Camera Movement",
        value: "static shot, slow pan, smooth tracking",
        required: false,
      },
      {
        id: "subject-movement",
        type: "text",
        label: "Subject Movement",
        value: "gentle head movement, natural gestures",
        required: false,
      },
      {
        id: "speed-tempo",
        type: "text",
        label: "Speed/Tempo",
        value: "natural pace, slow motion, time-lapse",
        required: false,
      },
      {
        id: "duration",
        type: "text",
        label: "Duration",
        value: "5 seconds, 10 seconds, 30 seconds",
        required: false,
      },

      // Video Style
      {
        id: "video-format",
        type: "text",
        label: "Video Format",
        value: "cinematic, documentary, social media",
        required: false,
      },
      {
        id: "transitions",
        type: "text",
        label: "Transitions",
        value: "smooth cuts, fade in/out, no transitions",
        required: false,
      },
      {
        id: "visual-effects",
        type: "text",
        label: "Visual Effects",
        value: "natural lighting, color grading, filters",
        required: false,
      },
      {
        id: "aspect-ratio",
        type: "text",
        label: "Aspect Ratio",
        value: "16:9, 9:16, 1:1",
        required: false,
      },
    ];

    return allFields;
  };

  // Reset AI model and fields when prompt type changes
  useEffect(() => {
    if (promptType === "video") {
      setAiModel("google-veo-3");
    } else {
      setAiModel("runway-gen-4");
    }
    setFields(loadDefaultFields());
    // Clear JSON output when prompt type changes
    setJsonOutput("");
    setShowJson(false);
  }, [promptType]);

  const addField = () => {
    const newField: PromptField = {
      id: Date.now().toString(),
      type: "text",
      label: "",
      value: "",
      required: false,
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<PromptField>) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const generateJson = () => {
    // Generate unified JSON structure for both image and video
    const jsonData = {
      shot: {
        composition: fields.find((f) => f.id === "composition")?.value || "",
        camera_motion:
          fields.find((f) => f.id === "camera-motion")?.value || "",
        frame_rate: fields.find((f) => f.id === "frame-rate")?.value || "",
        film_grain: fields.find((f) => f.id === "film-grain")?.value || "",
      },
      subject: {
        description: fields.find((f) => f.id === "description")?.value || "",
        wardrobe: fields.find((f) => f.id === "wardrobe")?.value || "",
        action: fields.find((f) => f.id === "action")?.value || "",
      },
      scene: {
        location: fields.find((f) => f.id === "location")?.value || "",
        time_of_day: fields.find((f) => f.id === "time-of-day")?.value || "",
        lighting: fields.find((f) => f.id === "lighting")?.value || "",
        tone: fields.find((f) => f.id === "tone")?.value || "",
      },
      visual_details: {
        style: fields.find((f) => f.id === "style")?.value || "",
        color_palette:
          fields.find((f) => f.id === "color-palette")?.value || "",
        mood: fields.find((f) => f.id === "mood")?.value || "",
      },
      cinematography: {
        depth_of_field:
          fields.find((f) => f.id === "depth-of-field")?.value || "",
        focus: fields.find((f) => f.id === "focus")?.value || "",
        exposure: fields.find((f) => f.id === "exposure")?.value || "",
        white_balance:
          fields.find((f) => f.id === "white-balance")?.value || "",
      },
      audio: {
        ambient: fields.find((f) => f.id === "ambient-sound")?.value || "",
        dialogue: fields.find((f) => f.id === "dialogue-speech")?.value || "",
        music: fields.find((f) => f.id === "background-music")?.value || "",
        sound_effects:
          fields.find((f) => f.id === "sound-effects")?.value || "",
      },
      motion: {
        camera_movement:
          fields.find((f) => f.id === "camera-movement")?.value || "",
        subject_movement:
          fields.find((f) => f.id === "subject-movement")?.value || "",
        speed: fields.find((f) => f.id === "speed-tempo")?.value || "",
        duration: fields.find((f) => f.id === "duration")?.value || "",
      },
      video_style: {
        format: fields.find((f) => f.id === "video-format")?.value || "",
        transitions: fields.find((f) => f.id === "transitions")?.value || "",
        effects: fields.find((f) => f.id === "visual-effects")?.value || "",
        aspect_ratio: fields.find((f) => f.id === "aspect-ratio")?.value || "",
      },
    };

    setJsonOutput(JSON.stringify(jsonData, null, 2));
    setShowJson(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
  };

  const clearForm = () => {
    setPromptName("");
    setPromptDescription("");
    setFields(loadDefaultFields());
    setJsonOutput("");
    setShowJson(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundBeams className="opacity-20" />

      {/* Breadcrumb */}
      <div className="border-b border-border relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Palette className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Gerador de JSON para Prompts de IA
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Crie prompts profissionais de IA com nosso editor visual
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Settings */}
            <div className="bg-card border rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6" />
                Configurações Básicas
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Prompt Type */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tipo de Prompt
                  </label>
                  <select
                    value={promptType}
                    onChange={(e) => setPromptType(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {promptTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* AI Model */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Modelo de IA
                  </label>
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {aiModels.map((model) => (
                      <option key={model.value} value={model.value}>
                        {model.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Prompt Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nome do Prompt
                  </label>
                  <input
                    type="text"
                    value={promptName}
                    onChange={(e) => setPromptName(e.target.value)}
                    placeholder="Digite o nome do seu prompt"
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Prompt Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={promptDescription}
                    onChange={(e) => setPromptDescription(e.target.value)}
                    placeholder="Descreva o que este prompt faz"
                    rows={3}
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Fields Section */}
            <div className="bg-card border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Campos do Prompt
                </h2>
                <Button onClick={addField} size="sm">
                  <Plus className="w-4 h-4" />
                  Adicionar Campo
                </Button>
              </div>

              <div className="space-y-6">
                {/* Shot & Composition Section */}
                <div className="border border-border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Shot & Composition
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Camera positioning, framing, and visual composition
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields
                      .filter((field) =>
                        [
                          "composition",
                          "camera-motion",
                          "frame-rate",
                          "film-grain",
                        ].includes(field.id)
                      )
                      .map((field) => (
                        <div key={field.id} className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            {field.label}
                          </label>
                          {field.type === "textarea" ? (
                            <textarea
                              value={field.value}
                              onChange={(e) =>
                                updateField(field.id, {
                                  value: e.target.value,
                                })
                              }
                              rows={3}
                              className="w-full p-2 border border-border rounded bg-background text-foreground text-sm"
                            />
                          ) : (
                            <input
                              type="text"
                              value={field.value}
                              onChange={(e) =>
                                updateField(field.id, {
                                  value: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-border rounded bg-background text-foreground text-sm"
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Subject & Character Section */}
                <div className="border border-border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Subject & Character
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Main subject description, appearance, and wardrobe
                  </p>
                  <div className="space-y-4">
                    {fields
                      .filter((field) =>
                        ["description", "wardrobe", "action"].includes(field.id)
                      )
                      .map((field) => (
                        <div key={field.id} className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            {field.label}
                          </label>
                          {field.type === "textarea" ? (
                            <textarea
                              value={field.value}
                              onChange={(e) =>
                                updateField(field.id, {
                                  value: e.target.value,
                                })
                              }
                              rows={3}
                              className="w-full p-2 border border-border rounded bg-background text-foreground text-sm"
                            />
                          ) : (
                            <input
                              type="text"
                              value={field.value}
                              onChange={(e) =>
                                updateField(field.id, {
                                  value: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-border rounded bg-background text-foreground text-sm"
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Scene & Environment Section */}
                <div className="border border-border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Scene & Environment
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Location, time, lighting, and environmental details
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields
                      .filter((field) =>
                        [
                          "location",
                          "time-of-day",
                          "lighting",
                          "tone",
                        ].includes(field.id)
                      )
                      .map((field) => (
                        <div key={field.id} className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            {field.label}
                          </label>
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) =>
                              updateField(field.id, {
                                value: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-border rounded bg-background text-foreground text-sm"
                          />
                        </div>
                      ))}
                  </div>
                </div>

                {/* Visual Details Section */}
                <div className="border border-border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Visual Details
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Style, aesthetics, and visual treatment
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields
                      .filter((field) =>
                        ["style", "color-palette", "mood"].includes(field.id)
                      )
                      .map((field) => (
                        <div key={field.id} className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            {field.label}
                          </label>
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) =>
                              updateField(field.id, {
                                value: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-border rounded bg-background text-foreground text-sm"
                          />
                        </div>
                      ))}
                  </div>
                </div>

                {/* Cinematography Section */}
                <div className="border border-border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Cinematography
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Advanced camera and visual settings
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields
                      .filter((field) =>
                        [
                          "depth-of-field",
                          "focus",
                          "exposure",
                          "white-balance",
                        ].includes(field.id)
                      )
                      .map((field) => (
                        <div key={field.id} className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            {field.label}
                          </label>
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) =>
                              updateField(field.id, {
                                value: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-border rounded bg-background text-foreground text-sm"
                          />
                        </div>
                      ))}
                  </div>
                </div>

                {/* Audio & Sound Section */}
                <div className="border border-border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Audio & Sound
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Audio elements, dialogue, and soundscape
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields
                      .filter((field) =>
                        [
                          "ambient-sound",
                          "dialogue-speech",
                          "background-music",
                          "sound-effects",
                        ].includes(field.id)
                      )
                      .map((field) => (
                        <div key={field.id} className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            {field.label}
                          </label>
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) =>
                              updateField(field.id, {
                                value: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-border rounded bg-background text-foreground text-sm"
                          />
                        </div>
                      ))}
                  </div>
                </div>

                {/* Motion & Animation Section */}
                <div className="border border-border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Motion & Animation
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Camera movement, subject motion, and timing
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields
                      .filter((field) =>
                        [
                          "camera-movement",
                          "subject-movement",
                          "speed-tempo",
                          "duration",
                        ].includes(field.id)
                      )
                      .map((field) => (
                        <div key={field.id} className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            {field.label}
                          </label>
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) =>
                              updateField(field.id, {
                                value: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-border rounded bg-background text-foreground text-sm"
                          />
                        </div>
                      ))}
                  </div>
                </div>

                {/* Video Style Section */}
                <div className="border border-border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Video Style
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Format, transitions, effects, and aspect ratio
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields
                      .filter((field) =>
                        [
                          "video-format",
                          "transitions",
                          "visual-effects",
                          "aspect-ratio",
                        ].includes(field.id)
                      )
                      .map((field) => (
                        <div key={field.id} className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            {field.label}
                          </label>
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) =>
                              updateField(field.id, {
                                value: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-border rounded bg-background text-foreground text-sm"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Sidebar - Sticky */}
          <div className="hidden lg:block space-y-6 lg:sticky lg:top-8 lg:self-start">
            {/* Action Buttons */}
            <div className="bg-card border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Ações
              </h3>
              <div className="space-y-3">
                <Button onClick={generateJson} className="w-full h-12 text-lg">
                  <Download className="w-5 h-5 mr-2" />
                  Gerar JSON
                </Button>
                <Button
                  onClick={clearForm}
                  variant="outline"
                  className="w-full h-12 text-lg"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Limpar Formulário
                </Button>
              </div>
            </div>

            {/* JSON Output Section */}
            <div className="bg-card border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">
                  JSON Gerado
                </h2>
                {jsonOutput && (
                  <Button onClick={copyToClipboard} size="sm" variant="outline">
                    <Copy className="w-4 h-4" />
                    Copiar
                  </Button>
                )}
              </div>

              {showJson ? (
                <div className="bg-muted rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-xs text-foreground whitespace-pre-wrap">
                    {jsonOutput}
                  </pre>
                </div>
              ) : (
                <div className="bg-muted rounded-lg p-6 text-center">
                  <Palette className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Clique em &quot;Gerar JSON&quot; para ver o resultado.
                  </p>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="bg-card border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Recursos
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Editor visual intuitivo
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Importação e exportação de JSON
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Sugestões inteligentes
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Compatível com todos os modelos de IA
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Templates da comunidade
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile Sidebar - Normal flow */}
          <div className="lg:hidden space-y-6 mt-8">
            {/* Action Buttons */}
            <div className="bg-card border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Ações
              </h3>
              <div className="space-y-3">
                <Button onClick={generateJson} className="w-full h-12 text-lg">
                  <Download className="w-5 h-5 mr-2" />
                  Gerar JSON
                </Button>
                <Button
                  onClick={clearForm}
                  variant="outline"
                  className="w-full h-12 text-lg"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Limpar Formulário
                </Button>
              </div>
            </div>

            {/* JSON Output Section */}
            <div className="bg-card border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">
                  JSON Gerado
                </h2>
                {jsonOutput && (
                  <Button onClick={copyToClipboard} size="sm" variant="outline">
                    <Copy className="w-4 h-4" />
                    Copiar
                  </Button>
                )}
              </div>

              {showJson ? (
                <div className="bg-muted rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-xs text-foreground whitespace-pre-wrap">
                    {jsonOutput}
                  </pre>
                </div>
              ) : (
                <div className="bg-muted rounded-lg p-6 text-center">
                  <Palette className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Clique em &quot;Gerar JSON&quot; para ver o resultado.
                  </p>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="bg-card border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Recursos
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Editor visual intuitivo
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Importação e exportação de JSON
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Sugestões inteligentes
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Compatível com todos os modelos de IA
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Templates da comunidade
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
