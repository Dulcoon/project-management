"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ImageUpload } from "@/components/image-upload";
import { ChevronDown, ImageUp, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconPicker } from "@/components/admin/icon-picker";

type FeatureItem = {
  icon: string;
  title: string;
  description: string;
  colSpan: 1 | 2;
};

type ProjectFormProps = {
  initialData?: {
    id: string;
    title: string;
    desc: string;
    longDesc: string;
    tech: string[];
    role: string;
    year: number;
    status: string;
    features: string[];
    featureList: FeatureItem[] | null;
    images: string[];
    thumbnail: string | null;
    category: string | null;
    mission: string | null;
    client: string | null;
    impactMetric: { value: string; label: string; subtext: string } | null;
    tags: string[];
    overview: string[] | null;
    demo: string | null;
    github: string | null;
  };
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [desc, setDesc] = useState(initialData?.desc ?? "");
  const [longDesc, setLongDesc] = useState(initialData?.longDesc ?? "");
  const [tech, setTech] = useState(initialData?.tech.join(", ") ?? "");
  const [role, setRole] = useState(initialData?.role ?? "");
  const [year, setYear] = useState(
    initialData?.year?.toString() ?? new Date().getFullYear().toString()
  );
  const [status, setStatus] = useState(initialData?.status ?? "Prototype");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [client, setClient] = useState(initialData?.client ?? "");
  const [mission, setMission] = useState(initialData?.mission ?? "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") ?? "");
  const [features, setFeatures] = useState(
    initialData?.features.join("\n") ?? ""
  );
  const [featureList, setFeatureList] = useState<FeatureItem[]>(
    initialData?.featureList ?? []
  );
  const [overview, setOverview] = useState(
    initialData?.overview?.join("\n") ?? ""
  );
  const [impactValue, setImpactValue] = useState(
    initialData?.impactMetric?.value ?? ""
  );
  const [impactLabel, setImpactLabel] = useState(
    initialData?.impactMetric?.label ?? ""
  );
  const [impactSubtext, setImpactSubtext] = useState(
    initialData?.impactMetric?.subtext ?? ""
  );
  const [images, setImages] = useState<string[]>(initialData?.images ?? []);
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail ?? "");
  const [demo, setDemo] = useState(initialData?.demo ?? "");
  const [github, setGithub] = useState(initialData?.github ?? "");
  const [saving, setSaving] = useState(false);

  const currentSlug = initialData?.title
    ? slugify(initialData.title)
    : slugify(title) || undefined;

  async function handleImageUpload(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    if (currentSlug) formData.append("projectSlug", currentSlug);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Upload failed");
        return;
      }
      const result = await res.json();
      addImage(result.data.url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    }
  }

  function addImage(url: string) {
    setImages((prev) => [...prev, url]);
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function addFeature() {
    setFeatureList((prev) => [
      ...prev,
      { icon: "check_circle", title: "", description: "", colSpan: 1 },
    ]);
  }

  function updateFeature(index: number, field: keyof FeatureItem, value: string | number) {
    setFeatureList((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [field]: value } : f))
    );
  }

  function removeFeature(index: number) {
    setFeatureList((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const body = {
      title,
      desc,
      longDesc,
      tech: tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      role,
      year: parseInt(year),
      status,
      category: category || null,
      client: client || null,
      mission: mission || null,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      features: features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      featureList: featureList.length > 0 ? featureList : null,
      overview:
        overview
          .split("\n")
          .map((p) => p.trim())
          .filter(Boolean).length > 0
          ? overview
              .split("\n")
              .map((p) => p.trim())
              .filter(Boolean)
          : null,
      impactMetric:
        impactValue || impactLabel || impactSubtext
          ? { value: impactValue, label: impactLabel, subtext: impactSubtext }
          : null,
      images,
      thumbnail: thumbnail || null,
      demo: demo || null,
      github: github || null,
    };

    const url = isEditing
      ? `/api/admin/projects/${initialData.id}`
      : "/api/admin/projects";

    const res = await fetch(url, {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json();
      toast.error(err.error || "Something went wrong");
      setSaving(false);
      return;
    }

    toast.success(isEditing ? "Project updated" : "Project created");
    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <form id="project-form" onSubmit={handleSubmit}>
      {/* Form Fields Card */}
      <div className="rounded-xl border bg-card p-6 mb-6 dark:bg-[#1C1F26] dark:border-[#2E323D]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Title">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project Title"
              required
            />
          </Field>

          <Field label="Year">
            <Input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g. 2025"
              required
            />
          </Field>

          <Field label="Status">
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="flex h-12 w-full rounded-lg border border-input bg-muted/50 px-4 py-3 text-body-md text-foreground transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none appearance-none cursor-pointer dark:bg-[#14161C] dark:border-[#2E323D]"
              >
                <option value="Live">Live</option>
                <option value="Prototype">Prototype</option>
                <option value="In Development">In Development</option>
                <option value="Production">Production</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            </div>
          </Field>

          <Field label="Category">
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-12 w-full rounded-lg border border-input bg-muted/50 px-4 py-3 text-body-md text-foreground transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none appearance-none cursor-pointer dark:bg-[#14161C] dark:border-[#2E323D]"
              >
                <option value="">Select category</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Website">Website</option>
                <option value="Desktop App">Desktop App</option>
                <option value="API">API</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            </div>
          </Field>

          <Field label="Role">
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Full Stack Developer"
              required
            />
          </Field>

          <Field label="Client">
            <Input
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Client name (optional)"
            />
          </Field>

          <div className="md:col-span-2">
            <Field label="Tech Stack (comma separated)">
              <Input
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                placeholder="Flutter, Laravel, MySQL"
                required
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Tags (comma separated)">
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Laravel, Flutter, Firebase"
              />
            </Field>
          </div>

          <Field label="Demo URL (optional)">
            <Input
              type="url"
              value={demo}
              onChange={(e) => setDemo(e.target.value)}
              placeholder="https://..."
            />
          </Field>

          <Field label="GitHub URL (optional)">
            <Input
              type="url"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="https://github.com/..."
            />
          </Field>

          <Field label="Mission (optional)">
            <Input
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              placeholder="Short mission statement"
            />
          </Field>

          <div className="md:col-span-2">
            <Field label="Short Description">
              <Textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Brief description of the project"
                required
                className="h-24 resize-none"
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Long Description">
              <Textarea
                value={longDesc}
                onChange={(e) => setLongDesc(e.target.value)}
                placeholder="Detailed description of the project"
                required
                className="h-32 resize-y"
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Overview (one paragraph per line)">
              <Textarea
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                placeholder={
                  "First paragraph of the overview\nSecond paragraph of the overview"
                }
                className="h-24 resize-y"
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Features (one per line)">
              <Textarea
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder={
                  "Authentication with Laravel Sanctum\nSacrament & community registration"
                }
                className="h-32 resize-y"
              />
            </Field>
          </div>

          {/* Impact Metric */}
          <div className="md:col-span-2">
            <Field label="Impact Metric (optional)">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  value={impactValue}
                  onChange={(e) => setImpactValue(e.target.value)}
                  placeholder="Value (e.g. 100+)"
                />
                <Input
                  value={impactLabel}
                  onChange={(e) => setImpactLabel(e.target.value)}
                  placeholder="Label (e.g. Users)"
                />
                <Input
                  value={impactSubtext}
                  onChange={(e) => setImpactSubtext(e.target.value)}
                  placeholder="Subtext (e.g. Active users)"
                />
              </div>
            </Field>
          </div>

          {/* Feature List (rich format) */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-muted-foreground tracking-wider">
                Feature Grid (rich format)
              </span>
              <button
                type="button"
                onClick={addFeature}
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                <Plus className="size-3.5" />
                Add Feature
              </button>
            </div>
            {featureList.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No rich features added yet. Click &quot;Add Feature&quot; to create a feature grid.
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {featureList.map((feature, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-input bg-muted/30 p-4 space-y-3 dark:bg-[#14161C]/50 dark:border-[#2E323D]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Feature #{i + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="text-destructive hover:text-destructive/80 transition-colors"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <IconPicker
                      value={feature.icon}
                      onChange={(value) => updateFeature(i, "icon", value)}
                    />
                    <select
                      value={feature.colSpan}
                      onChange={(e) => updateFeature(i, "colSpan", parseInt(e.target.value))}
                      className="flex h-9 w-full rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm text-foreground transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none appearance-none cursor-pointer dark:bg-[#14161C] dark:border-[#2E323D]"
                    >
                      <option value={1}>1 Column</option>
                      <option value={2}>2 Columns</option>
                    </select>
                  </div>
                  <input
                    value={feature.title}
                    onChange={(e) => updateFeature(i, "title", e.target.value)}
                    placeholder="Feature title"
                    className="flex h-9 w-full rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none dark:bg-[#14161C] dark:border-[#2E323D]"
                  />
                  <textarea
                    value={feature.description}
                    onChange={(e) => updateFeature(i, "description", e.target.value)}
                    placeholder="Feature description"
                    rows={2}
                    className="flex w-full rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none dark:bg-[#14161C] dark:border-[#2E323D]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Media Gallery */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-headline-md font-semibold text-foreground">
            Media Gallery
          </h2>
          <p className="text-body-md text-muted-foreground">
            Manage project thumbnails and screenshots
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thumbnail */}
        <div className="space-y-3">
          <Label>Thumbnail</Label>
          <ImageUpload
            value={thumbnail}
            onChange={setThumbnail}
            onRemove={() => setThumbnail("")}
            projectSlug={currentSlug}
            label="Upload Thumbnail"
          />
        </div>

        {/* Project Images */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <Label>Project Images</Label>
            <button
              type="button"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) handleImageUpload(file);
                };
                input.click();
              }}
              className="text-sm font-semibold tracking-wider text-primary flex items-center gap-1 hover:text-primary/80 transition-colors"
            >
              <ImageUp className="size-3.5" />
              Add Image
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {images.map((url, i) => (
              <ImageUpload
                key={i}
                value={url}
                onChange={(newUrl) => {
                  setImages((prev) =>
                    prev.map((u, j) => (j === i ? newUrl : u))
                  );
                }}
                onRemove={() => removeImage(i)}
                projectSlug={currentSlug}
                label="Replace Image"
              />
            ))}
            <ImageUpload
              value=""
              onChange={addImage}
              projectSlug={currentSlug}
              label="Add Image"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-muted-foreground tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-semibold text-muted-foreground tracking-wider">
      {children}
    </span>
  );
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-12 w-full rounded-lg border border-input bg-muted/50 px-4 py-3 text-body-md text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none dark:bg-[#14161C] dark:border-[#2E323D]",
        className
      )}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex w-full rounded-lg border border-input bg-muted/50 px-4 py-3 text-body-md text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none dark:bg-[#14161C] dark:border-[#2E323D]",
        className
      )}
      {...props}
    />
  );
}
