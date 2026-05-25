"use client";

import { useState, useRef, useEffect, useMemo } from "react";

type IconCategory = {
  id: string;
  label: string;
  icons: string[];
};

const CATEGORIES: IconCategory[] = [
  {
    id: "dev",
    label: "Development",
    icons: [
      "code", "terminal", "api", "web", "dns",
      "developer_board", "deployed_code", "build_circle", "manage_search",
      "bug_report", "app_blocking", "construction", "engineering",
      "science", "biotech", "integration_instructions",
      "deployed_code_update", "code_blocks", "data_object", "data_array",
      "token", "memory",
    ],
  },
  {
    id: "design",
    label: "Design & Creative",
    icons: [
      "palette", "brush", "design_services", "layers", "auto_awesome",
      "draw", "edit", "style", "dashboard_customize", "text_fields",
      "format_paint", "filter_vintage", "auto_awesome_mosaic",
      "gradient", "blur_on", "texture", "colorize",
      "contrast", "wallpaper", "art_track", "flip",
      "rotate_right", "transform",
    ],
  },
  {
    id: "business",
    label: "Business & Analytics",
    icons: [
      "analytics", "insights", "trending_up", "assessment", "bar_chart",
      "monitoring", "leaderboard", "query_stats", "show_chart", "pie_chart",
      "stacked_line_chart", "data_usage",
      "business_center", "work_history", "work", "milestone", "timeline",
      "assignment", "task_alt", "checklist", "fact_check", "summarize",
      "trending_down", "trending_flat",
    ],
  },
  {
    id: "security",
    label: "Security & Privacy",
    icons: [
      "verified_user", "security", "shield", "lock", "admin_panel_settings",
      "fingerprint", "encryption", "gpp_good", "privacy_tip",
      "safety_check", "key", "vpn_key", "passkey", "password",
      "lock_open", "lock_reset",
    ],
  },
  {
    id: "communication",
    label: "Communication",
    icons: [
      "chat", "forum", "mail", "campaign", "connect_without_contact",
      "group", "groups", "person", "support_agent", "headset_mic",
      "notifications_active", "contact_support", "live_help",
      "alternate_email", "forward_to_inbox", "mark_as_unread",
      "chat_bubble", "sms", "phone", "call", "group_add",
      "record_voice_over",
    ],
  },
  {
    id: "data",
    label: "Data & Cloud",
    icons: [
      "cloud", "cloud_sync", "cloud_done", "cloud_queue",
      "cloud_download", "cloud_upload", "backup", "folder_open",
      "folder", "folder_copy", "data_saver", "storage",
      "table_rows", "table_view", "dataset", "schema",
      "cloud_circle", "drive_folder",
    ],
  },
  {
    id: "ai",
    label: "AI & Automation",
    icons: [
      "psychology", "psychology_alt", "smart_toy", "robot",
      "auto_awesome_motion", "assistant",
      "neurology", "magic", "settings_suggest", "tips_and_updates",
      "lightbulb", "breakthrough",
      "auto_activity",
    ],
  },
  {
    id: "ui",
    label: "UI & Interface",
    icons: [
      "dashboard", "widgets", "grid_view", "window", "settings", "tune",
      "manage_accounts", "account_circle", "speed", "bolt", "search",
      "notifications", "menu", "more_horiz", "more_vert", "apps",
      "view_quilt", "view_module", "view_list", "home", "info",
      "help", "help_center", "filter_alt", "sort", "swap_vert",
      "view_carousel", "view_stream", "view_column", "density_small",
    ],
  },
  {
    id: "media",
    label: "Media & Entertainment",
    icons: [
      "image", "images", "video_library", "movie", "music_note",
      "play_circle", "podcasts", "headphones", "photo_camera",
      "videocam", "album", "photo_album", "photo_library",
      "playlist_add", "mic", "music_video", "video_file",
      "surround_sound",
    ],
  },
  {
    id: "finance",
    label: "Finance & Commerce",
    icons: [
      "shopping_cart", "shopping_bag", "payments", "point_of_sale",
      "account_balance", "price_change", "price_check", "credit_card",
      "account_balance_wallet", "wallet", "attach_money", "paid",
      "shopping_cart_checkout", "inventory", "receipt_long", "store",
      "local_shipping", "sell", "tag", "storefront",
      "add_shopping_cart", "currency_exchange",
    ],
  },
  {
    id: "tools",
    label: "Tools & Utilities",
    icons: [
      "calendar_month", "schedule", "event", "map", "pin_drop",
      "language", "translate", "download", "upload", "share",
      "link", "qr_code_scanner", "scan", "print", "attach_file",
      "file_copy", "content_copy", "timer", "update", "sync",
      "history", "restart_alt", "undo", "redo", "manage_history",
    ],
  },
  {
    id: "quality",
    label: "Features & Quality",
    icons: [
      "stars", "star", "favorite", "favorite_border",
      "new_releases", "celebration", "recommend", "thumb_up",
      "thumb_up_alt", "rocket_launch", "award_star", "verified",
      "check_circle", "check", "done_all", "done", "task",
      "workspace_premium", "emoji_events", "rewards",
    ],
  },
];

const ALL_ICONS = [...new Set(CATEGORIES.flatMap((c) => c.icons))];
const ICON_COUNT = ALL_ICONS.length;

type IconPickerProps = {
  value: string;
  onChange: (value: string) => void;
};

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const isSearching = search.trim().length > 0;

  const filtered = useMemo(() => {
    if (!isSearching) return null;
    const q = search.toLowerCase();
    return ALL_ICONS.filter(
      (name) =>
        name.includes(q) || name.replace(/_/g, " ").includes(q)
    );
  }, [search, isSearching]);

  useEffect(() => {
    if (open) {
      setSearch("");
      setActiveCategory(CATEGORIES[0].id);
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function selectIcon(name: string) {
    onChange(name);
    setOpen(false);
  }

  function getCategoryCount(id: string) {
    return CATEGORIES.find((c) => c.id === id)!.icons.length;
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-12 w-full items-center gap-3 rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm text-foreground transition-colors hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none dark:bg-[#14161C] dark:border-[#2E323D]"
      >
        {value ? (
          <>
            <span className="material-symbols-outlined text-xl">{value}</span>
            <span className="font-mono text-xs text-muted-foreground">
              {value}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">Select icon...</span>
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 w-[560px] max-h-[500px] rounded-xl border bg-popover text-popover-foreground shadow-xl overflow-hidden">
          <div className="p-3 pb-0">
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${ICON_COUNT} icons...`}
              className="flex h-10 w-full rounded-lg border border-input bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          {!isSearching && (
            <div className="flex gap-1.5 overflow-x-auto p-3 pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {cat.label}
                  <span className="ml-1.5 opacity-60">
                    {getCategoryCount(cat.id)}
                  </span>
                </button>
              ))}
            </div>
          )}

          <div className="overflow-y-auto max-h-[360px] p-3">
            {(() => {
              const displayIcons = isSearching
                ? filtered
                : CATEGORIES.find((c) => c.id === activeCategory)!.icons;

              if (!displayIcons || displayIcons.length === 0) {
                return (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No icons found for &ldquo;{search}&rdquo;
                  </p>
                );
              }

              return (
                <div className="grid grid-cols-8 gap-1">
                  {displayIcons.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => selectIcon(name)}
                      title={name.replace(/_/g, " ")}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors hover:bg-accent ${
                        value === name ? "ring-1 ring-primary bg-primary/10" : ""
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl">
                        {name}
                      </span>
                      <span className="text-[10px] text-popover-foreground/60 leading-tight text-center truncate w-full">
                        {name.replace(/_/g, " ")}
                      </span>
                    </button>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
